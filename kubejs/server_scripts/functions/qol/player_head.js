EntityEvents.death('minecraft:player',e=>{
    let {player,level} = e
    let name = player.getName().getString()
    let head = Item.of(`minecraft:player_head[minecraft:profile=${name}]`,1)
    level.getBlock(player.onPos).popItem(head)
})