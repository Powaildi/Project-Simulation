//设置黑名单

//在得到后给不可破坏，比较低效
// ItemEvents.firstLeftClicked(e=>{
//     if(e.item.hasTag('minecraft:enchantable/durability')){
//         e.item.setUnbreakable()
//     }
// })
// ItemEvents.rightClicked(e=>{
//     if(e.item.hasTag('minecraft:enchantable/durability')){
//         e.item.setUnbreakable()
//     }
// })
// ItemEvents.crafted(e=>{
//     if(e.item.hasTag('minecraft:enchantable/durability')){
//         e.item.setUnbreakable()
//     }
// })
// PlayerEvents.inventoryChanged(e=>{
//     if(e.item.hasTag('minecraft:enchantable/durability')){
//         e.item.setUnbreakable()
//     }
// })

//阻止掉耐久
MEJSEvents.durabilityDamage(e=>{
    e.itemStack.setUnbreakable()
    e.cancel()
})
//耐久和经验修补不出现在附魔中
OEEEvents.modifyWeight(e=>{
    e.setWeight("minecraft:unbreaking",0)
    e.setWeight("minecraft:mending",0)
})
