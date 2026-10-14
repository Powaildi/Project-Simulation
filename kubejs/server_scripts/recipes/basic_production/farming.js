ServerEvents.recipes(e=>{
        
    //甜水
    e.recipes.create.mixing(Fluid.of('kubejs:sweet_water',500),
        [Fluid.of('minecraft:water',500),'minecraft:sugar'],125)
        .id('mixing/sweet_water_1')
    e.recipes.create.mixing(Fluid.of('kubejs:sweet_water',500),
        [Fluid.of('minecraft:water',450),Fluid.of('create:honey',50)],60)
        .id('mixing/sweet_water_2')
    e.recipes.create.compacting([Fluid.of('kubejs:sweet_water',200),'2x minecraft:melon_seeds'],
        '2x minecraft:melon_slice')
        .id('compacting/sweet_water')
    //骨粉再生
    e.recipes.createdieselgenerators.basin_fermenting('3x minecraft:bone',
        ['3x minecraft:bone_meal',Fluid.of('kubejs:sweet_water',50)],
        60).id('basin_fermenting/bone')
    //骨粉稀释液
    e.recipes.create.mixing(Fluid.of('kubejs:bone_meal_diluent',500),
        [Fluid.of('minecraft:water',500),'4x minecraft:bone_meal'],90)
        .id('mixing/bone_meal_diluent')
    //树木肥料
    e.shapeless('create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',2),'minecraft:moss_block','minecraft:bone_meal'])
        .id('crafting/appliances/tree_fertilizer')

    //盐水
    e.recipes.create.mixing(Fluid.of('mekanism:brine',250),
        [Fluid.of('minecraft:water',250),'mekanism:salt'],
        125).id('mixing/mekanism/brine')

    e.recipes.create.mixing('4x mekanism:salt',
        [Fluid.of('mekanism:brine',1000)],
        125).heated().id('mixing/mekanism/salt')

    //糖
    e.recipes.create.compacting('minecraft:sugar','minecraft:beetroot')
    .heated().id('compacting/sugar_from_beetroot')
    e.recipes.create.mixing('4x minecraft:sugar',
        [Fluid.of('mekanism:brine',250),'minecraft:beetroot'],90)
        .heated().id('mixing/sugar_from_beetroot')
    
    //面团
    e.remove({id:'createdieselgenerators:basin_fermenting/dough'})
    e.recipes.createdieselgenerators.basin_fermenting(['farmersdelight:wheat_dough',CreateItem.of('farmersdelight:wheat_dough',0.2)],
        ['create:wheat_flour',Fluid.of('minecraft:water',100)],40
        ).id('basin_fermenting/dough')
    
    //有机肥料
    e.shapeless('farmersdelight:organic_compost',
        ['minecraft:dirt', '2x minecraft:bone_meal', '2x mekanism:bio_fuel', '2x createdieselgenerators:wood_chip']
        ).id('crafting/farmersdelight/organic_compost')
//染料类
    //余烬面粉
    e.recipes.create.mixing('16x create:cinder_flour',
        [Fluid.of('create_dragons_plus:red_dye',500),'4x create:wheat_flour'],60)
        .heated().id('mixing/create/cinder_flour')
    //粘液块
    e.recipes.create.mixing('minecraft:slime_block',
        ['4x create:wheat_flour',Fluid.of('create_dragons_plus:lime_dye',1000)],90)
        .id('mixing/slime_block')
    //蜂蜜
    e.recipes.create.mixing(Fluid.of('create:honey',250),
        [Fluid.of('create_dragons_plus:yellow_dye',250),'minecraft:sugar','minecraft:slime_ball'],
        390).id('mixing/create/honey')
    //蜜脾
    e.recipes.create.filling('minecraft:honeycomb',
        [Ingredient.of(['farmersdelight:canvas','delighto_flight:cloud_silk']),Fluid.of('create:honey',250)]
        ).id('filling/honeycomb')
    
})