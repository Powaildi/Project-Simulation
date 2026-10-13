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
    e.replaceInput({id:'createadditionallogistics:crafting/kinetics/flexible_shaft'},'create:brass_casing','create:precision_mechanism')

    //纸浆
    e.recipes.create.mixing('create:pulp',['4x createdieselgenerators:wood_chip',Fluid.of('minecraft:water',250)],90)
        .id('mixing/create/pulp')

//工业铁系列
    //工业铁配方
    //工业铁弹簧
    e.recipes.vintageimprovements.coiling('2x simulated:spring','kubejs:industrial_iron_ingot')
        .id('coiling/industrial_iron_ingot')
    //锁链
    e.recipes.createdieselgenerators.compression_molding('3x minecraft:chain','createdieselgenerators:chain',
        Array(9).fill('kubejs:industrial_iron_nugget'))
        .id('compression_molding/industrial_iron_chain')
    //磁石，军械库
    e.replaceInput({or:[{id:'minecraft:lodestone'},{id:'functionalstorage:armory_cabinet'}]},
        'minecraft:netherite_ingot',Ingredient.of(['minecraft:netherite_ingot','kubejs:industrial_iron_ingot']))
    
    //工业铁块替代方案
    e.replaceInput({input:'create:industrial_iron_block',or:[{type:'minecraft:crafting_shaped'},{type:'minecraft:crafting_shapeless'}]},
        'create:industrial_iron_block',Ingredient.of(['create:industrial_iron_block','minecraft:iron_block'])
    )
    //工业齿轮
    e.replaceInput({input:'dndecor:industrial_plating_block',type:'minecraft:crafting_shapeless'},'dndecor:industrial_plating_block','create:industrial_iron_block')
    e.recipes.create.deploying('dndecor:industrial_cogwheel',['create:shaft','create:industrial_iron_block'])
        .id('deploying/gnkinetics/industrial_gear')
    e.recipes.create.deploying('dndecor:large_industrial_cogwheel',['dndecor:industrial_cogwheel','create:industrial_iron_block'])
        .id('deploying/gnkinetics/large_industrial_gear')
    //改变大发酵罐配方
    e.replaceInput({id:'createdieselgenerators:crafting/bulk_fermenter'},'create:andesite_alloy','kubejs:industrial_iron_sheet')
    //过重负担机壳
    e.replaceInput({output:'dndesires:overburden_casing'},'create:andesite_casing','create:industrial_iron_block')
    e.recipes.create.deploying('3x dndesires:overburden_casing',['create:industrial_iron_block','kubejs:industrial_iron_sheet'])
        .id('deploying/dndesires/overburden_casing')

    e.remove({or:[{id:'create:crafting/logistics/stock_link'},{id:'create:crafting/logistics/package_frogport'},{id:'createphantom:phantomport'},{id:'createphantom:mini_phantom'},{id:'create_mobile_packages:robo_bee'}]})
    e.replaceInput({id:'fluidlogistics:copper_frogport'},'create:item_vault','dndesires:overburden_casing')
    
    //虚空钢
    e.remove({id:'createutilities:mixing/void_steel_ingot'})
    e.recipes.vintageimprovements.vacuumizing('createutilities:void_steel_ingot',
        ['mekanism:ingot_steel','ae2:ender_dust'],90).secondaryFluidInput(Fluid.of('kubejs:void',250))
        .superheated().id('vacuumizing/createutilities/void_steel_ingot')
    //末影抽屉
    e.replaceInput({id:'functionalstorage:ender_drawer'},'minecraft:ender_chest','createutilities:graviton_tube')

    
//AE2

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
        //变简单
    e.replaceInput({id:'ae2:network/cables/glass_fluix'},'ae2:fluix_crystal','ae2:fluix_dust')
    //e.replaceInput({id:'ae2:materials/cardspeed'},'ae2:fluix_crystal','ae2:fluix_dust')
        //变难
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
        e.recipes.create.mixing(Item.of(element,5),[element,Fluid.of('createpropulsion:coral',125)],90)
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
        .id('pressurizing/sulfuric_acid_0')

    //银
    e.recipes.vintageimprovements.centrifugation([Fluid.of('kubejs:molten_silver',90),Fluid.of('minecraft:water',90)],
        Fluid.of('kubejs:mercury',90),150,128)
        .id('centrifugation/mercury_to_silver')
        
//变难配方
    //高温熔炼触媒
    // e.replaceInput({id:'dndesires:crafting/fan_catalyst/seething_sail'},'dndesires:burner','mekanism:pellet_antimatter')
    // e.remove({output:'create_connected:fan_seething_catalyst'})
    // e.recipes.create.item_application('create_connected:fan_seething_catalyst',['create_connected:empty_fan_catalyst','dndesires:seething_sail'])
    //     .id('item_application/create_connected/fan_seething_catalyst')
    
})
