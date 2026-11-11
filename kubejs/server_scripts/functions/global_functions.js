//priority: 999
//存储会复用的功能
const $Direction = Java.loadClass('net.minecraft.core.Direction')
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
        throw new Error('Machine facing must be horizontal: ' + facing)
    }

    let wx = dx * rightX + dz * backX
    let wz = dx * rightZ + dz * backZ
    return machine.pos.offset(wx, dy, wz)
}

const $FluidAction = Java.loadClass('net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction')
const $FluidHandlerCapability = Java.loadClass('net.neoforged.neoforge.capabilities.Capabilities$FluidHandler')
const $ItemHandlerCapability = Java.loadClass('net.neoforged.neoforge.capabilities.Capabilities$ItemHandler')

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

/**
 * 对数组进行多次 Fisher-Yates 洗牌（直接修改原数组）
 * 洗牌次数越多，元素的原始位置被打散得越彻底。
 *
 * @param {any[]} arr - 需要打乱的原数组（会被直接修改）
 * @param {number} times - 重复洗牌的次数
 * @returns {any[]} 返回原数组本身，方便进行链式调用
 */
function shuffle(arr,times) {
    const len = arr.length;
    //console.log(times) 
    for (let t = 0; t < times; t++) {
        for (let i = len - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 直接交换
        }
    }
    return arr; // 返回原数组，方便链式调用
}