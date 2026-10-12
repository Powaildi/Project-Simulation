ServerEvents.recipes(e=>{
    //四大金属岩石
    let stonemetals = [
        ['create:crimsite','create:iron_sheet','create:crushed_raw_iron',Fluid.of('minecraft:lava',250),'minecraft:iron_ingot'],
        ['create:veridium','create:copper_sheet','create:crushed_raw_copper',Fluid.of('minecraft:water',250),'minecraft:copper_ingot'],
        ['create:ochrum','create:golden_sheet','create:crushed_raw_gold',Fluid.of('minecraft:lava',250),'minecraft:gold_ingot'],
        ['create:asurine','createdeco:zinc_sheet','create:crushed_raw_zinc',Fluid.of('minecraft:water',250),'create:zinc_ingot'],
        //论外
        ['dndesires:breccia','create:cinder_flour','minecraft:air',Fluid.of('minecraft:lava',250),'mekanism:dust_sulfur']
    ]
    stonemetals.forEach(element =>{
        let [stone,plate,ore,fluid,metal] = element
        //改变粉碎产率
        e.replaceOutput({input:stone},ore,CreateItem.of(ore,1))
        //再生
        e.recipes.create.compacting('2x '+ stone,['2x minecraft:gravel',plate,fluid])
            .id('compacting/'+stone.replace(':','/'))
        //再生2
        e.recipes.createdieselgenerators.basin_fermenting(Item.of(metal,2),stone,8)
            .heated().id('basin_fermenting/'+stone.replace(':','/'))
        //液压机产石
        e.forEachRecipe({type:'dndesires:hydraulic_compacting',output:stone},recipe=>{
            recipe.json.get('results').get(0).getAsJsonObject().add('count',32)
        })
    })
    
    //模组矿物
    let coral_to_ore = [
        ['minecraft:horn_coral_block', 'mekanism:block_raw_uranium', 'vintageimprovements:uranium_sheet'],
        ['minecraft:brain_coral_block', 'mekanism:block_raw_tin', 'vintageimprovements:tin_sheet'],
        ['minecraft:tube_coral_block', 'mekanism:block_raw_osmium', 'vintageimprovements:osmium_sheet'],
        ['minecraft:fire_coral_block', 'mekanism:block_raw_lead', 'vintageimprovements:lead_sheet'],
        ['minecraft:bubble_coral_block', 'createpropulsion:raw_platinum_block', 'createpropulsion:platinum_sheet']
        //['minecraft:bubble_coral_block', 'rocketnautics:raw_titanium_block', 'rocketnautics:titanium_sheet']
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
                "amount": 50,
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

    //碎矿增产
    let crushed = [
        //['rocketnautics:crushed_raw_titanium','rocketnautics:titanium_nugget'],
        ['create:crushed_raw_iron','minecraft:iron_nugget'],
        ['create:crushed_raw_gold','minecraft:gold_nugget'],
        ['create:crushed_raw_copper','create:copper_nugget'],
        ['create:crushed_raw_zinc','create:zinc_nugget'],
        ['create:crushed_raw_osmium','mekanism:nugget_osmium'],
        ['create:crushed_raw_platinum','createpropulsion:platinum_nugget'],
        ['create:crushed_raw_silver','mekmm:nugget_silver'],
        ['create:crushed_raw_tin','mekanism:nugget_tin'],
        ['create:crushed_raw_lead','mekanism:nugget_lead'],
        ['create:crushed_raw_uranium','mekanism:nugget_uranium']
                   
    ]
    crushed.forEach(element =>{
        let [crushed,nugget] = element
        e.recipes.vintageimprovements.vibrating('15x '+nugget,crushed,67)
            .id('vibrating/'+crushed.replace(':','/'))
    })



    //批量发酵
    let meltmetals = [
        ['create:crushed_raw_copper', 'kubejs:molten_copper', 'vintageimprovements:vanadium_nugget',1],
        ['create:crushed_raw_iron', 'kubejs:molten_iron', '2x create:andesite_alloy',1],
        ['create:crushed_raw_gold', 'kubejs:molten_gold', '2x mekanism:nugget_osmium',0.75], 
        ['create:crushed_raw_zinc', 'kubejs:molten_zinc', '2x minecraft:lapis_lazuli',1], 
        ['create:crushed_raw_tin', 'kubejs:molten_tin', 'minecraft:glowstone_dust',1], 
        ['create:crushed_raw_silver', 'kubejs:molten_silver', 'minecraft:prismarine_crystals',1]
    ]
    meltmetals.forEach(element=>{
        let [ore,fluid,extraoutput,chance] = element
        let outputitem = Item.of(extraoutput)

        e.recipes.createdieselgenerators.bulk_fermenting([Fluid.of(fluid,450),CreateItem.of(extraoutput,chance)],
            Ingredient.of(ore,3)
            ,100).heated()
            .id('bulk_fermenting/'+ore.replace('create:',''))
    })


    //工业铁
    //工业铁锭系列基础配方
    e.recipes.create.pressing('kubejs:industrial_iron_sheet', 'kubejs:industrial_iron_ingot')
        .id('pressing/industrial_iron_sheet')
    //1出9，9合1
    e.shapeless('9x kubejs:industrial_iron_nugget', 'kubejs:industrial_iron_ingot')
        .id('crafting/industrial_iron/ingot_to_nugget')
    e.shapeless('kubejs:industrial_iron_ingot', '9x kubejs:industrial_iron_nugget')
        .id('crafting/industrial_iron/nugget_to_ingot')
    //工业铁存储方块
    e.shapeless('9x kubejs:industrial_iron_ingot', 'kubejs:industrial_iron_storage_block')
        .id('crafting/industrial_iron/block_to_ingot')
    e.shapeless('kubejs:industrial_iron_storage_block', '9x kubejs:industrial_iron_ingot')
        .id('crafting/industrial_iron/ingot_to_block')

    //工业铁块
    //将铁锭换掉
    e.replaceInput({or:[{output:'create:industrial_iron_block'},{output:'dndecor:industrial_plating_block'}]},
        'minecraft:iron_ingot','kubejs:industrial_iron_ingot')
    //1出18
    e.recipes.create.pressing('18x create:industrial_iron_block', 'kubejs:industrial_iron_storage_block')
        .id('pressing/industrial_iron_storage_block')

    //安山合金
    e.recipes.create.item_application('create:andesite_alloy',['minecraft:andesite',Ingredient.of(['minecraft:iron_nugget','create:zinc_nugget'],1)])
        .id('item_application/andesite_alloy')
    e.recipes.create.item_application('create:andesite_alloy_block',['minecraft:andesite',Ingredient.of(['minecraft:iron_ingot','create:zinc_ingot'],1)])
        .id('item_application/andesite_alloy_block_manual_only')
    
    e.shaped('createdieselgenerators:mold[createdieselgenerators:mold_type="kubejs:andesite"]',
        [
            ' A ',
            'ABA',
            ' A '
        ],{
            A:'kubejs:industrial_iron_sheet',
            B:'minecraft:andesite'
        }
    ).id('crafting/mold/andesite')
    e.recipes.createdieselgenerators.casting('4x create:andesite_alloy','kubejs:andesite',
            Fluid.of('kubejs:molten_iron',120))
            .id('casting/andesite_alloy_1')
    e.recipes.createdieselgenerators.casting('9x create:andesite_alloy','kubejs:andesite',
            Fluid.of('kubejs:molten_industrial_iron',120))
            .id('casting/andesite_alloy_2')
    //----------------初始生产方法----------------
    e.recipes.create.compacting('2x kubejs:industrial_iron_ingot',['2x create:iron_sheet','create:andesite_alloy']).superheated()
        .id('compacting/industrial_iron_ingot')
    //批量发酵
    e.recipes.createdieselgenerators.bulk_fermenting(Fluid.of('kubejs:molten_industrial_iron',360),
        ['2x create:andesite_alloy',Fluid.sizedIngredientOf('kubejs:molten_iron',360)]
        ,120).superheated().id('bulk_fermenting/molten_industrial_iron')

    e.recipes.createdieselgenerators.bulk_fermenting(Fluid.of('kubejs:molten_industrial_iron',360),
        ['2x create:andesite_alloy','4x minecraft:iron_ingot']
        ,120).superheated().id('bulk_fermenting/molten_industrial_iron_alt')



    //钢
    e.recipes.createdieselgenerators.bulk_fermenting(Fluid.of('kubejs:molten_steel',180),
        ['4x kubejs:industrial_iron_ingot',Ingredient.of('#kubejs:fluxing_medium'),'minecraft:wind_charge','minecraft:blaze_powder',]
        ,200).superheated().id('bulk_fermenting/molten_steel')


    //熔融金属变成锭，锭变成熔融金属
    let solidfy = [
        ['kubejs:molten_copper','minecraft:copper_ingot','create:copper_nugget'],
        ['kubejs:molten_iron','minecraft:iron_ingot','minecraft:iron_nugget'],
        ['kubejs:molten_gold','minecraft:gold_ingot','minecraft:gold_nugget'],
        ['kubejs:molten_zinc','create:zinc_ingot','create:zinc_nugget'],
        ['kubejs:molten_tin','mekanism:ingot_tin','mekanism:nugget_tin'],
        ['kubejs:molten_silver','mekmm:ingot_silver','mekmm:nugget_silver'],
        ['kubejs:molten_industrial_iron','kubejs:industrial_iron_ingot','kubejs:industrial_iron_nugget'],
        ['kubejs:molten_brass','create:brass_ingot','create:brass_nugget'],
        ['kubejs:molten_steel','mekanism:ingot_steel','mekanism:nugget_steel']
    ]
    solidfy.forEach(element=>{
        let [fluid,ingot,nugget] = element
        e.recipes.create.compacting(ingot,Fluid.of(fluid,90))
            .id('compacting/to_ingot/'+fluid.split(':').pop())
        e.recipes.create.compacting(nugget,Fluid.of(fluid,10))
            .id('compacting/to_nugget/'+fluid.split(':').pop())
        e.recipes.vintageimprovements.pressurizing(Item.of(ingot,5),Fluid.of(fluid,450),25)
            .secondaryFluidInput(Fluid.of('kubejs:cryogen',50))
            .id('pressurizing/to_ingot/'+fluid.split(':').pop())
        //熔融
        e.recipes.createdieselgenerators.basin_fermenting([Fluid.of(fluid,90)],
            [ingot],25).heated()
            .id('basin_fermenting/'+ingot.split(':').pop())
        e.recipes.createdieselgenerators.basin_fermenting([Fluid.of(fluid,10)],
            [nugget],3).heated()
            .id('basin_fermenting/'+nugget.split(':').pop())
    })
})
