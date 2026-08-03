// PlayerEvents.loggedIn(e=>{
//     e.player.setAttributeBaseValue('neoforge:creative_flight',1)
// })

// PlayerEvents.chat(e=>{
//     e.player.give('delighto_flight:cloud_berries')
// })

ItemEvents.foodEaten('delighto_flight:cloud_berries',e=>{
    //console.log(e.player.getAttributeBaseValue('neoforge:creative_flight'))
    
    if(e.player.getAttributeBaseValue('neoforge:creative_flight')==0){
        e.player.setAttributeBaseValue('neoforge:creative_flight',1)
        e.player.tell(Text.aqua("你已学会创造飞行"))
        e.player.addXPLevels(5)
    }
    
})

MaidEvents.maidAfterEat('delighto_flight:cloud_berries',e=>{
    let maid =e.getMaid().asEntity()
    maid.setAttributeBaseValue('minecraft:generic.fall_damage_multiplier',0)
    console.log(1)
})
