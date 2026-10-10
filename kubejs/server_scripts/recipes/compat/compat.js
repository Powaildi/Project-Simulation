ServerEvents.recipes(e=>{
//柴油动力
    //去除剪线配方 因为CCA不在所以不去除
    // e.remove({type:'createdieselgenerators:wire_cutting'})
    //去除植物油配方 因为CCA不在所以不去除
    // e.remove({id:'createdieselgenerators:compacting/plant_oil'})
    //去除出错的搅拌配方，但是不恢复
    e.remove({type:'create:mixing',mod:'createdieselgenerators'})
//电力学
    //去除3粒合线配方 因为CCA不在所以不去除
    if(Platform.isLoaded('createaddition')){
        e.remove({id:'electroenergetics:crafting/copper_wire'})
        e.remove({id:'electroenergetics:crafting/electrum_wire'})
        e.remove({id:'electroenergetics:crafting/iron_wire'})
    }else{
        e.recipes.create.cutting('3x electroenergetics:copper_wire','create:copper_sheet')
            .id('cutting/electroenergetics/copper_wire')
        e.recipes.create.cutting('3x electroenergetics:iron_wire','create:iron_sheet')
            .id('cutting/electroenergetics/iron_wire')
    }
    //变压器铁片
    e.remove({id:'electroenergetics:stonecutting/transformer_core_lamination'})
    e.recipes.vintageimprovements.turning('electroenergetics:transformer_core_lamination',Item.of('create:iron_sheet'),40)
    //去除植物油配方
    e.remove({id:'electroenergetics:compacting/plant_oil'})
//经典改进
    //清除硫
    e.remove({id:"vintageimprovements:pressurizing/sulfur_dioxide"})
    e.replaceOutput({output:'vintageimprovements:sulfur_chunk'},'vintageimprovements:sulfur_chunk','mekanism:dust_sulfur')
    
//云端之乐
    //充能玫瑰茶
    e.recipes.create.filling(Item.of('delighto_flight:charged_rose_tea',1),
        [Fluid.of('delighto_flight:charged_rose_tea',250),'minecraft:glass_bottle'])
        .id('filling/delighto_flight/charged_rose_tea')
    e.recipes.create.emptying([Fluid.of('delighto_flight:charged_rose_tea',250),'minecraft:glass_bottle'],
        Item.of('delighto_flight:charged_rose_tea',1))
        .id('emptying/delighto_flight/charged_rose_tea')

//mek

    //去除/重做生物燃料配方
    if(Platform.isLoaded('createaddition')){
        e.remove({output:'mekanism:bio_fuel'})
    }else{
        e.remove({output:'mekanism:bio_fuel',not:{input:'mekanism:block_bio_fuel'}})
        //添加新的生物燃料配方
        e.recipes.create.mixing('mekanism:bio_fuel',
            [Fluid.of('createdieselgenerators:plant_oil',50),Ingredient.of('#c:crops')]
        ).processingTime(90).heated().id('mixing/bio_fuel/crops')
        e.recipes.create.mixing('4x mekanism:bio_fuel',
            [Fluid.of('createdieselgenerators:plant_oil',200),Ingredient.of('#c:crops',4)]
        ).processingTime(90).heated().id('mixing/bio_fuel/crops_4')
        // e.recipes.create.mixing('mekanism:bio_fuel',
        //     [Fluid.of('createdieselgenerators:plant_oil',100),'8x minecraft:stick']
        // ).processingTime(90).heated().id('mixing/bio_fuel/sticks')
        e.recipes.create.mixing('mekanism:bio_fuel',
            [Fluid.of('createdieselgenerators:plant_oil',50),Ingredient.of('#minecraft:leaves',4)]
        ).processingTime(90).heated().id('mixing/bio_fuel/leaves')
        e.recipes.create.mixing('4x mekanism:bio_fuel',
            [Fluid.of('createdieselgenerators:plant_oil',200),Ingredient.of(['extendedae:fishbig', 'extendedae:mddyue'],1)]
        ).processingTime(90).heated().id('mixing/bio_fuel/extendedae')
    }
    //种植站
    e.replaceInput({id:'mekmm:planting_station'},'mekanism:bio_fuel',Ingredient.of('#c:fuels/bio'))
    
//AE2
    //压模配方
    let pressing = [
        ['ae2:printed_calculation_processor', 'ae2:calculation_processor_press', 'ae2:certus_quartz_crystal'],
        ['ae2:printed_engineering_processor', 'ae2:engineering_processor_press', 'minecraft:diamond'],
        ['ae2:printed_logic_processor', 'ae2:logic_processor_press', 'minecraft:gold_ingot'],
        ['ae2:printed_silicon', 'ae2:silicon_press', 'ae2:silicon'],
        ['extendedae:concurrent_processor_print', 'extendedae:concurrent_processor_press', 'extendedae:entro_crystal']
    ]
    if(Platform.isLoaded('appflux')){
        pressing.push(['appflux:printed_energy_processor', 'appflux:energy_processor_press', 'appflux:charged_redstone'])
    }
    pressing.forEach(element=>{
        let [printed,press,input] = element
        e.recipes.vintageimprovements.curving(printed,input,10,0,0,press)
            .id('curving/'+printed.replace(':','/'))
    })
//超越维度
    //经验
    e.recipes.create.mixing(Fluid.of('beyonddimensions:xp_fluid',60),
        ['create:experience_nugget'],1)
        .id('mixing/beyonddimensions/xp_fluid_1')
    e.recipes.create.mixing(Fluid.of('beyonddimensions:xp_fluid',540),
        ['create:experience_block'],1).heated()
        .id('mixing/beyonddimensions/xp_fluid_2')



})
