ServerEvents.tags('item',e=>{
    e.add('minecraft:coals','kubejs:graphite')
    e.add('ae2:all_quartz_dust','mekanism:dust_quartz')
    e.add('c:mushrooms','natures_spirit:shiitake_mushroom')
    e.add("c:cheese",'natures_spirit:cheese_bucket')
    e.add("c:cheeses",'natures_spirit:cheese_bucket')
    e.add('c:plates/steel','kubejs:steel_sheet')
    e.add('createdieselgenerators:fermentable',['kaleidoscope_cookery:flour', 'kaleidoscope_cookery:rice', 'minecraft:sweet_berries', 'delighto_flight:cloud_berries', 'farmersdelight:pumpkin_slice', 'minecraft:melon_slice',  'kaleidoscope_cookery:raw_noodles', 'farmersdelight:raw_pasta'])
    e.add('kubejs:fluxing_medium',['create:limestone','minecraft:calcite','minecraft:bone_meal'])

    e.remove('c:storage_blocks/steel','createbigcannons:steel_block')
})
