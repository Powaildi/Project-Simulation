ServerEvents.recipes(e=>{
    
    //焦油用途
    e.replaceInput({id:'createdieselgenerators:crafting/asphalt_block'},'createdieselgenerators:crude_oil_bucket',
        Ingredient.of(['kubejs:tar_bucket','createdieselgenerators:crude_oil_bucket']))
    e.recipes.create.mixing('4x createdieselgenerators:asphalt_block',
        ['2x minecraft:gravel','2x minecraft:sand',Fluid.of('kubejs:tar',100)])
        .id('mixing/createdieselgenerators/asphalt_block')

//工作盆发酵
//   "heat_requirement": "heated",
    //乙醇
    e.remove({id:'createdieselgenerators:basin_fermenting/fermentable'})
    e.remove({id:'createdieselgenerators:bulk_fermenting/fermentable'})
    
    e.recipes.createdieselgenerators.basin_fermenting(Fluid.of('createdieselgenerators:ethanol',200),
        [Ingredient.of('#createdieselgenerators:fermentable'),'createdieselgenerators:wood_chip',Fluid.of('minecraft:water',200)],
        400).id('basin_fermenting/ethanol')
    
//批量发酵
    e.recipes.createdieselgenerators.bulk_fermenting(Fluid.of('createdieselgenerators:ethanol',300),
        [Ingredient.of('#createdieselgenerators:fermentable'),'createdieselgenerators:wood_chip',Fluid.of('minecraft:water',300)],
        300).id('bulk_fermenting/ethanol')
    e.recipes.createdieselgenerators.bulk_fermenting([Fluid.of('mekanism:brine',1000),'minecraft:cobblestone'],
        [Fluid.of('minecraft:water',1000),'minecraft:cobblestone'],
        300).superheated().id('bulk_fermenting/mekanism/brine')
    e.recipes.createdieselgenerators.bulk_fermenting([Fluid.of('mekanism:steam',1000)],
        [Fluid.of('minecraft:water',1000),'create:iron_sheet'],
        400).heated().id('bulk_fermenting/mekanism/steam')

// {
//   "type": "createdieselgenerators:bulk_fermenting",
//   "ingredients": [
//     {
//       "tag": "createdieselgenerators:fermentable"
//     },
//     {
//       "item": "minecraft:bone_meal"
//     }
//   ],
//   "processing_time": 400,
//   "results": [
//     {
//       "id": "createdieselgenerators:ethanol",
//       "amount": 400
//     }
//   ]
// }
//分馏
    //2层使用原配方
    //3层
    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('createdieselgenerators:diesel',100),
            Fluid.of('createdieselgenerators:gasoline',100),
            Fluid.of('kubejs:lpg',50)
        ],
        Fluid.of('createdieselgenerators:crude_oil',200),
        120
    ).heated().id('distillation/crude_oil/3_layer')

    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('createdieselgenerators:diesel',150),
            Fluid.of('createdieselgenerators:gasoline',150),
            Fluid.of('kubejs:lpg',100)
        ],
        Fluid.of('createdieselgenerators:crude_oil',200),
        80
    ).superheated().id('distillation/crude_oil/3_layer_superheated')

    //4层
    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('kubejs:tar',50),
            Fluid.of('createdieselgenerators:diesel',100),
            Fluid.of('createdieselgenerators:gasoline',100),
            Fluid.of('kubejs:lpg',50)
        ],
        Fluid.of('createdieselgenerators:crude_oil',200),
        120
    ).heated().id('distillation/crude_oil/4_layer')

    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('kubejs:tar',100),
            Fluid.of('createdieselgenerators:diesel',150),
            Fluid.of('createdieselgenerators:gasoline',150),
            Fluid.of('kubejs:lpg',100)
        ],
        Fluid.of('createdieselgenerators:crude_oil',200),
        80
    ).superheated().id('distillation/crude_oil/4_layer_superheated')

    //精炼油
    //        Fluid.of(,100),
    //液态空气
    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('mekanism:oxygen',200),
            Fluid.of('kubejs:nitrogen',800)
        ],
        Fluid.of('kubejs:liquid_air',1000),
        180
    ).heated().id('distillation/liquid_air')

    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('mekanism:oxygen',200),
            Fluid.of('kubejs:nitrogen',800)
        ],
        Fluid.of('kubejs:liquid_air',1000),
        60
    ).superheated().id('distillation/liquid_air_superheated')

    //液态下界空气
    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('mekanism:sulfur_trioxide',200),
            Fluid.of('mekanism:sulfur_dioxide',400),
            Fluid.of('kubejs:nitrogen_dioxide',400),
            Fluid.of('mekanism:oxygen',200),
            Fluid.of('kubejs:nitrogen',800)
        ],
        Fluid.of('kubejs:liquid_nether_air',2000),
        1800
    ).heated().id('distillation/nether_air')

    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('mekanism:sulfur_trioxide',200),
            Fluid.of('mekanism:sulfur_dioxide',400),
            Fluid.of('kubejs:nitrogen_dioxide',400),
            Fluid.of('mekanism:oxygen',200),
            Fluid.of('kubejs:nitrogen',800)
        ],
        Fluid.of('kubejs:liquid_nether_air',2000),
        600
    ).superheated().id('distillation/nether_air_superheated')

    //液态末地空气
    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('mekanism:chlorine',100),
            Fluid.of('mekanism:oxygen',200),
            Fluid.of('kubejs:nitrogen',600),
            Fluid.of('mekanism:hydrofluoric_acid',100)
        ],
        Fluid.of('kubejs:liquid_end_air',1000),
        240
    ).heated().id('distillation/end_air')

    e.recipes.createdieselgenerators.distillation(
        [
            Fluid.of('mekanism:chlorine',100),
            Fluid.of('mekanism:oxygen',200),
            Fluid.of('kubejs:nitrogen',600),
            Fluid.of('mekanism:hydrofluoric_acid',100)
        ],
        Fluid.of('kubejs:liquid_end_air',1000),
        80
    ).superheated().id('distillation/end_air_superheated')

})