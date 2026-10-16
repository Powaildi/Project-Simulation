
ServerEvents.recipes(e=>{
    //纸箱
    e.shaped('mekanism:cardboard_box',[
        ' A ',
        'ABA',
        ' A '
    ],{
        A:'create:cardboard',
        B:'minecraft:nether_star'
    }).id('mekanism:cardboard_box')

    let rolling = [
        ['3x electroenergetics:copper_wire','create:copper_sheet'],
        ['3x electroenergetics:iron_wire','create:iron_sheet'],
        ['2x simulated:spring','kubejs:industrial_iron_ingot'],
        ['simulated:spring','minecraft:iron_ingot'],
    ]
    if(Platform.isLoaded('createaddition')){
        rolling.concat([
            ['2x createaddition:copper_rod','minecraft:copper_ingot'],
            ['2x createaddition:iron_rod','minecraft:iron_ingot'],        
            ['2x createaddition:electrum_rod','createaddition:electrum_ingot'],
            ['3x electroenergetics:electrum_wire','createaddition:electrum_sheet'],
            ['2x createaddition:gold_rod','minecraft:gold_ingot'],
            ['2x createaddition:gold_wire','create:golden_sheet'],
            ['simulated:spring','createaddition:iron_rod']
        ])
    }
    rolling.forEach(element=>{
        let [output,input] = element
        e.recipes.mekmm.rolling_mill(output,input)
    })
    let lathing = [
        ['minecraft:barrel','#minecraft:logs'],
        ['create:brass_hand','create:brass_ingot'],
        ['create:electron_tube','create:polished_rose_quartz'],
        ['create:polished_rose_quartz','create:rose_quartz'],
        ['electroenergetics:transformer_core_lamination','create:iron_sheet']
    ]
    lathing.forEach(element=>{
        let [output,input] = element
        e.recipes.mekmm.lathe(output,input)
    })
    


    //气液转化
    let converting = [
        ['kubejs:wood_gas','kubejs:wood_gas'],
        ['kubejs:petrol_gas','kubejs:lpg'],
        ['kubejs:nitrogen','kubejs:nitrogen'],
        ['kubejs:nitrogen_dioxide','kubejs:nitrogen_dioxide'],
        ['kubejs:nitric_acid','kubejs:nitric_acid'],
        ['kubejs:nitrogen_fertilizer','kubejs:nitrogen_fertilizer'],
        ['kubejs:ammonia','kubejs:ammonia'],
        ['kubejs:carbon_dioxide','kubejs:carbon_dioxide'],
        ['kubejs:sodium_hydroxide','kubejs:sodium_hydroxide']
    ]
    converting.forEach(element=>{
        let [gas,fluid] = element
        e.recipes.mekanism.rotary('1x '+gas,Fluid.of(fluid,1),'1x '+gas,Fluid.of(fluid,1))
    })
    //二氧化碳
    e.recipes.mekanism.chemical_infusing('1x kubejs:carbon_dioxide','1x mekanism:oxygen','1x mekanism:carbon')
    //氮气类合成
    e.recipes.mekanism.chemical_infusing('2x kubejs:nitrogen_dioxide','2x mekanism:oxygen','1x kubejs:nitrogen')
    e.recipes.mekanism.chemical_infusing('2x kubejs:ammonia','3x mekanism:hydrogen','1x kubejs:nitrogen')
    e.recipes.mekanism.chemical_infusing('1x kubejs:nitric_acid','1x kubejs:nitrogen_dioxide','1x mekanism:water_vapor')
    //氮肥
    e.recipes.mekanism.chemical_infusing('4x kubejs:nitrogen_fertilizer','1x kubejs:nitric_acid','1x kubejs:ammonia')
    e.recipes.mekanism.chemical_infusing('2x kubejs:nitrogen_fertilizer','1x mekanism:hydrogen_chloride','1x kubejs:ammonia')
    e.recipes.mekanism.chemical_infusing('2x kubejs:nitrogen_fertilizer','1x mekanism:sulfuric_acid','1x kubejs:ammonia')
    //营养液
    e.recipes.mekanism.chemical_infusing('8x mekmm:nutrient_solution','1x kubejs:nitrogen_fertilizer','1x mekmm:nutritional_paste')
    e.recipes.mekanism.chemical_infusing('8x mekmm:nutrient_solution','1x kubejs:nitrogen_fertilizer','1x kubejs:carbon_dioxide')
    //氢氧化钠
    e.remove({id:'mekanism:separator/brine'})
    e.recipes.mekanism.separating('2x kubejs:sodium_hydroxide','1x mekanism:chlorine','10x mekanism:brine')
    e.recipes.mekanism.separating('2x mekanism:sodium','1x mekanism:oxygen','2x kubejs:sodium_hydroxide')
    //火把改出木炭
    //e.replaceOutput({id:'mekanism:sawing/torch'},'minecraft:coal','minecraft:charcoal')

    //碳粉
    e.recipes.mekanism.crushing('3x mekanism:dust_charcoal','minecraft:charcoal')
        .id('mekanism:crushing/charcoal_dust')
    e.recipes.mekanism.crushing('3x mekanism:dust_coal','minecraft:coal')
        .id('mekanism:processing/coal/to_dust')
    
    //电解核心
    e.shaped('mekanism:electrolytic_core',[
        'ABA',
        'CAD',
        'ABA'
    ],{
        A:'mekanism:alloy_infused',
        B:'mekanism:ingot_osmium',
        C:'kubejs:industrial_iron_sheet',
        D:'create:brass_sheet'
    }).id('mekanism:electrolytic_core')

    //融合机染料产出改变
    let combines = e.findRecipes({type:'mekanism:combining',output:Ingredient.of('#c:dyes')})
    combines.forEach(element=>{
        return//是否启用

        let json = element.json
        let main_input = json.get('main_input')
        let extra_input = json.get('extra_input')
        let output = element.getOriginalRecipeResult()
        output.setCount(output.getCount()-1)//克扣一个

        e.recipes.mekanism.combining(output,main_input,extra_input).id(element.getId())
    })

    
})
