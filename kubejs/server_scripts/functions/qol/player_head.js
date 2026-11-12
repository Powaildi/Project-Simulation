EntityEvents.death('minecraft:player',e=>{
    let {player,level} = e
    let name = player.getName().getString()
    let head = Item.of(`minecraft:player_head[minecraft:profile=${name}]`,1)
    level.getBlock(player.onPos).popItem(head)
})

BlockEvents.rightClicked('minecraft:player_head',e=>{
    let{player,hand,block,level} = e
    if(hand != 'MAIN_HAND')return

    let handitem = player.getMainHandItem()
    if(handitem.id != 'minecraft:name_tag')return

    let name = handitem.getCustomName()
    if(name == null)return

    block.popItem(Item.of(`minecraft:player_head[minecraft:profile=${name.string}]`,1))
    block.set('minecraft:air')
    handitem.consume(1,player)
    
})