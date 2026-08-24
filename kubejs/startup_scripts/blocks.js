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
    let amethyst_type = ['ae2:cut_quartz_slab', 'ae2:smooth_quartz_slab', 'ae2:quartz_brick_slab', 'ae2:chiseled_quartz_slab', 'ae2:quartz_pillar_slab','ae2:fluix_block', 'ae2:fluix_stairs', 'ae2:fluix_wall', 'ae2:fluix_slab', 'extendedae:entro_block', 'extendedae:entro_budding_fully', 'extendedae:entro_budding_mostly', 'extendedae:entro_budding_half', 'extendedae:entro_budding_hardly', 'ae2:flawless_budding_quartz', 'ae2:flawed_budding_quartz', 'ae2:chipped_budding_quartz', 'ae2:damaged_budding_quartz', 'ae2:quartz_block', 'ae2:cut_quartz_block', 'ae2:smooth_quartz_block', 'ae2:quartz_bricks', 'ae2:quartz_pillar', 'ae2:chiseled_quartz_block', 'ae2:quartz_stairs', 'ae2:cut_quartz_stairs', 'ae2:smooth_quartz_stairs', 'ae2:quartz_brick_stairs', 'ae2:chiseled_quartz_stairs', 'ae2:quartz_pillar_stairs', 'ae2:quartz_wall', 'ae2:cut_quartz_wall', 'ae2:smooth_quartz_wall', 'ae2:quartz_brick_wall', 'ae2:chiseled_quartz_wall', 'ae2:quartz_pillar_wall', 'ae2:quartz_slab']
    e.modify(amethyst_type,b=>{
        b.setSoundType('amethyst')
    })
})
