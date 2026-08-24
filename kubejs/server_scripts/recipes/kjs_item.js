
ServerEvents.recipes(e=>{
    e.replaceOutput({input:'minecraft:deepslate_coal_ore'},'minecraft:coal','kubejs:graphite')
    e.replaceInput({input:'#minecraft:coals'},'#minecraft:air','#minecraft:air')

     e.recipes.create.pressing('kubejs:steel_sheet','createbigcannons:steel_ingot')
         .id('pressing/steel_sheet')
})
