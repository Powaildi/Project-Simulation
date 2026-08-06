/**
 * 对数组进行多次 Fisher-Yates 洗牌（直接修改原数组）
 * 洗牌次数越多，元素的原始位置被打散得越彻底。
 *
 * @param {any[]} arr - 需要打乱的原数组（会被直接修改）
 * @param {number} times - 重复洗牌的次数
 * @returns {any[]} 返回原数组本身，方便进行链式调用
 */
function shuffle(arr,times) {
    
  const len = arr.length;
  for (let t = 0; t < times; t++) {
    for (let i = len - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 直接交换
    }
  }
  return arr; // 返回原数组，方便链式调用
}

ServerEvents.recipes(e=>{
    let ti
//第一章
    
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
        ['create:crimsite','create:iron_sheet','create:crushed_raw_iron',Fluid.of('minecraft:lava',250)],
        ['create:veridium','create:copper_sheet','create:crushed_raw_copper',Fluid.of('minecraft:water',250)],
        ['create:ochrum','create:golden_sheet','create:crushed_raw_gold',Fluid.of('minecraft:lava',250)],
        ['create:asurine','createaddition:zinc_sheet','create:crushed_raw_zinc',Fluid.of('minecraft:water',250)]
    ]
    stonemetals.forEach(element =>{
        let [stone,plate,ore,fluid] = element
        //改变粉碎产率
        e.replaceOutput({input:stone},ore,CreateItem.of(ore,1))
        //再生
        e.recipes.create.compacting('2x '+ stone,['2x minecraft:gravel',plate,fluid])
            .id('compacting/'+stone.replace(':','/'))
    })
    

//第二章

    //精密构件
    e.remove({output:'create:precision_mechanism'})
    ti = 'create:incomplete_precision_mechanism'
    e.recipes.create.sequenced_assembly('create:precision_mechanism','create:golden_sheet',[
        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),

        e.recipes.create.deploying(ti,[ti,'create:cogwheel']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget']),
        e.recipes.create.deploying(ti,[ti,'minecraft:iron_nugget'])
        ])
        .transitionalItem(ti).id('sequenced_assembly/precision_mechanism')

    
    //工业铁锭
    e.recipes.create.compacting('2x createdeco:industrial_iron_ingot',['2x create:iron_sheet','create:andesite_alloy']).superheated()
        .id('compacting/industrial_iron_ingot')
    e.replaceInput({or:[{output:'create:industrial_iron_block'},{output:'dndecor:industrial_plating_block'}]},
        'minecraft:iron_ingot','createdeco:industrial_iron_ingot')
    e.replaceInput({id:'createdeco:industrial_iron_ingot_from_industrial_iron_block'},'create:industrial_iron_block','createbigcannons:steel_block')
    e.replaceOutput({id:'createdeco:industrial_iron_block'},'create:industrial_iron_block','createbigcannons:steel_block')
    e.remove({id:'createbigcannons:steel_ingot_from_block'})
    e.remove({id:'createbigcannons:steel_block'})
    e.replaceOutput({id:'createbigcannons:compacting/forge_steel_block'},'createbigcannons:steel_block','mekanism:block_steel')

    //纸浆
    e.recipes.create.mixing('create:pulp',['4x createdieselgenerators:wood_chip',Fluid.of('minecraft:water',250)])
        .id('mixing/create/pulp')

    //幻翼物流
    e.shaped('createphantom:mini_phantom',[
        ' A ',
        'BCB',
        ' D '
    ],{
        A:"kubejs:circuit",
        B:"create:white_sail",
        C:"dndesires:overburden_casing",
        D:"create:andesite_alloy"
    }).id('crafting/createphantom/mini_phantom')
    e.shaped('createphantom:phantomport',[
        'A',
        'B',
        'C'
    ],{
        A:"dndesires:overburden_casing",
        B:'#create:postboxes',
        C:"create:andesite_casing"
    }).id('crafting/createphantom/phantomport')


    //树木肥料
    e.shapeless('create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',2),'minecraft:moss_block','minecraft:bone_meal'])
        .id('crafting/appliances/tree_fertilizer')
    e.shapeless('3x create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',3),'ratatouille:ripen_matter'])
        .id('crafting/appliances/tree_fertilizer_3')
    //无土植树配方
    let treedeploying = [
        ['minecraft:oak_sapling',[Item.of('minecraft:oak_log',16),Item.of('minecraft:oak_leaves',64)]],
        ['minecraft:spruce_sapling',[Item.of('minecraft:spruce_log',16),Item.of('minecraft:spruce_leaves',64)]],
        ['minecraft:birch_sapling',[Item.of('minecraft:birch_log',16),Item.of('minecraft:birch_leaves',64)]],
        ['minecraft:jungle_sapling',[Item.of('minecraft:jungle_log',16),Item.of('minecraft:jungle_leaves',64)]],
        ['minecraft:acacia_sapling',[Item.of('minecraft:acacia_log',16),Item.of('minecraft:acacia_leaves',64)]],
        ['minecraft:dark_oak_sapling',[Item.of('minecraft:dark_oak_log',16),Item.of('minecraft:dark_oak_leaves',64)]],
        ['minecraft:mangrove_propagule',[Item.of('minecraft:mangrove_log',16),Item.of('minecraft:mangrove_roots',16),Item.of('minecraft:mangrove_leaves',64)]],
        ['minecraft:cherry_sapling',[Item.of('minecraft:cherry_log',16),Item.of('minecraft:cherry_leaves',64)]],
        ['minecraft:pale_oak_sapling',[Item.of('minecraft:pale_oak_log',16),Item.of('minecraft:pale_oak_leaves',64),CreateItem.of('minecraft:creaking_heart',0.05)]],
        ['minecraft:azalea',[Item.of('minecraft:oak_log',16),Item.of('minecraft:azalea_leaves',64)]],
        ['minecraft:flowering_azalea',[Item.of('minecraft:oak_log',16),Item.of('minecraft:flowering_azalea_leaves',64)]],
        ['minecraft:brown_mushroom',[Item.of('minecraft:mushroom_stem',16),Item.of('minecraft:brown_mushroom_block',64)]],
        ['minecraft:red_mushroom',[Item.of('minecraft:mushroom_stem',16),Item.of('minecraft:red_mushroom_block',64)]],
        ['minecraft:warped_fungus',[Item.of('minecraft:warped_stem',16),Item.of('minecraft:warped_wart_block',64)]],
        ['minecraft:crimson_fungus',[Item.of('minecraft:crimson_stem',16),Item.of('minecraft:nether_wart_block',64)]],
        //自然之灵
        ['natures_spirit:redwood_sapling',[Item.of('natures_spirit:redwood_log',16),Item.of('natures_spirit:redwood_leaves',64)]],
        ['natures_spirit:sugi_sapling',[Item.of('natures_spirit:sugi_log',16),Item.of('natures_spirit:sugi_leaves',64)]],
        ['natures_spirit:purple_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:purple_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:white_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:white_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:blue_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:blue_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:pink_wisteria_sapling',[Item.of('natures_spirit:wisteria_log',16),Item.of('natures_spirit:pink_wisteria_leaves',32),Item.of('natures_spirit:wisteria_leaves',32)]],
        ['natures_spirit:fir_sapling',[Item.of('natures_spirit:fir_log',16),Item.of('natures_spirit:fir_leaves',64)]],
        ['natures_spirit:willow_sapling',[Item.of('natures_spirit:willow_log',16),Item.of('natures_spirit:willow_leaves',64)]],
        ['natures_spirit:aspen_sapling',[Item.of('natures_spirit:aspen_log',16),Item.of('natures_spirit:aspen_leaves',32),Item.of('natures_spirit:yellow_aspen_leaves',32)]],
        ['natures_spirit:red_maple_sapling',[Item.of('natures_spirit:maple_log',16),Item.of('natures_spirit:red_maple_leaves',64)]],
        ['natures_spirit:orange_maple_sapling',[Item.of('natures_spirit:maple_log',16),Item.of('natures_spirit:orange_maple_leaves',64)]],
        ['natures_spirit:yellow_maple_sapling',[Item.of('natures_spirit:maple_log',16),Item.of('natures_spirit:yellow_maple_leaves',64)]],
        ['natures_spirit:cypress_sapling',[Item.of('natures_spirit:cypress_log',16),Item.of('natures_spirit:cypress_leaves',64)]],
        ['natures_spirit:olive_sapling',[Item.of('natures_spirit:olive_log',16),Item.of('natures_spirit:olive_leaves',64),Item.of('natures_spirit:olives',8)]],
        ['natures_spirit:joshua_sapling',[Item.of('natures_spirit:joshua_log',16),Item.of('natures_spirit:joshua_leaves',64)]],
        ['natures_spirit:ghaf_sapling',[Item.of('natures_spirit:ghaf_log',16),Item.of('natures_spirit:ghaf_leaves',64)]],
        ['natures_spirit:palo_verde_sapling',[Item.of('natures_spirit:palo_verde_log',16),Item.of('natures_spirit:palo_verde_leaves',64)]],
        ['natures_spirit:coconut_sprout',[Item.of('natures_spirit:coconut_log',16),Item.of('natures_spirit:coconut_leaves',64),Item.of('natures_spirit:coconut',8)]],
        ['natures_spirit:cedar_sapling',[Item.of('natures_spirit:cedar_log',16),Item.of('natures_spirit:cedar_leaves',64)]],
        ['natures_spirit:larch_sapling',[Item.of('natures_spirit:larch_log',16),Item.of('natures_spirit:larch_leaves',64)]],
        ['natures_spirit:mahogany_sapling',[Item.of('natures_spirit:mahogany_log',16),Item.of('natures_spirit:mahogany_leaves',64)]],
        ['natures_spirit:saxaul_sapling',[Item.of('natures_spirit:saxaul_log',16),Item.of('natures_spirit:saxaul_leaves',64)]],
        ['natures_spirit:alluaudia',[Item.of('natures_spirit:alluaudia',16)]]
    ]

    treedeploying.forEach(element=>{
        let [item,output] = element
        e.recipes.create.deploying(output,['create:tree_fertilizer',item]).keepHeldItem()
            .id('deploying/planting/'+item.replace(':','/'))
    })

//第三章

    

//第四章


//终章


//创造物品配方





//变难配方
    //高温熔炼触媒
    e.replaceInput({id:'dndesires:crafting/fan_catalyst/seething_sail'},'dndesires:burner','mekanism:pellet_antimatter')
    e.remove({output:'create_connected:fan_seething_catalyst'})
    e.recipes.create.item_application('create_connected:fan_seething_catalyst',['create_connected:empty_fan_catalyst','dndesires:seething_sail'])
        .id('item_application/create_connected/fan_seething_catalyst')

//QOL配方

    //清理铁板配方
    e.replaceInput({input:'create:iron_sheet',type:'minecraft:stonecutting'},
        'create:iron_sheet','createdeco:industrial_iron_nugget')
    //快速产木桶
    e.recipes.vintageimprovements.turning('minecraft:barrel',Ingredient.of('#minecraft:logs'),40)

    //懒惰刻时钟
    e.recipes.create.deploying('createlazytick:clock',['minecraft:clock','create:brass_sheet'])
        .id('deploying/createlazytick/clock')

    //高炉
    e.recipes.create.deploying('minecraft:blast_furnace',['minecraft:furnace','create:iron_sheet'])
        .id('deploying/minecraft/blast_furnace')



    //下界之星配方
    e.recipes.create.mechanical_crafting('minecraft:nether_star',[
        'AAA',
        'BBB',
        ' B '
    ],{
        A:'minecraft:wither_skeleton_skull',
        B:'minecraft:soul_sand'
    }).id('mechanical_crafting/nether_star')

    //哭泣的黑曜石和恶魂之泪生产
    e.recipes.create.deploying('minecraft:crying_obsidian',['minecraft:obsidian',"farmersdelight:onion"])
        .id('deploying/crying_obsidian')
    e.recipes.vintageimprovements.centrifugation(['minecraft:obsidian','minecraft:ghast_tear'],'minecraft:crying_obsidian',300)
        .id('centrifugation/ghast_tear')

    //嗅探兽蛋
    e.recipes.create.compacting('minecraft:sniffer_egg',
        ['minecraft:crimson_pressure_plate','minecraft:warped_pressure_plate',Fluid.of('ratatouille:egg_yolk',1000)])
        .id('compacting/sniffer_egg')

    //打包机加速器
    e.remove({id:'createadditionallogistics:crafting/logistics/package_accelerator'})
    e.shaped('createadditionallogistics:package_accelerator',[
        'A',
        'B',
        'C'
    ],{
        A:'create:precision_mechanism',
        B:'create:millstone',
        C:'create:brass_block'
    }).id('crafting/createadditionallogistics/package_accelerator')

    

    //链式传动箱
    e.shapeless('4x create:encased_chain_drive',['create:andesite_casing','minecraft:chain']).id('crafting/create/encased_chain_drive')

    //珊瑚增殖
    let corals = [
        'minecraft:tube_coral_block','minecraft:brain_coral_block','minecraft:bubble_coral_block','minecraft:fire_coral_block','minecraft:horn_coral_block',
        'minecraft:tube_coral','minecraft:brain_coral','minecraft:bubble_coral','minecraft:fire_coral','minecraft:horn_coral',
        'minecraft:tube_coral_fan','minecraft:brain_coral_fan','minecraft:bubble_coral_fan','minecraft:fire_coral_fan','minecraft:horn_coral_fan'
    ]
    corals.forEach(element=>{
        e.recipes.create.mixing(Item.of(element,5),[element,Fluid.of('createpropulsion:coral',100)])
            .id('mixing/'+element.replace(':','/'))
    })
    //模组矿物
    let coral_to_ore = [
        ['minecraft:horn_coral_block', 'mekanism:block_raw_uranium', 'vintageimprovements:uranium_sheet'],
        ['minecraft:brain_coral_block', 'mekanism:block_raw_tin', 'vintageimprovements:tin_sheet'],
        ['minecraft:tube_coral_block', 'mekanism:block_raw_osmium', 'vintageimprovements:osmium_sheet'],
        ['minecraft:fire_coral_block', 'mekanism:block_raw_lead', 'vintageimprovements:lead_sheet'],
        ['minecraft:bubble_coral_block', 'rocketnautics:raw_titanium_block', 'rocketnautics:titanium_sheet']
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

//神秘配方
    e.remove({id:'createaddition:mixing/biomass_from_stricks'})
    e.recipes.create.mixing('minecraft:stick',[Item.of('minecraft:stick',2)])
        .id('mixing/gunmu')
})
