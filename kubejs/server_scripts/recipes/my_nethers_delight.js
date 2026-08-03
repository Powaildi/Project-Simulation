ServerEvents.recipes(e=>{
    //清理需要辣椒粉增殖烈焰粉的配方
    e.remove({output:'minecraft:blaze_powder',input:'minecraft:blaze_powder'})
})
