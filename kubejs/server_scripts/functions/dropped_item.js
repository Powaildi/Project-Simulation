EntityEvents.spawned('minecraft:item',e=>{
    let {entity} = e
    if(entity.getNbt().get('Thrower') == null){
        entity.setTicksUntilDespawn(1200)
    }
    let item = entity.getItem()
    if(item.getRarity() == 'COMMON')return
    item.setFireResistant()
})

ItemEntityEvents.death(e=>{
    if(e.itemEntity.getTicksUntilDespawn())return//不是到时间消失的就不管
    let item = e.itemEntity.getItem()
    if(item.getRarity() == 'COMMON')return//只选择贵重物品
    let player = e.level.getNearestPlayer(e.itemEntity,100000)//让最近的玩家获得该物品
})