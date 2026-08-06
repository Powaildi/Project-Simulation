
ServerEvents.recipes(e=>{
    //染料
    let milling = [
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'minecraft:cherry_leaves'],
        [['4x minecraft:pink_dye',CreateItem.of('2x minecraft:pink_dye',0.5)],'minecraft:cactus_flower'],
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'delighto_flight:lotus_flower'],

        [['2x minecraft:white_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:white_wisteria_leaves'],
        [['2x minecraft:blue_dye',CreateItem.of('minecraft:light_blue_dye',0.5)],'natures_spirit:blue_wisteria_leaves'],
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:pink_wisteria_leaves'],
        [['2x minecraft:magenta_dye',CreateItem.of('minecraft:purple_dye',0.5)],'natures_spirit:purple_wisteria_leaves'],
        [['2x minecraft:white_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:white_wisteria_vines'],
        [['2x minecraft:blue_dye',CreateItem.of('minecraft:light_blue_dye',0.5)],'natures_spirit:blue_wisteria_vines'],
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:pink_wisteria_vines'],
        [['2x minecraft:magenta_dye',CreateItem.of('minecraft:purple_dye',0.5)],'natures_spirit:purple_wisteria_vines'],
        [['2x minecraft:yellow_dye',CreateItem.of('minecraft:orange_dye',0.5)],'natures_spirit:palo_verde_leaves'],

        [['2x minecraft:green_dye',CreateItem.of('minecraft:green_dye',0.5)],'natures_spirit:large_lush_fern'],
        [['minecraft:green_dye'],'natures_spirit:lush_fern'],
        [['2x minecraft:green_dye',CreateItem.of('minecraft:red_dye',0.5)],'natures_spirit:ornate_succulent'],
        [['2x minecraft:lime_dye',CreateItem.of('minecraft:lime_dye',0.5)],'natures_spirit:drowsy_succulent'],
        [['2x minecraft:yellow_dye',CreateItem.of('minecraft:yellow_dye',0.5)],'natures_spirit:aureate_succulent'],
        [['minecraft:green_dye',CreateItem.of('minecraft:green_dye',0.5)],'natures_spirit:sage_succulent'],
        [['2x minecraft:cyan_dye',CreateItem.of('minecraft:light_blue_dye',0.5)],'natures_spirit:foamy_succulent'],
        [['2x minecraft:magenta_dye',CreateItem.of('minecraft:purple_dye',0.5)],'natures_spirit:imperial_succulent'],
        [['2x minecraft:lime_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:regal_succulent'],
        [['4x minecraft:purple_dye',CreateItem.of('2x minecraft:purple_dye',0.5)],'natures_spirit:lavender'],
        [['4x minecraft:pink_dye',CreateItem.of('2x minecraft:pink_dye',0.5)],'natures_spirit:bleeding_heart'],
        [['4x minecraft:blue_dye',CreateItem.of('2x minecraft:blue_dye',0.5)],'natures_spirit:blue_bulbs'],
        [['4x minecraft:red_dye',CreateItem.of('2x minecraft:red_dye',0.5)],'natures_spirit:carnation'],
        [['4x minecraft:white_dye',CreateItem.of('minecraft:light_gray_dye',0.5)],'natures_spirit:gardenia'],
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:snapdragon'],
        [['2x minecraft:purple_dye',CreateItem.of('minecraft:purple_dye',0.5)],'natures_spirit:foxglove'],
        [['2x minecraft:orange_dye',CreateItem.of('minecraft:orange_dye',0.5)],'natures_spirit:begonia'],
        [['2x minecraft:orange_dye',CreateItem.of('minecraft:yellow_dye',0.5)],'natures_spirit:marigold'],
        [['2x minecraft:blue_dye',CreateItem.of('minecraft:light_blue_dye',0.5)],'natures_spirit:bluebell'],
        [['2x minecraft:orange_dye',CreateItem.of('minecraft:yellow_dye',0.5)],'natures_spirit:tiger_lily'],
        [['2x minecraft:purple_dye',CreateItem.of('minecraft:purple_dye',0.5)],'natures_spirit:purple_wildflower'],
        [['2x minecraft:yellow_dye',CreateItem.of('minecraft:yellow_dye',0.5)],'natures_spirit:yellow_wildflower'],
        [['2x minecraft:red_dye',CreateItem.of('minecraft:cyan_dye',0.5)],'natures_spirit:red_heather'],
        [['2x minecraft:white_dye',CreateItem.of('minecraft:cyan_dye',0.5)],'natures_spirit:white_heather'],
        [['2x minecraft:purple_dye',CreateItem.of('minecraft:cyan_dye',0.5)],'natures_spirit:purple_heather'],
        [['2x minecraft:purple_dye',CreateItem.of('minecraft:black_dye',0.5)],'natures_spirit:anemone'],
        [['2x minecraft:pink_dye','2x minecraft:yellow_dye'],'natures_spirit:dwarf_blossoms'],
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:protea'],
        [['2x minecraft:red_dye',CreateItem.of('minecraft:red_dye',0.5)],'natures_spirit:hibiscus'],
        [['2x minecraft:light_blue_dye',CreateItem.of('minecraft:yellow_dye',0.5)],'natures_spirit:blue_iris'],
        [['2x minecraft:black_dye',CreateItem.of('minecraft:purple_dye',0.5)],'natures_spirit:black_iris'],
        [['3x minecraft:red_dye',CreateItem.of('minecraft:red_dye',0.5)],'natures_spirit:ruby_blossoms'],
        [['2x minecraft:white_dye',CreateItem.of('minecraft:light_gray_dye',0.5)],'natures_spirit:helvola_flower'],
        [['2x minecraft:pink_dye',CreateItem.of('minecraft:pink_dye',0.5)],'natures_spirit:lotus_flower']

    ]
    milling.forEach(element => {
        let [output,item] = element
        e.recipes.create.milling(output,item).id('milling/'+item.replace(':','/'))
    })
    //植物油
    e.recipes.create.compacting(Fluid.of('createaddition:seed_oil',500),'natures_spirit:olives').id('compacting/olive_oil')

    //粉沙
    e.recipes.create.compacting('natures_spirit:pink_sand',
        ['minecraft:sand','minecraft:pink_dye',Ingredient.of('#ae2:all_quartz_dust')]).heated()
        .id('compacting/natures_spirit/pink_sand')
    e.recipes.create.milling('natures_spirit:pink_sand','natures_spirit:pink_sandstone')
        .id('milling/natures_spirit/pink_sandstone')
    e.recipes.create.compacting('4x create:rose_quartz',
        ['natures_spirit:pink_sand','mekanism:enriched_redstone']).heated()
        .id('compacting/rose_quartz_from_pink_sand')
    e.custom({
        "type": "create_dragons_plus:ending",
        "ingredients": [
            {
                "item": "natures_spirit:pink_sand"
            }
        ],
        "results": [
            {
                "id": "ae2:ender_dust"
            }
        ]
    }).id('ending/ae2/ender_dust')

    //黑硅岩
    e.recipes.create.crushing([Item.of('natures_spirit:pink_sand'),CreateItem.of('minecraft:quartz',0.5),CreateItem.of('extendedae:quartz_blend',0.25)],
    Ingredient.of('natures_spirit:chert')).id('crushing/natures_spirit/chert')
    //黑硅岩矿石
    let ores = [
        ['minecraft:coal_ore','natures_spirit:chert_coal_ore'],
        ['minecraft:iron_ore','natures_spirit:chert_iron_ore'],
        ['minecraft:copper_ore','natures_spirit:chert_copper_ore'],
        ['minecraft:gold_ore','natures_spirit:chert_gold_ore'],
        ['minecraft:redstone_ore','natures_spirit:chert_redstone_ore'],
        ['minecraft:emerald_ore','natures_spirit:chert_emerald_ore'],
        ['minecraft:lapis_ore','natures_spirit:chert_lapis_ore'],
        ['minecraft:diamond_ore','natures_spirit:chert_diamond_ore']
    ]
    ores.forEach(element => {
        let [mc,ns] = element
        e.replaceInput({input:mc},mc,Ingredient.of([mc,ns]))
        e.stonecutting(ns,mc).id('stonecutting/'+ns.replace(':','/'))
    })

    //椰子
    e.recipes.create.emptying([Fluid.of('create:potion',1000,{"create:potion_fluid_bottle_type":"regular","minecraft:potion_contents":{potion:"minecraft:mundane"}}),'2x natures_spirit:coconut_half'],
        'natures_spirit:coconut').id('emptying/natures_spirit/coconut')
    e.recipes.create.compacting(['minecraft:sugar','farmersdelight:straw'],Item.of('natures_spirit:coconut_half'))
        .id('compacting/natures_spirit/coconut_half')

    //白垩岩
    e.replaceInput({id:'natures_spirit:white_chalk'},'natures_spirit:chalk_powder','minecraft:bone_meal')

    
    
})
