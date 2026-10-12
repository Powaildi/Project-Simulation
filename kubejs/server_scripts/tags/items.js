ServerEvents.tags('item',e=>{
    e.add('minecraft:coals','kubejs:graphite')
    e.add('ae2:all_quartz_dust','mekanism:dust_quartz')
    e.add('c:mushrooms','natures_spirit:shiitake_mushroom')
    e.add("c:cheese",'natures_spirit:cheese_bucket')
    e.add("c:cheeses",'natures_spirit:cheese_bucket')
    e.add('c:plates/steel','kubejs:steel_sheet')
    e.add('createdieselgenerators:fermentable',['kaleidoscope_cookery:flour', 'kaleidoscope_cookery:rice', 'minecraft:sweet_berries', 'delighto_flight:cloud_berries', 'farmersdelight:pumpkin_slice', 'minecraft:melon_slice',  'kaleidoscope_cookery:raw_noodles', 'farmersdelight:raw_pasta'])
    e.add('kubejs:fluxing_medium',['create:limestone','minecraft:calcite','minecraft:bone_meal'])
    e.add('kubejs:burner_eat',['mekanism:basic_fluid_tank', 'mekanism:advanced_fluid_tank', 'mekanism:elite_fluid_tank', 'mekanism:ultimate_fluid_tank', 'mekanism:creative_fluid_tank', 'fluidlogistics:copper_bucket', 'createdieselgenerators:canister'])

    let stained_glass = [
        'minecraft:white_stained_glass', 'minecraft:light_gray_stained_glass', 'minecraft:gray_stained_glass', 'minecraft:black_stained_glass', 
        'minecraft:brown_stained_glass', 'minecraft:red_stained_glass', 'minecraft:orange_stained_glass', 'minecraft:yellow_stained_glass', 
        'minecraft:lime_stained_glass', 'minecraft:green_stained_glass', 'minecraft:cyan_stained_glass', 'minecraft:light_blue_stained_glass', 
        'minecraft:blue_stained_glass', 'minecraft:purple_stained_glass', 'minecraft:magenta_stained_glass', 'minecraft:pink_stained_glass'
    ]
    stained_glass.forEach(item=>{
        let color = item.split(':')[1].split('_stained')[0]
        e.add('c:glass/'+color,item)
    })
    e.add('c:glass/colorless',['minecraft:glass', 'create:tiled_glass', 'create:framed_glass', 'create:horizontal_framed_glass', 'create:vertical_framed_glass'])

    e.add('vintageimprovements:curving_heads',['ae2:calculation_processor_press', 'ae2:engineering_processor_press', 'ae2:logic_processor_press', 'ae2:silicon_press', 'extendedae:concurrent_processor_press'])
})
