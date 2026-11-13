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


const MAX_LENGTH = 20

/**
 * 
 * @param {Internal.$BlockPos} pos 
 * @param {number[]} offset 
 * @param {number} distance
 * @returns {number}
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
    
    if(distance >= MAX_LENGTH)return value
    return value + getHeatMultiplier(level,pos,offset,distance)
}

/**
 * 
 * @param {Internal.$Level} level 
 * @param {Internal.$MBDMachine} machine 
 * @param {Internal.$Direction} facing 
 * @returns 
 */
function getBurnerMultiplier(level, machine, facing) {
    let pos = localToWorld(machine, facing, 0, -1, 1)//后下方1格
    let offset = localRotation(facing, 0, 0, 1)//向后
    let multiplier = getHeatMultiplier(level,pos,offset,0)
    return multiplier
}

/**
 * 检测长度，不包括pos那一格
 * @param {Internal.$Level} level 
 * @param {Internal.$BlockPos} pos
 * @param {number[]} offset 
 * @param {string} blockid 
 */
function getlength(level,pos,offset,blockid){
    let length = 0
    for(let i=0;i<MAX_LENGTH;i++){
        //起始位置是机器，向后一格才到要检测的方块
        pos = pos.offset(offset)
        if(level.getBlock(pos).getId() == blockid) length++
        else return length
    }
    return length
}

MBDMachineEvents.onBeforeRecipeModify('mbd2:thermoelectric_generator', e => {
    const event = e.getEvent()
    const machine = event.machine
    const level = machine.level
    const facing = machine.getFrontFacing().orElse($Direction.NORTH)

    let multiplier = Number(getBurnerMultiplier(level, machine, facing))

    const recipe = event.getRecipe()

    const scaled = recipe
        .copy($ContentModifier.multiplier(Math.max(multiplier,1)),false,'in')
        .copy($ContentModifier.multiplier(Math.max(multiplier,0.1)),false,'out')
    event.setRecipe(scaled)

    
    let blockid = 'railways:diorite_plated_locometal'
    let offset = localRotation(facing, 0, 0, 1)
    let length = getlength(level,machine.pos,offset,blockid)
    machine.setCustomData({'multiplier':multiplier,'length':length})
})

MBDMachineEvents.onRecipeWorking('mbd2:thermoelectric_generator', e =>{
    const event = e.getEvent()
    const machine = event.machine
    const level = machine.level
    const facing = machine.getFrontFacing().orElse($Direction.NORTH)

    let data = machine.getCustomData()
    let multiplier = data.getFloat('multiplier')
    let length = data.getFloat('length')

    let pos = machine.pos
    let offset = localRotation(facing,0,1,1+(length-1)/2)
    let center_loc = [pos.x+0.5+offset[0],pos.y+0.5+offset[1],pos.z+0.5+offset[2]]

    let particle_count = length/5
    if(multiplier>=40) particle_count = Math.max(length,Math.log2(multiplier))//39.9是福鲁伊克斯汽油在10格长的可控燃烧室的值
    if(multiplier>length){//至少需要1个超级加热
        level.spawnParticles('farmersdelight:steam',false,
            center_loc[0],center_loc[1],center_loc[2],offset[0]/2,0.5,offset[2]/2,
            Math.ceil(particle_count),Math.max(1,Math.log2(multiplier))/200)
    }
})