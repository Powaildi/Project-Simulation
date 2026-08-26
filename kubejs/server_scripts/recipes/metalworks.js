ServerEvents.recipes(e=>{
    //四大金属岩石
    let stonemetals = [
        ['create:crimsite','create:iron_sheet','create:crushed_raw_iron',Fluid.of('minecraft:lava',250),'minecraft:iron_ingot'],
        ['create:veridium','create:copper_sheet','create:crushed_raw_copper',Fluid.of('minecraft:water',250),'minecraft:copper_ingot'],
        ['create:ochrum','create:golden_sheet','create:crushed_raw_gold',Fluid.of('minecraft:lava',250),'minecraft:gold_ingot'],
        ['create:asurine','createaddition:zinc_sheet','create:crushed_raw_zinc',Fluid.of('minecraft:water',250),'create:zinc_ingot']
    ]
    stonemetals.forEach(element =>{
        let [stone,plate,ore,fluid,metal] = element
        //改变粉碎产率
        e.replaceOutput({input:stone},ore,CreateItem.of(ore,1))
        //再生
        e.recipes.create.compacting('2x '+ stone,['2x minecraft:gravel',plate,fluid])
            .id('compacting/'+stone.replace(':','/'))
        //再生2
        e.custom(
            {
            "type": "createbigcannons:melting",
            "heat_requirement": "heated",
            "ingredients": [
                {
                "item": stone
                }
            ],
            "processing_time": 10,
            "results": [
                {
                "count": 2,
                "id": metal
                }
            ]
            }
        ).id('melting/'+stone.replace(':','/'))
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

    //碎矿增产
    let crushed = [
        ['rocketnautics:crushed_raw_titanium','rocketnautics:titanium_nugget'],
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
        e.custom({
            "type": "createdieselgenerators:bulk_fermenting",
            "ingredients": [
                {"item": ore},
                {"item": ore},
                {"item": ore},
            ],
            "processing_time": 100,
            "heat_requirement": "heated",
            "results": [
                {
                "id": fluid,
                "amount": 450
                },
                {
                "id": outputitem.getId(),
                "count":outputitem.getCount(),
                "chance":chance
                }
            ]
        }).id('bulk_fermenting/'+ore.replace('create:',''))
    })
    //工业铁
    e.custom({
        "type": "createdieselgenerators:bulk_fermenting",
        "ingredients": [
            {"item": 'create:andesite_alloy'},
            {"item": 'create:andesite_alloy'},
            {
            "type": "fluid_stack",
            "fluid": "kubejs:molten_iron",
            "amount": 360
            }
        ],
        "processing_time": 120,
        "heat_requirement": "heated",
        "results": [
            {
            "id": "kubejs:molten_industrial_iron",
            "amount": 360
            }
        ]
    }).id('bulk_fermenting/molten_industrial_iron')

    e.custom({
        "type": "createdieselgenerators:bulk_fermenting",
        "ingredients": [
            {"item": 'minecraft:iron_ingot'},
            {"item": 'minecraft:iron_ingot'},
            {"item": 'minecraft:iron_ingot'},
            {"item": 'minecraft:iron_ingot'},
            {"item": 'create:andesite_alloy'},
            {"item": 'create:andesite_alloy'},
        ],
        "processing_time": 180,
        "heat_requirement": "heated",
        "results": [
            {
            "id": "kubejs:molten_industrial_iron",
            "amount": 360
            }
        ]
    }).id('bulk_fermenting/molten_industrial_iron_alt')


    //钢
    e.custom({
        "type": "createdieselgenerators:bulk_fermenting",
        "ingredients": [
            {"item": 'createdeco:industrial_iron_ingot'},
            {"item": 'createdeco:industrial_iron_ingot'},
            {"item": 'createdeco:industrial_iron_ingot'},
            {"item": 'createdeco:industrial_iron_ingot'},
            {"tag": 'kubejs:fluxing_medium'},
            {"item": 'minecraft:wind_charge'},
            {"item": 'minecraft:blaze_powder'},
            {
            "type": "fluid_stack",
            "fluid": "mekanism:oxygen",
            "amount": 50
            }
        ],
        "processing_time": 200,
        "heat_requirement": "superheated",
        "results": [
            {
            "id": "createbigcannons:molten_steel",
            "amount": 180
            }
        ]
    }).id('bulk_fermenting/molten_steel')
    e.remove({id:'createbigcannons:compacting/forge_steel_block'})
    e.recipes.vintageimprovements.pressurizing(Item.of('createbigcannons:steel_ingot',5),Fluid.of('createbigcannons:molten_steel',450),25)
            .secondaryFluidInput(Fluid.of('kubejs:cryogen',50))
            .id('pressurizing/to_ingot/molten_steel')


    //熔融金属变成锭
    let solidfy = [
        ['kubejs:molten_copper','minecraft:copper_ingot','create:copper_nugget'],
        ['kubejs:molten_iron','minecraft:iron_ingot','minecraft:iron_nugget'],
        ['kubejs:molten_gold','minecraft:gold_ingot','minecraft:gold_nugget'],
        ['kubejs:molten_zinc','create:zinc_ingot','create:zinc_nugget'],
        ['kubejs:molten_tin','mekanism:ingot_tin','mekanism:nugget_tin'],
        ['kubejs:molten_silver','mekmm:ingot_silver','mekmm:nugget_silver'],
        ['kubejs:molten_industrial_iron','createdeco:industrial_iron_ingot','createdeco:industrial_iron_nugget'],
        ['kubejs:molten_brass','create:brass_ingot','create:brass_nugget']
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
    })
})