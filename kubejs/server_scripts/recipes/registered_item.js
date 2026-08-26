
ServerEvents.recipes(e=>{
    e.replaceOutput({input:'minecraft:deepslate_coal_ore'},'minecraft:coal','kubejs:graphite')
    e.replaceInput({input:'#minecraft:coals'},'#minecraft:air','#minecraft:air')

     e.recipes.create.pressing('kubejs:steel_sheet','createbigcannons:steel_ingot')
         .id('pressing/steel_sheet')
    
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
        A:'createdeco:industrial_iron_sheet',
        B:Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']),
        C:'kubejs:circuit',
        D:'vintageimprovements:vacuum_chamber',
        E:'create:fluid_pipe',
        F:'create:fluid_tank'
    }).id('crafting/mbd2/air_compressor')
})
