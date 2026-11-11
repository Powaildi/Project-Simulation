// 电解槽（mbd2:electrolyser）多方块逻辑
//
// 结构尺寸 5x8x5，控制器位于局部坐标 (2, 3, 2)。
// 局部坐标约定：+x = 机器右侧，+y = 上方，+z = 机器后方。
//
// 1. 左右两侧的流体储罐 -> 两个流体输入槽（左负极、右正极）
// 2. 三个流体输出槽 -> 底部三个横向流体储罐（左负极、中额外、右正极）
// 3. 物品输出槽 -> 后下方的物品保险库
// 每 20 tick 执行一次。



const CYCLE_TICKS = 20
const FLUID_PER_CYCLE = 10000

// 相对控制器的局部偏移 [dx, dy, dz]
// 左侧输入储罐（2 格高）
const NEGATIVE_INPUT_TANK = [[2, 0, 0], [2, 1, 0]]
// 右侧输入储罐（2 格高）
const POSITIVE_INPUT_TANK = [[-2, 0, 0], [-2, 1, 0]]

// 底部左侧横向储罐
const NEGATIVE_OUTPUT_TANK = [[2, -3, -1], [2, -3, 0], [2, -3, 1]]
// 底部中间（前方）横向储罐
const EXTRA_OUTPUT_TANK = [[-1, -3, -2], [0, -3, -2], [1, -3, -2]]
// 底部右侧横向储罐
const POSITIVE_OUTPUT_TANK = [[-2, -3, -1], [-2, -3, 0], [-2, -3, 1]]

// 后下方物品保险库
const ITEM_VAULT = [[-1, -2, 2], [0, -2, 2], [1, -2, 2]]



MBDMachineEvents.onTick('mbd2:electrolyser', e => {
    let machine = e.getEvent().machine
    if (machine.isRemote() || !machine.isFormed()) {
        return
    }

    let level = machine.level
    if (level.server.tickCount % CYCLE_TICKS != 0) {
        return
    }

    let facing = machine.getFrontFacing().orElse($Direction.NORTH)

    // 机器的两个输入储罐、三个输出储罐和一个物品输出槽
    let negativeInput = getMachineTank(machine, 'negative_input')
    let positiveInput = getMachineTank(machine, 'positive_input')
    let negativeOutput = getMachineTank(machine, 'negative_output')
    let extraOutput = getMachineTank(machine, 'extra_output')
    let positiveOutput = getMachineTank(machine, 'positive_output')
    let itemOutput = getMachineItemHandler(machine, 'output_slot')

    // 从两边储罐抽取流体到输入槽：左负极、右正极
    moveFluid(
        findBlockHandler(level, machine, facing, NEGATIVE_INPUT_TANK, $FluidHandlerCapability.BLOCK),
        negativeInput, FLUID_PER_CYCLE
    )
    moveFluid(
        findBlockHandler(level, machine, facing, POSITIVE_INPUT_TANK, $FluidHandlerCapability.BLOCK),
        positiveInput, FLUID_PER_CYCLE
    )

    // 把输出槽流体排入底部三个储罐：左负极、中额外、右正极
    moveFluid(
        negativeOutput,
        findBlockHandler(level, machine, facing, NEGATIVE_OUTPUT_TANK, $FluidHandlerCapability.BLOCK),
        FLUID_PER_CYCLE
    )
    moveFluid(
        extraOutput,
        findBlockHandler(level, machine, facing, EXTRA_OUTPUT_TANK, $FluidHandlerCapability.BLOCK),
        FLUID_PER_CYCLE
    )
    moveFluid(
        positiveOutput,
        findBlockHandler(level, machine, facing, POSITIVE_OUTPUT_TANK, $FluidHandlerCapability.BLOCK),
        FLUID_PER_CYCLE
    )

    // 把物品输出槽的物品送入后下方的物品保险库
    moveItems(
        itemOutput,
        findBlockHandler(level, machine, facing, ITEM_VAULT, $ItemHandlerCapability.BLOCK)
    )
})
