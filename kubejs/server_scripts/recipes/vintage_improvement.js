ServerEvents.recipes(e=>{
    //机器和工具配方
    e.remove({id:'vintageimprovements:sequenced_assembly/recipe_card'})
    e.shapeless('vintageimprovements:recipe_card',['create:brass_sheet','minecraft:paper'])
    e.replaceInput({id:'vintageimprovements:craft/spring_coiling_machine'},'vintageimprovements:spring_coiling_machine_wheel', 'minecraft:iron_block' )


    //清除硫
    e.remove({id:"vintageimprovements:pressurizing/sulfur_dioxide"})
    e.replaceOutput({output:'vintageimprovements:sulfur_chunk'},'vintageimprovements:sulfur_chunk','mekanism:dust_sulfur')
    e.shapeless('minecraft:sulfur',Item.of('mekanism:dust_sulfur',9))
    e.shapeless(Item.of('mekanism:dust_sulfur',9),['minecraft:sulfur'])

    // let leaves_vibrating = e.findRecipes({id:'vintageimprovements:vibrating/leaves_vibrating'})[0].json
    // //console.log(leaves_vibrating)
    // leaves_vibrating.addProperty('processing_time',1)
    // leaves_vibrating
    // e.custom(leaves_vibrating)
    // .id('vintageimprovements:vibrating/leaves_vibrating')

    //替换铁弹簧，以让它们在JEI中能同时看到
    e.replaceInput({input:'vintageimprovements:iron_spring'},'vintageimprovements:iron_spring','simulated:spring')
    e.replaceOutput({output:'vintageimprovements:iron_spring'},'vintageimprovements:iron_spring','simulated:spring')

    
})
