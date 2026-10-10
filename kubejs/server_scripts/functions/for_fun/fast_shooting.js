ItemEvents.rightClicked('minecraft:bow',e=>{
    e.server.scheduleInTicks(3,()=>{
        e.player.releaseUsingItem()
    })
})
EntityEvents.spawned('minecraft:arrow',e=>{
    let {entity,level} = e
    if(Number.parseInt(entity.getNbt().get('pickup').getAsString()) == 2){
        //entity.setNoGravity(true)
        entity.mergeNbt({
            'crit':1
        })
        entity.addMotion(entity.getMotionX()*20,entity.getMotionY()*20,entity.getMotionZ()*10)
    }
})