StartupEvents.registry('block', event => {
    //注册 方块
    event.create('uranium_chlorophyte').displayName('叶绿铀石')
    .noCollision()
            .rightClick(c=>{
                c.block.popItem('minecraft:snowball')
            })
            .entityInside(c=>{
                c.entity.setIsInPowderSnow(true)
            })
})
BlockEvents.modification(e=>{
    e.modify('aero_reformation:end_rod_seat',b=>{
        b.setLightEmission(15)
    })
    e.modify('kubejs:uranium_chlorophyte',b=>{
        b.setLightEmission(4)
    })
})
