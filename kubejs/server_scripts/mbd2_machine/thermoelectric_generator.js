// 温差发电机（mbd2:thermoelectric_generator）热量倍率
//
// 控制器后下方 1 格开始，沿机器后方依次是烈焰人燃烧室：
//   - 燃烧（kindled）：每个提供 1x
//   - 超级燃烧（seething）：每个提供 2x
//   - 全部未燃烧：总共 0.5x
//
// 不预设燃烧室数量：从控制器后下方第 1 格开始递归向后检查，
// 遇到第一个非烈焰人燃烧室方块就停止。
//
// 在配方修改前按总倍率复制一份配方，只缩放输入/输出，不改变持续时间。
// 该事件只在配方被修改时触发；若机器未开启 alwaysModifyRecipe，
// 点燃/熄灭燃烧室后需要让配方重新匹配才会刷新倍率。
// 注意：物品/流体数量是整数，SizedIngredient / SizedFluidIngredient 不允许 0，
// 所以 0.5x 时数量 1 最低保留为 1。


const MAX_RECURSION = 20

/**
 * 
 * @param {$BlockPos} pos 
 * @param {number[]} offset 
 * @param {number} distance
 * @returns 
 */
function getHeatMultiplier(level,pos,offset,distance) {
    if (!level.isLoaded(pos)) {
        return 0
    }

    let block = level.getBlock(pos)
    let value = getBurnerHeat(block)
    if(value == -1){
        //console.log(pos+'not a burner')
        return 0
    }
    //console.log(distance)
    pos = pos.offset(offset)
    distance++
    
    if(distance >= MAX_RECURSION)return value
    return value + getHeatMultiplier(level,pos,offset,distance)
}

/**
 * 
 * @param {*} level 
 * @param {*} machine 
 * @param {*} facing 
 * @returns 
 */
function getBurnerMultiplier(level, machine, facing) {
    let pos = localToWorld(machine, facing, 0, -1, 1)//后下方1格
    let offset = localRotation(facing, 0, 0, 1)//向后
    let multiplier = getHeatMultiplier(level,pos,offset,0)
    return multiplier
}


MBDMachineEvents.onBeforeRecipeModify('mbd2:thermoelectric_generator', e => {
    const event = e.getEvent()
    const machine = event.machine
    const level = machine.level
    const facing = machine.getFrontFacing().orElse($Direction.NORTH)

    let multiplier = getBurnerMultiplier(level, machine, facing)

    const recipe = event.getRecipe()

    const scaled = recipe
        .copy($ContentModifier.multiplier(Math.max(multiplier,1)),false,'in')
        .copy($ContentModifier.multiplier(Math.max(multiplier,0.1)),false,'out')
    event.setRecipe(scaled)
})
