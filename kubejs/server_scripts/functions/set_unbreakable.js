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
