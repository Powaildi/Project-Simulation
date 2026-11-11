// 温差发电机（mbd2:thermoelectric_generator）热量倍率
//
// 控制器后下方 1 格开始，沿机器后方依次是烈焰人燃烧室：
//   - 燃烧（kindled）：每个提供 1x
//   - 超级燃烧（seething）：每个提供 2x
//   - 全部未燃烧：总共 0.5x
//
// 在配方修改前按总倍率复制一份配方，只缩放输入/输出，不改变持续时间。
// 该事件只在配方被修改时触发；若机器未开启 alwaysModifyRecipe，
// 点燃/熄灭燃烧室后需要让配方重新匹配才会刷新倍率。
// 注意：物品/流体数量是整数，SizedIngredient / SizedFluidIngredient 不允许 0，
// 所以 0.5x 时数量 1 最低保留为 1。

// 燃烧室数量，后续按结构长度调整
const BURNER_COUNT = 5
const $ContentModifier = Java.loadClass('com.lowdragmc.mbd2.api.recipe.content.ContentModifier')

/** 读取机器后下方一列燃烧室提供的总倍率。 */
function getHeatMultiplier(level, machine, facing) {
    let multiplier = 0
    for (let i = 1; i <= BURNER_COUNT; i++) {
        let pos = localToWorld(machine, facing, 0, -1, i)
        if (!level.isLoaded(pos)) {
            continue
        }
        let block = level.getBlock(pos)
        if (block.id != 'create:blaze_burner') {
            continue
        }
        let heat = block.properties.get('blaze')
        if (heat == 'kindled') {
            multiplier += 1
        } else if (heat == 'seething') {
            multiplier += 2
        }
    }
    return multiplier > 0 ? multiplier : 0.5
}

/** 计算单个内容的安全倍率：整数数量被截断成 0 会抛异常，最低保留 1。 */
function getContentMultiplier(content, multiplier) {
    let inner = content.content
    if (inner == null) {
        return multiplier
    }
    let name = String(inner.getClass().getName())
    let amount = 0
    if (name == 'net.neoforged.neoforge.fluids.crafting.SizedFluidIngredient') {
        amount = inner.amount()
    } else if (name == 'net.neoforged.neoforge.common.crafting.SizedIngredient') {
        amount = inner.count()
    }
    if (amount > 0 && Math.floor(amount * multiplier) < 1) {
        return 1 / amount
    }
    return multiplier
}

/** 缩放配方中的输入和输出内容。 */
function scaleRecipeContents(contents, multiplier) {
    let iterator = contents.entrySet().iterator()
    while (iterator.hasNext()) {
        let entry = iterator.next()
        let capability = entry.getKey()
        let list = entry.getValue()
        for (let i = 0; i < list.size(); i++) {
            let content = list.get(i)
            let factor = getContentMultiplier(content, multiplier)
            list.set(i, content.copy(capability, $ContentModifier.multiplier(factor)))
        }
    }
}

MBDMachineEvents.onBeforeRecipeModify('mbd2:thermoelectric_generator', e => {
    const event = e.getEvent()
    const machine = event.machine
    const level = machine.level
    const facing = machine.getFrontFacing().orElse($Direction.NORTH)

    const multiplier = getHeatMultiplier(level, machine, facing)
    if (multiplier == 1) {
        return
    }

    const recipe = event.getRecipe()
    if (recipe == null) {
        return
    }

    const scaled = recipe.copy()
    scaleRecipeContents(scaled.inputs, multiplier)
    scaleRecipeContents(scaled.outputs, multiplier)
    event.setRecipe(scaled)
})
