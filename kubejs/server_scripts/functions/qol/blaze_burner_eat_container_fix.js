BlockEvents.rightClicked('create:blaze_burner',e=>{
    let {level,player,item} = e

    if(item.hasTag('kubejs:burner_eat')){
        if(player.isCreative())e.success()
        e.player.tell(Text.gold(Text.translatable("warn.kubejs.stop_burner_eat_container")))
        e.cancel()
    }
    
    if(item.id.includes('fluidlogistics:fluid_package')){
        let components = item.getComponentString()
        if(components.includes('lava')){
            if(Number.parseInt(components.split('amount:')[1].split(',')[0]) > 1000){
                level.runCommandSilent(`/advancement grant ${player.getName().string} only kubejs:1001liquid`)
            }
        }
    }
})