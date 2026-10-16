
ServerEvents.recipes(e=>{
    e.replaceOutput({input:'minecraft:deepslate_coal_ore'},'minecraft:coal','kubejs:graphite')
    e.replaceInput({input:'#minecraft:coals'},'#minecraft:air','#minecraft:air')

    e.shaped('kubejs:electrode',['A','A'],{A:'kubejs:graphite'})
        .id('crafting/electrode')
    e.recipes.createdieselgenerators.compression_molding('kubejs:electrode','createdieselgenerators:lines','kubejs:graphite')
        .id('compression_molding/electrode')
    e.shaped('kubejs:clamper',[
        ' A ',
        'BCB',
        ' D '
    ],{
        A:'create:precision_mechanism',
        B:'kubejs:industrial_iron_sheet',
        C:'minecraft:slime_ball',
        D:'delighto_flight:cloud_silk'
    }).id('crafting/clamper')

    e.shaped('mbd2:sprinkler',[
        'CDC',
        'ABA',
        ' A '
    ],{
        A:'create:fluid_pipe',
        B:'create:propeller',
        C:'create:copper_casing',
        D:'create:fluid_tank'
    }).id('crafting/mbd2/sprinkler')

    e.shaped('mbd2:air_compressor',[
        'ABA',
        'CDC',
        'EFE'
    ],{
        A:'kubejs:industrial_iron_sheet',
        B:Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']),
        C:'kubejs:circuit',
        D:'vintageimprovements:vacuum_chamber',
        E:'create:fluid_pipe',
        F:'create:fluid_tank'
    }).id('crafting/mbd2/air_compressor')
    e.shaped('mbd2:ant_nest',[
        'A',
        'B',
        'C'
    ],{
        A:'create:transmitter',
        B:'minecraft:packed_mud',
        C:'create_fantasizing:taiji_chipset'
    })

    e.shaped('mbd2:electrolyser',[
        ' A ',
        'CBC',
        ' D '
    ],{
        A:'kubejs:circuit',
        B:'kubejs:industrial_iron_storage_block',
        C:'kubejs:electrode',
        D:'mekanism:electrolytic_core'
    }).id('crafting/mbd2/electrolyser')
})
