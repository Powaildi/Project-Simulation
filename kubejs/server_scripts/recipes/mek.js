
ServerEvents.recipes(e=>{
    //去除生物燃料配方
    e.remove({output:'mekanism:bio_fuel'})
    e.remove({output:'mekanism:block_bio_fuel'})
    e.replaceInput({input:'mekanism:block_bio_fuel'},'mekanism:block_bio_fuel','createaddition:biomass_pellet_block')
    
    //纸箱
    e.shaped('mekanism:cardboard_box',[
        ' A ',
        'ABA',
        ' A '
    ],{
        A:'create:cardboard',
        B:'mekanism:pellet_antimatter'
    }).id('mekanism:cardboard_box')

    let rolling = [
        ['2x electroenergetics:copper_wire','create:copper_sheet'],
        ['2x createaddition:copper_rod','minecraft:copper_ingot'],
        ['2x createaddition:iron_rod','minecraft:iron_ingot'],
        ['2x electroenergetics:iron_wire','create:iron_sheet'],
        ['2x createaddition:electrum_rod','createaddition:electrum_ingot'],
        ['2x electroenergetics:electrum_wire','createaddition:electrum_sheet'],
        ['2x createaddition:gold_rod','minecraft:gold_ingot'],
        ['2x createaddition:gold_wire','create:golden_sheet'],
        ['simulated:spring','createaddition:iron_rod']
    ]
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
    
    //去皮配方
    let treecutting = e.findRecipes({output:'farmersdelight:tree_bark',type:'create:cutting'})
    treecutting.forEach(element=>{
        let json = element.json
        //console.log(json)
        let ingredients = json.get('ingredients')
        //console.log(ingredients)
        //为什么这个列表不吃[0]?
        let input = String(ingredients).slice(10,-3)
        let results = json.get('results')
        let [a,b] = String(results).slice(1,-1).split(',')
        a=a.slice(7,-2)
        b=b.slice(7,-2)

        e.recipes.mekanism.sawing(a,b,1,input).id('sawing/'+input.replace(':','/'))
    })

    //气液转化
    let converting = [
        ['kubejs:wood_gas','kubejs:wood_gas'],
        ['kubejs:petrol_gas','kubejs:lpg'],
        ['kubejs:nitrogen','kubejs:nitrogen'],
        ['kubejs:nitrogen_dioxide','kubejs:nitrogen_dioxide'],
        ['kubejs:nitrogen_fertilizer','kubejs:nitrogen_fertilizer'],
        ['kubejs:ammonia','kubejs:ammonia'],
        ['kubejs:carbon_dioxide','kubejs:carbon_dioxide']
    ]
    converting.forEach(element=>{
        let [gas,fluid] = element
        e.recipes.mekanism.rotary('1x '+gas,Fluid.of(fluid,1),'1x '+gas,Fluid.of(fluid,1))
    })
    
    
    // e.custom({
    //     "type":"mekanism:rotary",
    //     "chemical_input":{
    //         "amount":1,
    //         "chemical":"mekanism:hydrogen_chloride"
    //     },
    //     "chemical_output":{
    //         "amount":1,
    //         "id":"mekanism:hydrogen_chloride"
    //     },
    //     "fluid_input":{
    //         "amount":1,
    //         "tag":"c:hydrogen_chloride"
    //     },
    //     "fluid_output":{
    //         "amount":1,
    //         "id":"mekanism:hydrogen_chloride"
    //     }
    // })
    //火把改出木炭
    e.replaceOutput({id:'mekanism:sawing/torch'},'minecraft:coal','minecraft:charcoal')

    

    //融合机染料产出改变
    let combines = e.findRecipes({type:'mekanism:combining',output:Ingredient.of('#c:dyes')})
    combines.forEach(element=>{
        let json = element.json
        let main_input = json.get('main_input')
        let extra_input = json.get('extra_input')
        let output = element.getOriginalRecipeResult()
        output.setCount(output.getCount()-1)//克扣一个
        //下一行注释决定是否启用
        //e.recipes.mekanism.combining(output,main_input,extra_input).id(element.getId())
        
    })

    
})
