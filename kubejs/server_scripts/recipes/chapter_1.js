ServerEvents.recipes(e=>{
    let ti
    
    //安山合金
    e.recipes.create.item_application('create:andesite_alloy',['minecraft:andesite',Ingredient.of(['minecraft:iron_nugget','create:zinc_nugget'],1)])
        .id('item_application/andesite_alloy')
    e.recipes.create.item_application('create:andesite_alloy_block',['minecraft:andesite',Ingredient.of(['minecraft:iron_ingot','create:zinc_ingot'],1)])
        .id('item_application/andesite_alloy_block_manual_only')
        
    //动力合成器
    e.replaceInput({id:'create:crafting/kinetics/mechanical_crafter'},'create:electron_tube','create:cogwheel')

    //机械手
    e.replaceInput({id:'create:crafting/kinetics/deployer'},'create:electron_tube','create:piston_extension_pole')

    //电路板
    ti = 'create:brass_sheet'
    e.recipes.create.sequenced_assembly('kubejs:circuit','create:brass_sheet',[
        e.recipes.create.deploying(ti,[ti,'electroenergetics:copper_wire']),
        e.recipes.create.deploying(ti,[ti,'create:electron_tube']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget'])
    ])
    .transitionalItem(ti).loops(3).id('sequenced_assembly/circuit')

    //电路板配方替换
    e.replaceInput({input:'create:electron_tube',not:[{type:'create:sequenced_assembly'},{id:'create:crafting/kinetics/nixie_tube'}]},
        'create:electron_tube','kubejs:circuit')
    e.replaceInput({id:'functionalstorage:storage_controller'},'minecraft:comparator','kubejs:circuit')
    e.replaceInput({id:'functionalstorage:framed_storage_controller'},'minecraft:comparator','kubejs:circuit')

    //液化木煤气
    e.recipes.vintageimprovements.pressurizing('minecraft:charcoal',Ingredient.of('#minecraft:logs'),125,Fluid.of('kubejs:wood_gas',250))
        .heated()
        .id('pressurizing/wood_gas')
    e.recipes.vintageimprovements.pressurizing(['minecraft:charcoal',Fluid.of('kubejs:tar',100)],Ingredient.of('#minecraft:logs'),60,Fluid.of('kubejs:wood_gas',250))
        .superheated()
        .id('pressurizing/wood_gas_superheated')
    //沉重核心
    e.recipes.create.mechanical_crafting('minecraft:heavy_core',[
        ' ABA ',
        'ACCCA',
        'BCDCB',
        'ACCCA',
        ' ABA '
    ],{
        A:'minecraft:wind_charge',
        B:'minecraft:breeze_rod',
        C:'createbigcannons:steel_block',
        D:'minecraft:anvil'
    }).id('mechanical_crafting/heavy_core')

    //风弹
    e.recipes.create.mixing([
        '2x minecraft:wind_charge',
        CreateItem.of('minecraft:breeze_rod',0.95)
    ],[
        '2x delighto_flight:cloud',
        'minecraft:breeze_rod'
    ],90).id('mixing/wind_charge')
    //烈焰粉
    e.recipes.create.mixing('5x minecraft:blaze_powder',['minecraft:blaze_powder','minecraft:wind_charge','4x create:cinder_flour'],125)
        .id('mixing/blaze_powder')
    e.recipes.create.compacting('10x minecraft:blaze_powder',['mynethersdelight:bullet_pepper','minecraft:wind_charge','4x create:cinder_flour'])
        .heated().id('compacting/blaze_powder')

    //余烬面粉
    e.recipes.create.mixing('16x create:cinder_flour',[Fluid.of('create_dragons_plus:red_dye',500),'4x kaleidoscope_cookery:flour'],60)
        .heated().id('mixing/create/cinder_flour')

    //运输器、传输器
    e.shaped('fluidlogistics:fluid_transporter',[
        'ABC'
    ],{
        A:'kubejs:circuit',
        B:'create:fluid_pipe',
        C:'minecraft:wind_charge'
    }).id('fluidlogistics:fluid_transporter')
    e.replaceInput({id:'create_fantasizing:transporter'},'create:brass_ingot','create:chute')

    //云系列处理
    e.recipes.vintageimprovements.vacuumizing('4x delighto_flight:cloud',Fluid.of('create_fantasizing:powder_snow',500),60)
        .id('vacuumizing/delighto_flight/cloud')
    e.recipes.vintageimprovements.vacuumizing([Fluid.of('create_fantasizing:powder_snow',250)],'delighto_flight:cloud',60)
        .id('vacuumizing/create_fantasizing/powder_snow')
    e.recipes.create.mixing(Fluid.of('create_fantasizing:powder_snow',1000),'minecraft:snow_block',125)
        .id('create_fantasizing:mixing/powder_snow')
     

    //羊毛，线和云绸
    e.remove({id:'create:milling/wool'})
    e.recipes.create.milling(['5x minecraft:string',CreateItem.of('minecraft:string',0.5)],Ingredient.of('#minecraft:wool'),80)
        .id('milling/wool_manual_only')

    e.remove({id:'create:crushing/wool'})
    e.recipes.create.crushing(['7x minecraft:string',CreateItem.of('minecraft:string',0.5)],Ingredient.of('#minecraft:wool'),35)
        .id('crushing/wool')

    e.recipes.create.deploying('4x delighto_flight:cloud_silk',['delighto_flight:cloud','minecraft:white_wool'])
        .id('deploying/cloud_silk')

    //云绸用于海带配方
    e.replaceInput({input:'minecraft:dried_kelp',or:[{type:'minecraft:crafting_shapeless'},{type:'minecraft:crafting_shaped'},{type:'create:mechanical_crafting'}],
        not:{or:[{id:'minecraft:dried_kelp_block'},{id:'farmersdelight:kelp_roll'}]}},
        'minecraft:dried_kelp',Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']))
    e.replaceInput({input:'minecraft:dried_kelp_block',or:[{type:'minecraft:crafting_shapeless'},{type:'minecraft:crafting_shaped'},{type:'create:mechanical_crafting'}],
        not:{or:[{id:'minecraft:dried_kelp'}]}},
        'minecraft:dried_kelp_block',Ingredient.of(['minecraft:dried_kelp_block','delighto_flight:cloud_silk_block']))
    //云绸用于皮革配方
    e.replaceInput({input:'minecraft:leather',or:[{type:'minecraft:crafting_shapeless'},{type:'minecraft:crafting_shaped'},{output:'minecraft:phantom_membrane'}]},
        'minecraft:leather',Ingredient.of(['minecraft:leather','delighto_flight:cloud_silk']))
    //精准采集
    e.recipes.create.deploying('minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:silk_touch":1}}]',[
        'minecraft:book','delighto_flight:cloud_silk'
    ]).id('deploying/silk_touch')

    //冷冻液

    

    //糖
    e.recipes.create.compacting('minecraft:sugar','minecraft:beetroot').heated()
        .id('compacting/sugar_from_beetroot')
    //红石构件
    ti = 'vintageimprovements:incomplete_redstone_module'
    e.recipes.create.sequenced_assembly('vintageimprovements:redstone_module','create:brass_sheet',[
        e.recipes.create.deploying(ti,[ti,'minecraft:redstone']),
        e.recipes.vintageimprovements.vibrating(ti,ti),
        e.recipes.create.pressing(ti,ti),
        e.recipes.create.deploying(ti,[ti,'create:transmitter']),
        e.recipes.create.deploying(ti,[ti,'create:electron_tube']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget'])
    ])
    .transitionalItem(ti).id('vintageimprovements:sequenced_assembly/redstone_module')
    //.id('sequenced_assembly/vintageimprovements/redstone_module')
    
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
})
