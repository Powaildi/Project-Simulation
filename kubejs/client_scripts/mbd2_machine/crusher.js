// 粉碎机（mbd2:crusher）护目镜应力显示
//
// 服务端 crusher.js 用的是 setDynamicTorqueOverride()，这个字段只是运行时字段，
// 不写 NBT、也不参与同步；而 Create 的护目镜是客户端调用 calculateStressApplied()
// 现算的，客户端读到 dynamicTorqueOverride 为 null 就会退回机器定义里的 64，
// 于是护目镜一直显示 64 × 转速。
//
// 这里在客户端按同样的分档再设一次，只改本地方块实体的字段（setDynamicTorqueOverride
// 在 level.isClientSide 时会跳过所有网络通知），不向服务端发包，也不影响判定。
// 转速用的是同步到客户端的 getTheoreticalSpeed()，与服务端分档保持一致。

const HIGH_SPEED_RPM = 128
const HIGH_SPEED_IMPACT = 1024
const LOW_SPEED_IMPACT = 64

MBDMachineEvents.onClientTick('mbd2:crusher_part', e => {
    const machine = e.getEvent().machine
    const blockEntity = machine.asBlockEntity()

    const speed = blockEntity.getTheoreticalSpeed()
    const stressAdded = Math.abs(speed) >= HIGH_SPEED_RPM ? HIGH_SPEED_IMPACT : LOW_SPEED_IMPACT

    blockEntity.setDynamicTorqueOverride(stressAdded)
})
