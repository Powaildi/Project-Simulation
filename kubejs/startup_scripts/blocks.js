StartupEvents.registry('block', event => {
    //注册 方块
    event.create('uranium_chlorophyte').displayName("block.uranium_chlorophyte")

})
BlockEvents.modification(e=>{
    e.modify('aero_reformation:end_rod_seat',b=>{
        b.setLightEmission(15)
    })
    e.modify('kubejs:uranium_chlorophyte',b=>{
        b.setLightEmission(4)
    })
    e.modify('createbigcannons:steel_block',b=>{
        b.setNameKey("tag.createbigcannons.block_steel")
    })
})