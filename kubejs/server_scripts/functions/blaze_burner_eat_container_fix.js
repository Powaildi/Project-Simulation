BlockEvents.rightClicked('create:blaze_burner',e=>{
    let player = e.player
    let item = player.getMainHandItem()

    if(item.hasTag('kubejs:burner_eat')){
        if(player.isCreative())e.success()
        e.player.tell(Text.gold(Text.translatable("warn.kubejs.stop_burner_eat_container")))
        e.cancel()
    }
})