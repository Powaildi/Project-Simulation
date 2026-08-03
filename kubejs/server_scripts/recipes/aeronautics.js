ServerEvents.recipes(e=>{
    //树脂
    e.remove({id:'createpropulsion:crushing/spruce_log'}),
    e.recipes.create.compacting('minecraft:resin_clump',Ingredient.of(['minecraft:stripped_spruce_log','minecraft:stripped_pale_oak_log','natures_spirit:stripped_larch_log','natures_spirit:stripped_cedar_log']))
        .id('compacting/minecraft/resin_clump')

    //引擎组件
    e.remove({id:'simulated:sequenced_assembly/engine_assembly'})

    //引擎
    e.replaceInput({id:'simulated:red_portable_engine'},'simulated:engine_assembly','createdieselgenerators:engine_piston')
    
    //工业铁块替代方案
    e.replaceInput({input:'create:industrial_iron_block',or:[{type:'minecraft:crafting_shaped'},{type:'minecraft:crafting_shapeless'}]},
        'create:industrial_iron_block',Ingredient.of(['create:industrial_iron_block','minecraft:iron_block'])
    )

    //航空学无界
    e.shaped('2x aero_no_horizon:suspension_track',[
        ' A ',
        'BCB',
        'DDD'
    ],{
        A:'create:mechanical_piston',
        B:'#minecraft:planks',
        C:'create:cogwheel',
        D:'create:belt_connector'
    }).id('aero_no_horizon:suspension_track')
    e.shaped('2x aero_no_horizon:small_simple_wheel_part',[
        ' A ',
        'ABA',
        ' A '
    ],{
        A:Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']),
        B:'create:cogwheel'
    }).id('aero_no_horizon:small_simple_wheel_part')
    e.shaped('2x aero_no_horizon:med_simple_wheel_part',[
        'AAA',
        'ABA',
        'AAA'
    ],{
        A:Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']),
        B:'create:cogwheel'
    }).id('aero_no_horizon:med_simple_wheel_part')
})
