BlockEvents.rightClicked(e=>{
    let {block,player,level} = e

    let helditem = player.getMainHandItem()
    if(helditem != 'minecraft:bone_meal')return

    let pos = Sable.projectOutOfSubLevel(level,block.pos)
    let isInSublevel = Boolean(pos.x()-block.pos.x-0.5 != 0 )//子维度和实际坐标相差过大

    if (isInSublevel&&block.hasTag('minecraft:small_flowers')){
        block.popItem(block.item)
        level.runCommandSilent(`/particle minecraft:happy_villager ${pos.x} ${pos.y} ${pos.z} 0.2 0.2 0.2 0.1 5 force @a`)
        helditem.consume(1,player)//这里会直接断开
    }
})
