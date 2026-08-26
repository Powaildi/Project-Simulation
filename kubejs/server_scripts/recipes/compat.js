ServerEvents.recipes(e=>{
//CC&A
    //删除吸管和cca的吸管烈焰人燃烧室
    e.remove({output:'createaddition:straw'})
    e.remove({type:'createaddition:liquid_burning'})
//柴油动力
    //去除剪线配方
    e.remove({type:'createdieselgenerators:wire_cutting'})
    //去除植物油配方
    e.remove({id:'createdieselgenerators:compacting/plant_oil'})
    //去除出错的搅拌配方，但是不恢复
    e.remove({type:'create:mixing',mod:'createdieselgenerators'})
//电力学
    //去除3粒合线配方
    e.remove({id:'electroenergetics:crafting/copper_wire'})
    e.remove({id:'electroenergetics:crafting/electrum_wire'})
    e.remove({id:'electroenergetics:crafting/iron_wire'})
    //变压器铁片
    e.remove({id:'electroenergetics:stonecutting/transformer_core_lamination'})
    e.recipes.vintageimprovements.turning('electroenergetics:transformer_core_lamination',Item.of('create:iron_sheet'),40)
    //去除植物油配方
    e.remove({id:'electroenergetics:compacting/plant_oil'})
//经典改进
    //清除硫
    e.remove({id:"vintageimprovements:pressurizing/sulfur_dioxide"})
    e.replaceOutput({output:'vintageimprovements:sulfur_chunk'},'vintageimprovements:sulfur_chunk','mekanism:dust_sulfur')
    e.shapeless('minecraft:sulfur',Item.of('mekanism:dust_sulfur',9))
    e.shapeless(Item.of('mekanism:dust_sulfur',9),['minecraft:sulfur'])
    //替换铁弹簧，以让它们在JEI中能同时看到
    e.replaceInput({input:'vintageimprovements:iron_spring'},'vintageimprovements:iron_spring','simulated:spring')
    e.replaceOutput({output:'vintageimprovements:iron_spring'},'vintageimprovements:iron_spring','simulated:spring')
    //让其它被替换的物品能同时看到
    e.replaceInput({input:'vintageimprovements:andesite_sheet'},'vintageimprovements:andesite_sheet','createdeco:andesite_sheet')
    e.replaceOutput({output:'vintageimprovements:andesite_sheet'},'vintageimprovements:andesite_sheet','createdeco:andesite_sheet')

//下界乐事
    //清理需要辣椒粉增殖烈焰粉的配方
    e.remove({output:'minecraft:blaze_powder',input:'minecraft:blaze_powder'})
//云端之乐
    //充能玫瑰茶
    e.recipes.create.filling(Item.of('delighto_flight:charged_rose_tea',1),
        [Fluid.of('delighto_flight:charged_rose_tea',250),'minecraft:glass_bottle'])
        .id('filling/delighto_flight/charged_rose_tea')
    e.recipes.create.emptying([Fluid.of('delighto_flight:charged_rose_tea',250),'minecraft:glass_bottle'],
        Item.of('delighto_flight:charged_rose_tea',1))
        .id('emptying/delighto_flight/charged_rose_tea')
//森罗物语
    //清除机械动力的面团配方
    e.remove({id:'create:crafting/appliances/dough'})
//mek
    //去除生物燃料配方
    e.remove({output:'mekanism:bio_fuel'})
    e.remove({output:'mekanism:block_bio_fuel'})
    e.replaceInput({input:'mekanism:block_bio_fuel'},'mekanism:block_bio_fuel','createaddition:biomass_pellet_block')
    //种植站
    e.replaceInput({id:'mekmm:planting_station'},'mekanism:bio_fuel',Ingredient.of('#c:fuels/bio'))
    
//AE2
    //压模配方
    let pressing = [
        ['ae2:printed_calculation_processor', 'ae2:calculation_processor_press', 'ae2:certus_quartz_crystal'],
        ['ae2:printed_engineering_processor', 'ae2:engineering_processor_press', 'minecraft:diamond'],
        ['ae2:printed_logic_processor', 'ae2:logic_processor_press', 'minecraft:gold_ingot'],
        ['ae2:printed_silicon', 'ae2:silicon_press', 'ae2:silicon'],
        ['extendedae:concurrent_processor_print', 'extendedae:concurrent_processor_press', 'extendedae:entro_crystal'],
        ['appflux:printed_energy_processor', 'appflux:energy_processor_press', 'appflux:charged_redstone']
    ]
    pressing.forEach(element=>{
        let [printed,press,input] = element
        e.recipes.vintageimprovements.curving(printed,input,10,0,0,press)
            .id('curving/'+printed.replace(':','/'))
    })
})
