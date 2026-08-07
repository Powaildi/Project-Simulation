ServerEvents.recipes(e=>{
    //精密构件
    e.remove({output:'create:precision_mechanism'})
    let ti = 'create:incomplete_precision_mechanism'
    e.recipes.create.sequenced_assembly('create:precision_mechanism','create:golden_sheet',[
        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget'])
        ])
        .transitionalItem(ti).id('sequenced_assembly/precision_mechanism')

    
    //工业铁锭
    e.recipes.create.compacting('2x createdeco:industrial_iron_ingot',['2x create:iron_sheet','create:andesite_alloy']).superheated()
        .id('compacting/industrial_iron_ingot')
    //将铁锭换掉
    e.replaceInput({or:[{output:'create:industrial_iron_block'},{output:'dndecor:industrial_plating_block'}]},
        'minecraft:iron_ingot','createdeco:industrial_iron_ingot')
    //工业铁存储方块
    e.replaceInput({id:'createdeco:industrial_iron_ingot_from_industrial_iron_block'},'create:industrial_iron_block','createbigcannons:steel_block')
    e.replaceOutput({id:'createdeco:industrial_iron_block'},'create:industrial_iron_block','createbigcannons:steel_block')
    e.remove({id:'createbigcannons:steel_ingot_from_block'})
    e.remove({id:'createbigcannons:steel_block'})
    e.replaceOutput({id:'createbigcannons:compacting/forge_steel_block'},'createbigcannons:steel_block','mekanism:block_steel')
    //工业铁块替代方案
    e.replaceInput({input:'create:industrial_iron_block',or:[{type:'minecraft:crafting_shaped'},{type:'minecraft:crafting_shapeless'}]},
        'create:industrial_iron_block',Ingredient.of(['create:industrial_iron_block','minecraft:iron_block'])
    )

    //纸浆
    e.recipes.create.mixing('create:pulp',['4x createdieselgenerators:wood_chip',Fluid.of('minecraft:water',250)])
        .id('mixing/create/pulp')

    //幻翼物流
    e.shaped('createphantom:mini_phantom',[
        ' A ',
        'BCB',
        ' D '
    ],{
        A:"kubejs:circuit",
        B:"create:white_sail",
        C:"dndesires:overburden_casing",
        D:"create:andesite_alloy"
    }).id('crafting/createphantom/mini_phantom')
    e.shaped('createphantom:phantomport',[
        'A',
        'B',
        'C'
    ],{
        A:"dndesires:overburden_casing",
        B:'#create:postboxes',
        C:"create:andesite_casing"
    }).id('crafting/createphantom/phantomport')


    //树木肥料
    e.shapeless('create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',2),'minecraft:moss_block','minecraft:bone_meal'])
        .id('crafting/appliances/tree_fertilizer')
    e.shapeless('3x create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',3),'ratatouille:ripen_matter'])
        .id('crafting/appliances/tree_fertilizer_3')
    //无土植树配方
    let treedeploying = [
        ['minecraft:oak_sapling',[Item.of('minecraft:oak_log',16),Item.of('minecraft:oak_leaves',64)]],
        ['minecraft:spruce_sapling',[Item.of('minecraft:spruce_log',16),Item.of('minecraft:spruce_leaves',64)]],
        ['minecraft:birch_sapling',[Item.of('minecraft:birch_log',16),Item.of('minecraft:birch_leaves',64)]],
        ['minecraft:jungle_sapling',[Item.of('minecraft:jungle_log',16),Item.of('minecraft:jungle_leaves',64)]],
        ['minecraft:acacia_sapling',[Item.of('minecraft:acacia_log',16),Item.of('minecraft:acacia_leaves',64)]],
        ['minecraft:dark_oak_sapling',[Item.of('minecraft:dark_oak_log',16),Item.of('minecraft:dark_oak_leaves',64)]],
        ['minecraft:mangrove_propagule',[Item.of('minecraft:mangrove_log',16),Item.of('minecraft:mangrove_roots',16),Item.of('minecraft:mangrove_leaves',64)]],
        ['minecraft:cherry_sapling',[Item.of('minecraft:cherry_log',16),Item.of('minecraft:cherry_leaves',64)]],
        ['minecraft:pale_oak_sapling',[Item.of('minecraft:pale_oak_log',16),Item.of('minecraft:pale_oak_leaves',64),CreateItem.of('minecraft:creaking_heart',0.05)]],
        ['minecraft:azalea',[Item.of('minecraft:oak_log',16),Item.of('minecraft:azalea_leaves',64)]],
        ['minecraft:flowering_azalea',[Item.of('minecraft:oak_log',16),Item.of('minecraft:flowering_azalea_leaves',64)]],
        ['minecraft:brown_mushroom',[Item.of('minecraft:mushroom_stem',16),Item.of('minecraft:brown_mushroom_block',64)]],
        ['minecraft:red_mushroom',[Item.of('minecraft:mushroom_stem',16),Item.of('minecraft:red_mushroom_block',64)]],
        ['minecraft:warped_fungus',[Item.of('minecraft:warped_stem',16),Item.of('minecraft:warped_wart_block',64)]],
        ['minecraft:crimson_fungus',[Item.of('minecraft:crimson_stem',16),Item.of('minecraft:nether_wart_block',64)]],
        //自然之灵
        ['natures_spirit:redwood_sapling',[Item.of('natures_spirit:redwood_log',16),Item.of('natures_spirit:redwood_leaves',64)]],
        ['natures_spirit:sugi_sapling',[Item.of('natures_spirit:sugi_log',16),Item.of('natures_spirit:sugi_leaves',64)]],
        ['natures_spirit:purple_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:purple_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:white_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:white_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:blue_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:blue_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:pink_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:pink_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:fir_sapling',[Item.of('natures_spirit:fir_log',16),Item.of('natures_spirit:fir_leaves',64)]],
        ['natures_spirit:willow_sapling',[Item.of('natures_spirit:willow_log',16),Item.of('natures_spirit:willow_leaves',64)]],
        ['natures_spirit:aspen_sapling',[Item.of('natures_spirit:aspen_log',16),Item.of('natures_spirit:aspen_leaves',32),Item.of('natures_spirit:yellow_aspen_leaves',32)]],
        ['natures_spirit:red_maple_sapling',[Item.of('natures_spirit:maple_log',16),Item.of('natures_spirit:red_maple_leaves',64)]],
        ['natures_spirit:orange_maple_sapling',[Item.of('natures_spirit:maple_log',16),Item.of('natures_spirit:orange_maple_leaves',64)]],
        ['natures_spirit:yellow_maple_sapling',[Item.of('natures_spirit:maple_log',16),Item.of('natures_spirit:yellow_maple_leaves',64)]],
        ['natures_spirit:cypress_sapling',[Item.of('natures_spirit:cypress_log',16),Item.of('natures_spirit:cypress_leaves',64)]],
        ['natures_spirit:olive_sapling',[Item.of('natures_spirit:olive_log',16),Item.of('natures_spirit:olive_leaves',64),Item.of('natures_spirit:olives',8)]],
        ['natures_spirit:joshua_sapling',[Item.of('natures_spirit:joshua_log',16),Item.of('natures_spirit:joshua_leaves',64)]],
        ['natures_spirit:ghaf_sapling',[Item.of('natures_spirit:ghaf_log',16),Item.of('natures_spirit:ghaf_leaves',64)]],
        ['natures_spirit:palo_verde_sapling',[Item.of('natures_spirit:palo_verde_log',16),Item.of('natures_spirit:palo_verde_leaves',64)]],
        ['natures_spirit:coconut_sprout',[Item.of('natures_spirit:coconut_log',16),Item.of('natures_spirit:coconut_leaves',64),Item.of('natures_spirit:coconut',8)]],
        ['natures_spirit:cedar_sapling',[Item.of('natures_spirit:cedar_log',16),Item.of('natures_spirit:cedar_leaves',64)]],
        ['natures_spirit:larch_sapling',[Item.of('natures_spirit:larch_log',16),Item.of('natures_spirit:larch_leaves',64)]],
        ['natures_spirit:mahogany_sapling',[Item.of('natures_spirit:mahogany_log',16),Item.of('natures_spirit:mahogany_leaves',64)]],
        ['natures_spirit:saxaul_sapling',[Item.of('natures_spirit:saxaul_log',16),Item.of('natures_spirit:saxaul_leaves',64)]],
        ['natures_spirit:alluaudia',[Item.of('natures_spirit:alluaudia',16)]]
    ]

    treedeploying.forEach(element=>{
        let [item,output] = element
        e.recipes.create.deploying(output,['create:tree_fertilizer',item]).keepHeldItem()
            .id('deploying/planting/'+item.replace(':','/'))
    })
//AE2
    //福鲁伊克斯水晶死锁
    e.remove({id:'ae2:transform/fluix_crystal'})
    e.remove({id:'ae2:transform/fluix_crystals'})
    e.replaceOutput({id:'create:mixing/compat/ae2/fluix_crystal'},'ae2:fluix_crystal','2x ae2:fluix_dust')
    //赌怪配方，目前唯一，计划天降陨石获取
    e.recipes.vintageimprovements.pressurizing(CreateItem.of('ae2:fluix_crystal',0.002),[
        Fluid.of('createdieselgenerators:gasoline',500),'ae2:charged_certus_quartz_crystal','ae2:fluix_dust'
    ]).superheated()

    e.remove({output: 'ae2:charger'})
    e.shaped('ae2:charger', [
        'RCR',
        'CF ',
        'RCR'
    ], {
        R: 'mekanism:hdpe_sheet',
        C: 'createutilities:polished_amethyst',
        F: 'ae2:fluix_crystal'
    })
    //线缆改动
    e.replaceInput({id:'ae2:network/cables/glass_fluix'},'ae2:fluix_crystal','ae2:fluix_dust')

    //部分配方材料替换

//ExtendedAE
    //恩特罗注入锭搅拌配方
    e.recipes.create.mixing('4x extendedae:entro_ingot',[
        '4x extendedae:entro_dust','4x minecraft:gold_ingot','4x minecraft:lapis_lazuli',Fluid.of('minecraft:water',500)
    ])

//超越维度
    e.remove({output:'beyonddimensions:net_interface'})
    e.shaped('beyonddimensions:net_interface',[
        ' A ',
        'BCB'
    ],{
        A:'createutilities:graviton_tube',
        B:'beyonddimensions:space_time_stable_frame',
        C:'extendedae:ex_interface'
    }
    )
    e.replaceInput({output:'beyonddimensions:net_creater'},'minecraft:netherite_ingot','createutilities:void_steel_ingot')
    e.replaceInput({output:'beyonddimensions:net_pathway'},'minecraft:ender_eye','createutilities:graviton_tube')
    e.replaceInput({output:'beyonddimensions:net_ae_storage_cell'},'beyonddimensions:space_time_stable_frame','createutilities:graviton_tube')
    e.remove({output:'beyonddimensions:schematicannon_pathway'})
    e.shapeless('beyonddimensions:schematicannon_pathway',[
        'create:brass_block',
        'beyonddimensions:space_time_stable_frame',
        'create:schematic_table'])
    e.remove({output:'beyonddimensions:dimensional_connect_block'})
    e.recipes.create.deploying('beyonddimensions:dimensional_connect_block',
        [Ingredient.of('#c:stripped_logs'),Item.of('beyonddimensions:space_time_stable_frame')])

        
    //珊瑚增殖
    let corals = [
        'minecraft:tube_coral_block','minecraft:brain_coral_block','minecraft:bubble_coral_block','minecraft:fire_coral_block','minecraft:horn_coral_block',
        'minecraft:tube_coral','minecraft:brain_coral','minecraft:bubble_coral','minecraft:fire_coral','minecraft:horn_coral',
        'minecraft:tube_coral_fan','minecraft:brain_coral_fan','minecraft:bubble_coral_fan','minecraft:fire_coral_fan','minecraft:horn_coral_fan'
    ]
    corals.forEach(element=>{
        e.recipes.create.mixing(Item.of(element,5),[element,Fluid.of('createpropulsion:coral',100)])
            .id('mixing/'+element.replace(':','/'))
    })

    //模组矿物
    let coral_to_ore = [
        ['minecraft:horn_coral_block', 'mekanism:block_raw_uranium', 'vintageimprovements:uranium_sheet'],
        ['minecraft:brain_coral_block', 'mekanism:block_raw_tin', 'vintageimprovements:tin_sheet'],
        ['minecraft:tube_coral_block', 'mekanism:block_raw_osmium', 'vintageimprovements:osmium_sheet'],
        ['minecraft:fire_coral_block', 'mekanism:block_raw_lead', 'vintageimprovements:lead_sheet'],
        ['minecraft:bubble_coral_block', 'rocketnautics:raw_titanium_block', 'rocketnautics:titanium_sheet']
        //['minecraft:bubble_coral_block', 'northstar:raw_titanium_ore', 'northstar:titanium_sheet']
    ]
    coral_to_ore.forEach(element=>{
        let [coral,ore,plate] = element
        e.custom({
            "type": "dndesires:hydraulic_compacting",
            "heat_requirement": "superheated",
            "ingredients": [
                {"item": coral},
                {"item": plate},
                {
                "type": "neoforge:single",
                "amount": 500,
                "fluid": "createpropulsion:oxidizer"
                }
            ],
            "results": [
                {
                "count": 1,
                "id": ore
                }
            ]
        }).id('hydraulic_compacting/'+ore.replace(':','/'))
    })

//变难配方
    //高温熔炼触媒
    e.replaceInput({id:'dndesires:crafting/fan_catalyst/seething_sail'},'dndesires:burner','mekanism:pellet_antimatter')
    e.remove({output:'create_connected:fan_seething_catalyst'})
    e.recipes.create.item_application('create_connected:fan_seething_catalyst',['create_connected:empty_fan_catalyst','dndesires:seething_sail'])
        .id('item_application/create_connected/fan_seething_catalyst')
    //去除木棍产生物质
    e.remove({id:'createaddition:mixing/biomass_from_stricks'})
})