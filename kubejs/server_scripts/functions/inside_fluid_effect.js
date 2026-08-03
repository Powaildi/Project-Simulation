PlayerEvents.tick(e=>{
    let player = e.player
    if(player.isInFluidType('kubejs:cryogen')){
        let ticksfrozen = (player.getTicksFrozen()+9)*0.99//Math.min(player.getTicksFrozen()+9,140)
        player.setTicksFrozen(ticksfrozen)
        
        if(e.server.tickCount%40==0&&ticksfrozen>=140){
            player.damage(2,'minecraft:freeze')
        }
    }
})
ServerEvents.tick(e=>{
    let server = e.server
    if(server.tickCount%40)return
    let entities = server.getMcEntities()
    entities.forEach(entity=>{
        let type = entity.type
        if(type=='minecraft:player')return
        if(type=='minecraft:item')return

        let ticksfrozen = entity.getTicksFrozen()
        let damagefactor = 1.5
        if(type=='touhou_little_maid:maid'){
            damagefactor = 0.7
        }

        if(entity.isInFluidType('kubejs:cryogen')){
            ticksfrozen = (ticksfrozen+360)*damagefactor
            //console.log(entity.getTicksFrozen())
            try{
                entity.setTicksFrozen(ticksfrozen)
            }
            catch(e){
                console.warn(e.message)
                entity.kill()//int大限已至
            }
        }
        if(damagefactor<1)return
        if(ticksfrozen){
            entity.damage(ticksfrozen/40,'minecraft:freeze')
        }
    })
    
})