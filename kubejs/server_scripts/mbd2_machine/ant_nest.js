let $TooltipFlag$Default = Java.loadClass("net.minecraft.world.item.TooltipFlag$Default");


MBDMachineEvents.onTick('mbd2:ant_nest',e=>{
    
    let event = e.getEvent()
    let machine = event.machine
    let {pos,level} = machine
    let server = level.server
    level.getBlock(pos)
    //默认冷却
    let move_cooldown = 2           //每 n tick 进行一次移动，这是默认值，将要设置在机器中，不能是0
    let stop = false
    //修改冷却
    let note_block = level.getBlock(pos.above())
    if(note_block.id == 'minecraft:note_block'){
        move_cooldown = Number(note_block.properties.get('note'))+1
        stop = note_block.properties.get('powered') == 'true' 
    }
    if(server.tickCount%move_cooldown)return//实现冷却

    machine.asBlockEntity().persistentData.putBoolean('stop',stop)
    machine.asBlockEntity().persistentData.putInt('cd',move_cooldown)
})
BlockEvents.rightClicked('mbd2:ant_nest',e=>{
    let {block,item} = e
    if(item.getId() == 'minecraft:armor_stand'){
        item.setCustomName(`Ant ${block.x} ${block.y} ${block.z}`)
        //item.setCustomData({'nest':[block.x,block.y,block.z]})
        item.setRarity('rare')
    }
})
