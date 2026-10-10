StartupEvents.registry('item', e => {
    //注册物品
    e.create('circuit').displayName('电路板')
    e.create('graphite').displayName('石墨')
    e.create('logistics_toolbox').displayName('物流工具箱')
    e.create('fluid_toolbox').displayName('液流工具箱')
    e.create('advanced_toolbox').displayName('高级工具箱').rarity('uncommon')
    e.create('eletric_toolbox').displayName('电力工具箱')
    e.create('infinite_heat_bar').displayName('无限加热燃料棒').rarity('uncommon')
    e.create('infinite_superheat_bar').displayName('无限超级加热燃料棒').rarity("epic")
    e.create('steel_sheet').displayName('钢板')
    e.create('industrial_iron_ingot').displayName('工业铁锭').rarity('uncommon')
    e.create('industrial_iron_sheet').displayName('工业铁板').rarity('uncommon')
    e.create('industrial_iron_nugget').displayName('工业铁粒').rarity('uncommon')
    e.create('clamper').displayName('固定器').rarity('rare')

})
CDGEvents.molds(e=>{
    e.create('andesite','固定的安山岩')
    //它的key是"mold.kubejs.andesite"
    e.create('amethyst','固定的紫水晶母岩')
    e.create('certus','固定的赛特斯石英母岩')
    e.create('entro','固定的恩特罗化福鲁伊克斯母岩')
    
})
let registered_buckets = [
    'kubejs:growth_solution_bucket','kubejs:cryogen_bucket', 'kubejs:bone_meal_diluent_bucket', 'kubejs:wood_gas_bucket',
    'kubejs:lpg_bucket', 'kubejs:refined_oil_bucket', 'kubejs:lube_bucket', 'kubejs:tar_bucket', 'kubejs:molten_quartz_bucket', 
    'kubejs:fluix_gasoline_bucket', 'kubejs:mercury_bucket', 'kubejs:liquid_air_bucket', 'kubejs:liquid_nether_air_bucket', 
    'kubejs:liquid_end_air_bucket', 'kubejs:void_bucket', 'kubejs:carbon_dioxide_bucket', 'kubejs:nitrogen_bucket', 
    'kubejs:nitrogen_dioxide_bucket', 'kubejs:nitric_acid_bucket', 'kubejs:ammonia_bucket', 'kubejs:nitrogen_fertilizer_bucket', 
    'kubejs:sodium_hydroxide_bucket','kubejs:molten_copper_bucket', 'kubejs:molten_iron_bucket', 'kubejs:molten_gold_bucket', 
    'kubejs:molten_zinc_bucket', 'kubejs:molten_tin_bucket', 'kubejs:molten_silver_bucket', 'kubejs:molten_brass_bucket',
    'kubejs:molten_industrial_iron_bucket', 'kubejs:molten_steel_bucket', 'kubejs:incomplete_steel_bucket'
]

ItemEvents.modification(e=>{

    e.modify(registered_buckets,i=>{
        i.setCraftingRemainder('minecraft:bucket')
    })
    e.modify('createdieselgenerators:gasoline_bucket',i=>{
        i.setFood(20,1)
        i.modifyFood(builder=>{
            builder.usingConvertsTo('minecraft:bucket')
        })
    })
    e.modify('minecraft:dirt',i=>{
        i.setFood(4,0.25)
        i.modifyFood(builder=>{
            builder.saturation(0.25)
            builder.effect('minecraft:nausea',200,1,0.25)
            builder.eatSeconds(10)
        })
    })
})
