ServerEvents.recipes(e=>{
    //可逆的荧石粉
    e.recipes.vintageimprovements.pressurizing(['minecraft:sweet_berries', 'minecraft:glowstone_dust'],
        ['minecraft:glow_berries', 'minecraft:redstone'],25)
        .superheated().id('pressurizing/berries_glowstone_a')
    e.recipes.vintageimprovements.pressurizing(['minecraft:glow_berries', 'minecraft:redstone'],
        ['minecraft:sweet_berries', 'minecraft:glowstone_dust'],25)
        .heated().id('pressurizing/berries_glowstone_b')
    
    //碳粉
    e.remove({type:'create:milling',input:['minecraft:charcoal','minecraft:coal']})
    e.recipes.create.milling(['mekanism:dust_coal',CreateItem.of('2x mekanism:dust_coal',0.67)],
        'minecraft:coal',50).id('milling/coal')
    e.recipes.create.milling(['mekanism:dust_charcoal',CreateItem.of('mekanism:dust_charcoal',0.67)],
        'minecraft:charcoal',50).id('milling/charcoal')
    e.recipes.create.milling(['minecraft:black_dye',CreateItem.of('minecraft:gray_dye',0.5)],
        'mekanism:dust_coal',50).id('milling/dust_coal')
    e.recipes.create.milling(['minecraft:gray_dye',CreateItem.of('minecraft:black_dye',0.5)],
        'mekanism:dust_charcoal',50).id('milling/dust_charcoal')
    //石墨
    e.recipes.vintageimprovements.pressurizing('kubejs:graphite',
        [Ingredient.of(['mekanism:dust_coal','mekanism:dust_charcoal'],2)],60)
        .superheated().id('pressurizing/graphite')
    //钻石
    e.recipes.vintageimprovements.pressurizing('minecraft:diamond','kubejs:graphite',125)
        .superheated().id('pressurizing/diamond')

    //圆石
    e.recipes.create.mixing('16x minecraft:cobblestone',[Fluid.of('minecraft:water',250),Fluid.of('minecraft:lava',250)],90)
        .id('mixing/cobblestone')
    //黑曜石
    e.recipes.create.mixing('minecraft:obsidian',[Fluid.of('kubejs:cryogen',100),Fluid.of('minecraft:lava',250)],60)
        .id('mixing/obsidian')
    //坚固板
    e.recipes.create.compacting('2x create:sturdy_sheet','minecraft:obsidian')
        .heated().id('compacting/create/sturdy_sheet')
})