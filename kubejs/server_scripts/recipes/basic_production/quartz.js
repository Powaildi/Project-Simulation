ServerEvents.recipes(e=>{
    //水晶生长液
    e.recipes.vintageimprovements.pressurizing(Fluid.of('kubejs:growth_solution',500),
        ['mekanism:dust_quartz', 'create:zinc_nugget',Fluid.of('minecraft:water',475)],125)
        .secondaryFluidInput(Fluid.of('kubejs:sodium_hydroxide',25))
        .heated().id('pressurizing/growth_solution')
    //固定母岩
    e.recipes.create.item_application('createdieselgenerators:mold[createdieselgenerators:mold_type="kubejs:amethyst"]', 
        ['minecraft:budding_amethyst','kubejs:clamper'])
        .id('item_application/amethyst_manual_only')
    e.recipes.create.item_application('createdieselgenerators:mold[createdieselgenerators:mold_type="kubejs:certus"]',
        ['ae2:flawless_budding_quartz','kubejs:clamper'])
        .id('item_application/certus_manual_only')
    e.recipes.create.item_application('createdieselgenerators:mold[createdieselgenerators:mold_type="kubejs:entro"]',
        ['extendedae:entro_budding_fully','kubejs:clamper'])
        .id('item_application/entro_manual_only')
    //石英生产
    //紫水晶
    e.recipes.create.item_application([CreateItem.of('minecraft:budding_amethyst',0.01),CreateItem.of('4x minecraft:amethyst_shard',0.75)],
        ['minecraft:amethyst_block','minecraft:amethyst_shard'])
        .id('item_application/budding_amethyst')
        
    e.recipes.create.filling('minecraft:amethyst_cluster',['minecraft:large_amethyst_bud',Fluid.of('minecraft:water',100)])
        .id('filling/amethyst_cluster/4')
    e.recipes.create.filling('minecraft:large_amethyst_bud',['minecraft:medium_amethyst_bud',Fluid.of('minecraft:water',100)])
        .id('filling/amethyst_cluster/3')
    e.recipes.create.filling('minecraft:medium_amethyst_bud',['minecraft:small_amethyst_bud',Fluid.of('minecraft:water',100)])
        .id('filling/amethyst_cluster/2')
    e.recipes.create.filling('minecraft:small_amethyst_bud',['minecraft:amethyst_shard',Fluid.of('minecraft:water',100)])
        .id('filling/amethyst_cluster/1')
    e.recipes.create.mixing(['minecraft:small_amethyst_bud','minecraft:budding_amethyst'],
        ['minecraft:budding_amethyst',Fluid.of('minecraft:water',250)],125)
        .id('mixing/amethyst_cluster/0')
    e.recipes.createdieselgenerators.casting('2x minecraft:amethyst_shard','kubejs:amethyst',Fluid.of('minecraft:water',100))
        .id('casting/amethyst')
    //速成
    e.recipes.vintageimprovements.pressurizing(['2x minecraft:amethyst_cluster',CreateItem.of('minecraft:amethyst_cluster',0.5),'minecraft:budding_amethyst'],
        ['minecraft:budding_amethyst'],60).secondaryFluidInput(Fluid.of('mekanism:brine',250))
        .heated().id('pressurizing/amethyst_cluster')
    e.recipes.createdieselgenerators.casting('5x minecraft:amethyst_cluster','kubejs:amethyst',Fluid.of('mekanism:brine',250))
        .id('casting/amethyst_cluster')
    e.recipes.vintageimprovements.vibrating(['12x minecraft:amethyst_shard',CreateItem.of('6x minecraft:amethyst_shard',0.5)],
        'minecraft:amethyst_cluster',70)
        .id('vibrating/amethyst_cluster')
    //赛特斯石英
    e.recipes.create.filling('ae2:quartz_cluster',['ae2:large_quartz_bud',Fluid.of('mekanism:brine',100)])
        .id('filling/certus_cluster/4')
    e.recipes.create.filling('ae2:large_quartz_bud',['ae2:medium_quartz_bud',Fluid.of('mekanism:brine',100)])
        .id('filling/certus_cluster/3')
    e.recipes.create.filling('ae2:medium_quartz_bud',['ae2:small_quartz_bud',Fluid.of('mekanism:brine',100)])
        .id('filling/certus_cluster/2')
    e.recipes.create.filling('ae2:small_quartz_bud',['ae2:charged_certus_quartz_crystal',Fluid.of('mekanism:brine',100)])
        .id('filling/certus_cluster/1')
    e.recipes.create.mixing(['ae2:small_quartz_bud','ae2:flawed_budding_quartz',CreateItem.of('ae2:charged_certus_quartz_crystal',0.95)],
        ['ae2:flawed_budding_quartz','ae2:charged_certus_quartz_crystal',Fluid.of('mekanism:brine',250)],125)
        .id('mixing/certus_cluster/0')
    //速成
    e.recipes.vintageimprovements.pressurizing(['2x ae2:quartz_cluster',CreateItem.of('ae2:quartz_cluster',0.5),'ae2:flawless_budding_quartz'],
        ['ae2:flawless_budding_quartz'],60).secondaryFluidInput(Fluid.of('kubejs:growth_solution',250))
        .heated().id('pressurizing/certus_quartz_cluster')
    e.recipes.createdieselgenerators.casting('5x ae2:quartz_cluster','kubejs:certus',Fluid.of('kubejs:growth_solution',250))
        .id('casting/certus_quartz_cluster')
    e.recipes.vintageimprovements.vibrating(['8x ae2:certus_quartz_crystal',CreateItem.of('4x ae2:certus_quartz_crystal',0.5)],
        'ae2:quartz_cluster',70)
        .id('vibrating/certus_cluster')
    //恩特罗水晶
    e.recipes.createdieselgenerators.casting('5x extendedae:entro_crystal','kubejs:entro',Fluid.of('kubejs:growth_solution',250))
        .id('casting/entro_crystal')
    //研磨和粉碎
    e.recipes.create.milling('mekanism:dust_quartz','minecraft:quartz',60)
        .id('milling/quartz')
    e.recipes.create.crushing(['minecraft:quartz',CreateItem.of('minecraft:purple_dye',0.5)],'minecraft:amethyst_shard')
        .id('crushing/amethyst_shard')
    e.recipes.create.milling('extendedae:entro_dust','extendedae:entro_crystal',120)
        .id('milling/entro_crystal')
    //覆盖配方
    e.recipes.create.milling('ae2:certus_quartz_dust','ae2:certus_quartz_crystal',80)
        .id('create:milling/compat/ae2/certus_quartz')
    e.recipes.create.milling('ae2:fluix_dust','ae2:fluix_crystal',90)
        .id('create:milling/compat/ae2/fluix_crystal')
    //石英混合物
    e.remove({id:'extendedae:quartz_blend_alt'})
    e.recipes.create.mixing('12x extendedae:quartz_blend',
        [Ingredient.of('#ae2:all_quartz_dust',2),Ingredient.of(['mekanism:dust_coal','mekanism:dust_charcoal'],4),Ingredient.of('#c:sands',6)],
        90).heated().id('mixing/quartz_blend')
    //熔融石英
    e.recipes.create.mixing(Fluid.of('kubejs:molten_quartz',250),Ingredient.of('#ae2:all_quartz_dust'),90)
        .superheated().id('mixing/molten_quartz_1')
    e.recipes.create.mixing(Fluid.of('kubejs:molten_quartz',500),'extendedae:quartz_blend',60)
        .superheated().id('mixing/molten_quartz_2')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('kubejs:molten_quartz',500),'extendedae:quartz_blend',25)
        .secondaryFluidOutput(Fluid.of('kubejs:carbon_dioxide',500))
        .superheated().id('pressurizing/molten_quartz')
    //熔融石英用途
    e.recipes.create.mixing('2x ae2:quartz_fiber',
        [Fluid.of('kubejs:molten_quartz',250),'minecraft:string'],60)
        .id('mixing/quartz_fiber')
    e.recipes.create.mixing('4x minecraft:quartz',
        [Fluid.of('kubejs:molten_quartz',250),'mekanism:dust_quartz'],60)
        .id('mixing/quartz')
    e.recipes.vintageimprovements.pressurizing('create:rose_quartz',
        [Fluid.of('kubejs:molten_quartz',250),'3x minecraft:redstone'],125)
        .secondaryFluidInput(Fluid.of('kubejs:cryogen',100))
        .id('pressurizing/rose_quartz')
    e.recipes.vintageimprovements.pressurizing('ae2:quartz_glass',
        [Fluid.of('kubejs:molten_quartz',250)],125)
        .secondaryFluidInput(Fluid.of('kubejs:cryogen',100))
        .id('pressurizing/quartz_glass')
    e.recipes.vintageimprovements.pressurizing('ae2:quartz_vibrant_glass',
        [Fluid.of('kubejs:molten_quartz',250),'minecraft:glowstone_dust'],125)
        .secondaryFluidInput(Fluid.of('kubejs:cryogen',100))
        .id('pressurizing/quartz_vibrant_glass')
    //硅
    e.recipes.vintageimprovements.pressurizing('16x ae2:silicon',
        [Fluid.of('kubejs:molten_quartz',500),Ingredient.of(['mekanism:dust_coal','mekanism:dust_charcoal'],2)],125)
        .secondaryFluidOutput(Fluid.of('kubejs:carbon_dioxide',500))
        .superheated().id('pressurizing/silicon_advanced')
    e.recipes.vintageimprovements.pressurizing('ae2:silicon',
        Ingredient.of(['minecraft:amethyst_shard','minecraft:quartz','ae2:certus_quartz_crystal']),60)
        .heated().id('pressurizing/silicon')
    //经验
    e.recipes.vintageimprovements.polishing('create:experience_nugget','minecraft:quartz',1,2)
        .id('polishing/quartz')
//AE2
    //福鲁伊克斯水晶死锁
    e.remove({id:'ae2:transform/fluix_crystal'})
    e.findRecipes({id:'ae2:transform/fluix_crystals'}).forEach(recipe =>{
        recipe.json.get('result').getAsJsonObject().add('id','ae2:fluix_dust')
    })
    e.replaceOutput({id:'create:mixing/compat/ae2/fluix_crystal'},'ae2:fluix_crystal','2x ae2:fluix_dust')
    //赌怪配方，后续计划天降陨石获取
    e.recipes.vintageimprovements.pressurizing(CreateItem.of('ae2:fluix_crystal',0.05),[//0.002
        Fluid.of('createdieselgenerators:gasoline',500),'ae2:charged_certus_quartz_crystal','ae2:fluix_dust'
    ]).superheated().id('pressurizing/ae2/fluix_crystal_chance')
    //福鲁伊克斯汽油（已转移）
    //福鲁伊克斯水晶正常配方
    e.recipes.create.mixing('8x ae2:fluix_crystal',
        ['4x minecraft:redstone','4x minecraft:quartz','4x ae2:charged_certus_quartz_crystal',Fluid.of('kubejs:fluix_gasoline',50)],60)
        .id('mixing/ae2/fluix_crystal')
    e.findRecipes({id:'extendedae:assembler/fluix_transformation'}).forEach(recipe =>{
        //console.log(recipe.json)
        recipe.json.add('input_fluid',{"amount":50,"ingredient":{"fluid":"kubejs:fluix_gasoline"}})
    })
})