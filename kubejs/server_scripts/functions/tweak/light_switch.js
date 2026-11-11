BlockEvents.rightClicked(e=>{
    let{player,hand,block,level} = e

    if(!(block.hasTag('kubejs:frontlights')))return
    if(player.getMainHandItem() != 'minecraft:air')return
    if(hand == "OFF_HAND") return //避免双手触发

    let on = block.getProperties().get('lit') === true
    //console.log(on,typeof on)
    let state = String(block.toBlockStateString()).replace(/\blit=(true|false)\b/, `lit=${!on}`)
    level.setBlock(block.pos,state,1)
})