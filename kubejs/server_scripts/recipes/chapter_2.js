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
    //精密构件配方替换
    e.replaceInput({id:'dndesires:crafting/hydraulic_press'},'minecraft:copper_block','create:precision_mechanism')

    //种子油
    e.recipes.create.mixing(Fluid.of('createaddition:seed_oil',500),
        [Ingredient.of('#c:seeds',4)],90)
        .heated().id('mixing/seed_oil')
    //生物柴油
    e.recipes.create.mixing(Fluid.of('createdieselgenerators:biodiesel',200),
        [Fluid.of('createaddition:seed_oil',100),Fluid.of('createdieselgenerators:ethanol',100)],90)
        .id('mixing/biodiesel')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('createdieselgenerators:biodiesel',500),
        [Fluid.of('createaddition:seed_oil',200),Fluid.of('createdieselgenerators:ethanol',200)],90)
        .heated().id('pressurizing/biodiesel_0')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('createdieselgenerators:biodiesel',500),
        Fluid.of('createaddition:seed_oil',200),90).secondaryFluidInput(Fluid.of('createdieselgenerators:ethanol',200))
        .heated().id('pressurizing/biodiesel_1')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('createdieselgenerators:biodiesel',500),
        Fluid.of('createdieselgenerators:ethanol',200),90).secondaryFluidInput(Fluid.of('createaddition:seed_oil',200))
        .heated().id('pressurizing/biodiesel_2')

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
    //工业齿轮
    e.recipes.create.deploying('gnkinetics:industrial_gear',['create:shaft','create:industrial_iron_block'])
        .id('deploying/gnkinetics/industrial_gear')
    e.recipes.create.deploying('gnkinetics:large_industrial_gear',['gnkinetics:industrial_gear','create:industrial_iron_block'])
        .id('deploying/gnkinetics/large_industrial_gear')
    
    //纸浆
    e.recipes.create.mixing('create:pulp',['4x createdieselgenerators:wood_chip',Fluid.of('minecraft:water',250)])
        .id('mixing/create/pulp')

    //过重负担机壳
    e.replaceInput({output:'dndesires:overburden_casing'},'create:andesite_casing','create:industrial_iron_block')
    e.remove({or:[{id:'create:crafting/logistics/stock_link'},{id:'create:crafting/logistics/package_frogport'},{id:'createphantom:phantomport'},{id:'createphantom:mini_phantom'},{id:'create_mobile_packages:robo_bee'}]})
    //蜜蜂物流
    if(Platform.isLoaded('create_mobile_packages')){
        e.shaped('create_mobile_packages:robo_bee',[
            'ABA',
            'CDC'
        ],{
            A:'create:propeller',
            B:'create:andesite_alloy',
            C:'minecraft:honeycomb',
            D:'dndesires:overburden_casing',
        }).id('crafting/create_mobile_packages/robo_bee')
    }
    //幻翼物流
    if(Platform.isLoaded('createphantom')){
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
    }

    //树木肥料
    e.shapeless('create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',2),'minecraft:moss_block','minecraft:bone_meal'])
        .id('crafting/appliances/tree_fertilizer')
    e.shapeless('3x create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',3),'ratatouille:ripen_matter'])
        .id('crafting/appliances/tree_fertilizer_3')
    
    //虚空钢
    e.remove({id:'createutilities:mixing/void_steel_ingot'})
    e.recipes.vintageimprovements.vacuumizing('createutilities:void_steel_ingot',
        ['createbigcannons:steel_ingot','ae2:ender_dust'],90).secondaryFluidInput(Fluid.of('kubejs:void',250))
        .superheated().id('vacuumizing/createutilities/void_steel_ingot')
    //末影抽屉
    e.replaceInput({id:'functionalstorage:ender_drawer'},'minecraft:ender_chest','createutilities:graviton_tube')
    //水银和硫
    e.recipes.vintageimprovements.vacuumizing('4x mekanism:dust_sulfur',
        ['minecraft:cinnabar'],90,Fluid.of('kubejs:mercury',250))
        .heated().id('vacuumizing/cinnarbar_to_mercury')
    //银
    e.recipes.vintageimprovements.centrifugation([Fluid.of('kubejs:molten_silver',90),Fluid.of('minecraft:water',90)],
        Fluid.of('kubejs:mercury',90),150,128)
        .id('centrifugation/mercury_to_silver')
    
    //原油再生
    e.recipes.vintageimprovements.pressurizing([Fluid.of('createdieselgenerators:crude_oil',200)],
        [Fluid.of('createaddition:seed_oil',200)],125).secondaryFluidInput(Fluid.of('mekanism:hydrogen',100))
        .heated().id('pressurizing/crude_oil/seed_oil')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('createdieselgenerators:crude_oil',200)],
        [Fluid.of('kubejs:tar',100)],125).secondaryFluidInput(Fluid.of('mekanism:hydrogen',100))
        .heated().id('pressurizing/crude_oil/tar')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('createdieselgenerators:crude_oil',200)],
        [Fluid.of('minecraft:water',200),'mekanism:dust_coal'],125).secondaryFluidInput(Fluid.of('mekanism:hydrogen',100))
        .heated().id('pressurizing/crude_oil/coal')

//AE2
    //福鲁伊克斯水晶死锁
    e.remove({id:'ae2:transform/fluix_crystal'})
    e.findRecipes({id:'ae2:transform/fluix_crystals'}).forEach(recipe =>{
        recipe.json.get('result').getAsJsonObject().add('id','ae2:fluix_dust')
    })
    e.replaceOutput({id:'create:mixing/compat/ae2/fluix_crystal'},'ae2:fluix_crystal','2x ae2:fluix_dust')
    //赌怪配方，目前唯一，计划天降陨石获取
    e.recipes.vintageimprovements.pressurizing(CreateItem.of('ae2:fluix_crystal',0.05),[//0.002
        Fluid.of('createdieselgenerators:gasoline',500),'ae2:charged_certus_quartz_crystal','ae2:fluix_dust'
    ]).superheated().id('pressurizing/ae2/fluix_crystal_chance')
    //充能玫瑰茶途径
    e.recipes.create.mixing([Fluid.of('delighto_flight:charged_rose_tea',250),'ae2:certus_quartz_crystal'],
        [Fluid.of('minecraft:water',250),'ae2:charged_certus_quartz_crystal','minecraft:rose_bush','minecraft:sugar'])
        .heated().id('mixing/delighto_flight/charged_rose_tea')
    //福鲁伊克斯汽油
    e.recipes.vintageimprovements.pressurizing([Fluid.of('kubejs:fluix_gasoline',250),Fluid.of('minecraft:water',250)],
        [Fluid.of('createdieselgenerators:gasoline',250),'ae2:fluix_dust'],125).secondaryFluidInput(Fluid.of('delighto_flight:charged_rose_tea',250))
        .heated().id('pressurizing/fluix_gasoline')
    e.recipes.create.mixing([Fluid.of('kubejs:fluix_gasoline',500),CreateItem.of('ae2:fluix_pearl',0.85)],
        [Fluid.of('createdieselgenerators:gasoline',500),'ae2:fluix_pearl','ae2:fluix_dust'],60)
        .superheated().id('mixing/fluix_gasoline')
    //福鲁伊克斯水晶正常配方
    e.recipes.create.mixing('8x ae2:fluix_crystal',
        ['4x minecraft:redstone','4x minecraft:quartz','4x ae2:charged_certus_quartz_crystal',Fluid.of('kubejs:fluix_gasoline',50)],60)
        .id('mixing/ae2/fluix_crystal')
    e.findRecipes({id:'extendedae:assembler/fluix_transformation'}).forEach(recipe =>{
        //console.log(recipe.json)
        recipe.json.add('input_fluid',{"amount":50,"ingredient":{"fluid":"kubejs:fluix_gasoline"}})
    })

    //充能器
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
    //部分配方材料替换
    e.replaceInput({id:'ae2:network/cables/glass_fluix'},'ae2:fluix_crystal','ae2:fluix_dust')
    e.replaceInput({id:'ae2:materials/cardspeed'},'ae2:fluix_crystal','ae2:fluix_dust')
    //e.replaceInput({type:'minecraft:crafting_shaped',mod:'ae2'},'minecraft:iron_ingot','mekanism:hdpe_sheet')
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
    e.replaceInput({output:'beyonddimensions:net_energy_pathway'},'minecraft:ender_eye','createutilities:graviton_tube')
    e.remove({output:'beyonddimensions:schematicannon_pathway'})
    e.shapeless('beyonddimensions:schematicannon_pathway',[
        'create:brass_block',
        'beyonddimensions:space_time_stable_frame',
        'create:schematic_table'])
    e.remove({output:'beyonddimensions:dimensional_connect_block'})
    e.recipes.create.deploying('beyonddimensions:dimensional_connect_block',
        [Ingredient.of('#c:stripped_logs'),Item.of('beyonddimensions:space_time_stable_frame')])

//梦想与欲望
    e.replaceInput({id:'dndesires:mixing/chocolate'},Fluid.of('create:chocolate'),Fluid.of('minecraft:milk'))
    e.replaceInput({id:'dndesires:mixing/pumpkin'},'minecraft:pumpkin','farmersdelight:pumpkin_slice')
    
    
//其它
    //珊瑚增殖
    let corals = [
        'minecraft:tube_coral_block','minecraft:brain_coral_block','minecraft:bubble_coral_block','minecraft:fire_coral_block','minecraft:horn_coral_block',
        'minecraft:tube_coral','minecraft:brain_coral','minecraft:bubble_coral','minecraft:fire_coral','minecraft:horn_coral',
        'minecraft:tube_coral_fan','minecraft:brain_coral_fan','minecraft:bubble_coral_fan','minecraft:fire_coral_fan','minecraft:horn_coral_fan'
    ]
    corals.forEach(element=>{
        e.recipes.create.mixing(Item.of(element,5),[element,Fluid.of('createpropulsion:coral',125)])
            .id('mixing/'+element.replace(':','/'))
    })
    //重写硫酸
    e.remove({or:[{id:'vintageimprovements:pressurizing/compat/sulfur_dioxide_from_dust'},{id:'vintageimprovements:pressurizing/sulfur_trioxide_alt'},{id:'vintageimprovements:pressurizing/sulfur_trioxide'},{id:'vintageimprovements:pressurizing/sulfuric_acid'}]})
    //二氧化硫
    e.recipes.vintageimprovements.pressurizing([Fluid.of('mekanism:sulfur_dioxide',500)],
        ['mekanism:dust_sulfur'],190,0)
        .heated().id('pressurizing/sulfur_dioxide_0')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('mekanism:sulfur_dioxide',500)],
        ['mekanism:dust_sulfur',Fluid.of('mekanism:oxygen',100)],60,0)
        .heated().id('pressurizing/sulfur_dioxide_1')
    //三氧化硫
    e.recipes.vintageimprovements.pressurizing([Fluid.of('mekanism:sulfur_trioxide',250)],
        [Fluid.of('mekanism:sulfur_dioxide',250),'minecraft:iron_nugget'],190,0)
        .superheated().id('pressurizing/sulfur_trioxide_0')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('mekanism:sulfur_trioxide',250)],
        [Fluid.of('mekanism:sulfur_dioxide',250),'vintageimprovements:vanadium_nugget'],90,0)
        .superheated().id('pressurizing/sulfur_trioxide_1')
    //硫酸
    e.recipes.vintageimprovements.pressurizing([Fluid.of('mekanism:sulfuric_acid',250)],
        [Fluid.of('minecraft:water',250)],90).secondaryFluidInput(Fluid.of('mekanism:sulfur_trioxide',250))
        .superheated().id('pressurizing/sulfuric_acid_0')

//变难配方
    //高温熔炼触媒
    e.replaceInput({id:'dndesires:crafting/fan_catalyst/seething_sail'},'dndesires:burner','mekanism:pellet_antimatter')
    e.remove({output:'create_connected:fan_seething_catalyst'})
    e.recipes.create.item_application('create_connected:fan_seething_catalyst',['create_connected:empty_fan_catalyst','dndesires:seething_sail'])
        .id('item_application/create_connected/fan_seething_catalyst')
    //去除木棍产生物质
    e.remove({id:'createaddition:mixing/biomass_from_stricks'})
})
