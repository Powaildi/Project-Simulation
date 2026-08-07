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
                "amount": 2,
                "id": metal
                }
            ]
            }
        ).id('melting/'+stone.replace(':','/'))
    })

})