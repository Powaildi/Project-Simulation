// 电解槽（mbd2:electrolyser）多方块逻辑
//
// 结构尺寸 5x8x5，控制器位于局部坐标 (2, 3, 2)。
// 局部坐标约定：+x = 机器右侧，+y = 上方，+z = 机器后方。
//
// 1. 左右两侧的流体储罐 -> 两个流体输入槽（左负极、右正极）
// 2. 三个流体输出槽 -> 底部三个横向流体储罐（左负极、中额外、右正极）
// 3. 物品输出槽 -> 后下方的物品保险库
// 每 20 tick 执行一次。

const $FluidAction = Java.loadClass('net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction')
const $FluidHandlerCapability = Java.loadClass('net.neoforged.neoforge.capabilities.Capabilities$FluidHandler')
const $ItemHandlerCapability = Java.loadClass('net.neoforged.neoforge.capabilities.Capabilities$ItemHandler')
const $Direction = Java.loadClass('net.minecraft.core.Direction')

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

/**
 * 把相对控制器的局部偏移转换为世界坐标。
 * 局部 +x 沿机器右侧，局部 +z 沿机器后方。
 */
function localToWorld(machine, facing, dx, dy, dz) {
    let rightX = 0
    let rightZ = 0
    let backX = 0
    let backZ = 0

    if (facing.equals($Direction.NORTH)) {
        rightX = 1
        backZ = 1
    } else if (facing.equals($Direction.EAST)) {
        rightZ = 1
        backX = -1
    } else if (facing.equals($Direction.SOUTH)) {
        rightX = -1
        backZ = -1
    } else if (facing.equals($Direction.WEST)) {
        rightZ = -1
        backX = 1
    } else {
        throw new Error('Electrolyser facing must be horizontal: ' + facing)
    }

    let wx = dx * rightX + dz * backX
    let wz = dx * rightZ + dz * backZ
    return machine.pos.offset(wx, dy, wz)
}

/**
 * 依次尝试一组位置，返回第一个带有指定能力的外部方块处理器。
 * Create 的储罐/保险库只在多方块控制器方块上暴露能力，所以要遍历整组。
 */
function findBlockHandler(level, machine, facing, offsets, capability) {
    for (let i = 0; i < offsets.length; i++) {
        let offset = offsets[i]
        let pos = localToWorld(machine, facing, offset[0], offset[1], offset[2])
        let handler = level.getCapability(capability, pos, null)
        if (handler != null) {
            return handler
        }
    }
    return null
}

/** 从机器特质中取出流体储罐（FluidStorage 实现了 IFluidHandler）。 */
function getMachineTank(machine, name) {
    let trait = machine.getTraitByName(name)
    if (trait == null || trait.storages == null || trait.storages.length == 0) {
        return null
    }
    return trait.storages[0]
}

/** 从机器特质中取出物品槽（ItemStackTransfer 实现了 IItemHandler）。 */
function getMachineItemHandler(machine, name) {
    let trait = machine.getTraitByName(name)
    return trait == null ? null : trait.storage
}

/** 在两个流体处理器之间安全转移流体，最多转移 amount mB。 */
function moveFluid(from, to, amount) {
    if (from == null || to == null) {
        return
    }
    let remaining = amount
    for (let tank = 0; tank < from.getTanks() && remaining > 0; tank++) {
        let fluid = from.getFluidInTank(tank)
        if (fluid == null || fluid.isEmpty()) {
            continue
        }

        let request = fluid.copyWithAmount(Math.min(remaining, fluid.getAmount()))
        let available = from.drain(request, $FluidAction.SIMULATE)
        if (available == null || available.isEmpty()) {
            continue
        }
        let accepted = to.fill(available, $FluidAction.SIMULATE)
        if (accepted <= 0) {
            continue
        }

        let moved = Math.min(accepted, available.getAmount())
        let drained = from.drain(available.copyWithAmount(moved), $FluidAction.EXECUTE)
        if (drained != null && !drained.isEmpty()) {
            let transferred = to.fill(drained, $FluidAction.EXECUTE)
            remaining -= transferred
        }
    }
}

/** 把机器物品输出槽里的物品推入外部物品处理器。 */
function moveItems(outSlots, target) {
    if (outSlots == null || target == null) {
        return
    }
    for (let i = 0; i < outSlots.getSlots(); i++) {
        let stack = outSlots.getStackInSlot(i)
        if (stack.isEmpty()) {
            continue
        }
        let count = stack.getCount()
        let remainder = target.insertItem(stack.copy(), false)
        if (remainder.getCount() < count) {
            outSlots.setStackInSlot(i, remainder)
        }
    }
}

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
