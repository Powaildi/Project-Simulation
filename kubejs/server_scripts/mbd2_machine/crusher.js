// 粉碎机（mbd2:crusher）应力逻辑
//
// 接入 Create 动力学网络的是结构里的 mbd2:crusher_part（create_machine_project，
// 定义里 torque = 64、maxRPM = 256），控制器 mbd2:crusher 的方块实体只是普通
// MachineBlockEntity，没有 getSpeed()/动力学网络，所以事件要挂在 crusher_part 上。
//
// 应力影响按转速分档：
//   - |转速| >= 128 RPM：1024
//   - 其余：64（机器定义里的基础值）
// Create 6 的“应力影响”以 SU/RPM 计，界面显示的实际应力 = 应力影响 × |转速|。
//
// 必须用 MBDKineticMachineBlockEntity#setDynamicTorqueOverride(float)：
// 护目镜和网络重算读的都是 calculateStressApplied()，而它只有在 dynamicTorqueOverride
// 非空时才返回动态值，否则永远返回定义里的 64。这个方法内部再走 Create 的官方通道：
//   notifyStressCapacityChange -> KineticNetwork#updateCapacityFor
//   notifyStressChange         -> KineticNetwork#updateStressFor（与 KineticBlockEntity
//                                 自己的 notifyStressChange 同一套）
//   KineticNetwork#updateStress
// 所以网络总应力、客户端应力表、超载判定都会一起更新。
//
// 注意：这里取的是 getTheoreticalSpeed()，不是 getSpeed()。Create 在过载时
// getSpeed() 会返回 0，若用它分档，就会变成“1024 -> 过载 -> 读到 0 -> 改回 64 ->
// 网络恢复 -> 又 1024”的死循环；theoreticalSpeed 是网络设定的转速，不受过载/刻冻结
// 影响，档位因此保持稳定：容量不够就一直瘫痪，加大供能才恢复。
//
// 每 100 tick 更新一次。

const UPDATE_INTERVAL = 100

MBDMachineEvents.onTick('mbd2:crusher_part', e => {
    const machine = e.getEvent().machine
    const level = machine.level

    if (machine.isRemote() || level.server.tickCount % UPDATE_INTERVAL !== 0) {
        return
    }

    const blockEntity = machine.asBlockEntity()

    // 用理论转速分档，避免过载时 getSpeed() 归零导致档位反复横跳
    const speed = blockEntity.getTheoreticalSpeed()
    const stressAdded = Math.abs(speed) >= 128 ? 1024 : 64

    blockEntity.setDynamicTorqueOverride(stressAdded)
})
