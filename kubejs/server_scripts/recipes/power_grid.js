ServerEvents.recipes(e=>{
    let ti
    //电气构件
    e.remove({id:'powergrid:sequenced_assembly/electrical_gizmo'})
    ti = 'powergrid:incomplete_electrical_gizmo'
    e.recipes.create.sequenced_assembly('powergrid:electrical_gizmo',Ingredient.of('#c:plates/zinc'),[
        e.recipes.create.deploying(ti,[ti,'powergrid:copper_coil']),
        e.recipes.create.deploying(ti,[ti,'kubejs:industrial_iron_sheet']),
        e.recipes.create.deploying(ti,[ti,'kubejs:circuit']),
        e.recipes.create.deploying(ti,[ti,Ingredient.of('#c:plates/zinc')]),
        e.recipes.vintageimprovements.curving(ti,ti).mode(2)
    ],ti).id('sequenced_assembly/electrical_gizmo')
    //蓄电池
    e.remove({id:'powergrid:sequenced_assembly/battery'})
    ti = 'powergrid:incomplete_battery'
    e.recipes.create.sequenced_assembly('powergrid:battery','powergrid:conductive_casing',[
        e.recipes.create.deploying(ti,[ti,'create:copper_sheet']),
        e.recipes.create.deploying(ti,[ti,Ingredient.of('#c:plates/zinc')]),
        e.recipes.create.deploying(ti,[ti,'mekanism:ingot_lead']),
        e.recipes.create.deploying(ti,[ti,'mekanism:ingot_lead']),
        e.recipes.create.filling(ti,[ti,Fluid.of('mekanism:sulfuric_acid',250)])
    ],ti).id('sequenced_assembly/powergrid/battery')
    //太阳能板
    e.remove({id:'powergrid:sequenced_assembly/solar_panel'})
    ti = 'powergrid:incomplete_solar_panel'
    e.recipes.create.sequenced_assembly('6x powergrid:solar_panel','ae2:quartz_glass',[
        e.recipes.vintageimprovements.laser_cutting(ti,ti),
        e.recipes.create.deploying(ti,[ti,'create:polished_rose_quartz']),
        e.recipes.create.deploying(ti,[ti,'minecraft:slime_ball']),
        e.recipes.create.deploying(ti,[ti,'ae2:printed_silicon']),
        e.recipes.create.filling(ti,[ti,Fluid.of('kubejs:cryogen',100)]),
        e.recipes.create.deploying(ti,[ti,'create:copper_sheet']),
    ],ti).loops(3).id('sequenced_assembly/powergrid/solar_panel')


    //变压器铁芯
    e.remove({id:'powergrid:sequenced_assembly/transformer_core'})
    e.recipes.vintageimprovements.turning('powergrid:transformer_core','kubejs:industrial_iron_storage_block')

    //电气机壳
    e.replaceInput({output:'powergrid:conductive_casing'},'create:andesite_casing','create:industrial_iron_block')
    

    //电阻线圈
    e.recipes.vintageimprovements.coiling('4x powergrid:resistive_coil','kubejs:industrial_iron_sheet')
        .id('coiling/resistive_coil')

    //替换材料
    e.replaceInput({output:['powergrid:generator_large_induction_rotor','powergrid:electric_motor','powergrid:electromagnet',
            'powergrid:heating_coil','powergrid:cord_junction','powergrid:hv_switch', 'powergrid:generator_housing', 'powergrid:thermometer',
            'powergrid:factory_light', 'powergrid:spark_gap', 'powergrid:light_fixture','powergrid:fuse_holder','powergrid:modular_display']},
        'create:iron_sheet','kubejs:industrial_iron_sheet')
    e.replaceInput({output:['powergrid:contactor','powergrid:hv_breaker','powergrid:alarm_bell']},
        'minecraft:iron_ingot', 'kubejs:industrial_iron_ingot')
    e.replaceInput({output:['powergrid:cord_junction']},
        'minecraft:iron_nugget','kubejs:industrial_iron_nugget')
    //动力合成退化
    e.remove({output:'powergrid:basin_heater'})
    e.shaped('powergrid:basin_heater',[
        'AAA',
        'B B',
        'BCB'
    ],{
        A:'powergrid:resistive_coil',
        B:'create:copper_sheet',
        C:'powergrid:conductive_casing'
    }).id('crafting/basin_heater')

    e.remove({output:'powergrid:generator_commutator'})
    e.shaped('powergrid:generator_commutator',[
        'ABA',
        'CDC',
        'EFE',
    ],{
        A:'powergrid:pins',
        B:'create:shaft',
        C:Ingredient.of('#minecraft:coals'),
        D:'create:copper_sheet',
        E:'create:andesite_alloy',
        F:'powergrid:conductive_casing'
    }).id('crafting/generator_commutator')

    e.remove({output:'powergrid:punch_card_reader'})
    e.shaped('powergrid:punch_card_reader',[
        'ABA',
        'CDC',
        'EFE',
    ],{
        A:Ingredient.of('#c:plates/zinc'),
        B:'create:precision_mechanism',
        C:'powergrid:pins',
        D:'powergrid:conductive_casing',
        E:'create:cogwheel',
        F:'create:shaft'
    }).id('crafting/punch_card_reader')

    e.remove({output:'powergrid:crt'})
    e.shaped('powergrid:crt',[
        ' A ',
        'BBB',
        'CDC'
    ],{
        A:'minecraft:glowstone_dust',
        B:'ae2:quartz_glass',
        C:'powergrid:copper_coil',
        D:'create:electron_tube'
    }).id('crafting/crt')

    e.remove({output:'powergrid:carbon_pile_coil'})
    e.shaped('powergrid:carbon_pile_coil',[
        'ABA',
        'ABA',
        'CDC'
    ],{
        A:'powergrid:copper_coil',
        B:'kubejs:industrial_iron_sheet',
        C:Ingredient.of('#c:plates/zinc'),
        D:'powergrid:conductive_casing'
    }).id('crafting/carbon_pile_coil')

    e.remove({output:'powergrid:integrated_circuit'})
    e.shaped('powergrid:integrated_circuit',[
        'A',
        'B',
        'C'
    ],{
        A:'ae2:printed_silicon',
        B:'create:polished_rose_quartz',
        C:'create:golden_sheet'
    }).id('crafting/powergrid/integrated_circuit')
})
