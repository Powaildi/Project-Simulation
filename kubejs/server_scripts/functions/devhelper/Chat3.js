PlayerEvents.chat(e=>{
    return
    let {player,message} = e
    let result = Item.findItem(message)
    console.log(result)
    result.ifSuccess(i=>{player.give(i)})
    result.ifError(()=>{player.give(Item.of('minecraft:light_gray_stained_glass_pane').withCustomName(message))})
})
