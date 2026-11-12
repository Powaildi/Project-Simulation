
ServerEvents.recipes(e=>{
    let ti
//原版
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
    e.recipes.vintageimprovements.centrifugation(['minecraft:obsidian','minecraft:ghast_tear'],'minecraft:crying_obsidian',320)
        .id('centrifugation/ghast_tear')
    //快速产木桶
    e.recipes.vintageimprovements.turning('minecraft:barrel',Ingredient.of('#minecraft:logs'),40)
    //骷髅头
    e.recipes.vintageimprovements.turning('minecraft:skeleton_skull','minecraft:bone_block',200)
    //高炉
    e.recipes.create.deploying('minecraft:blast_furnace',['minecraft:furnace','create:iron_sheet'])
        .id('deploying/minecraft/blast_furnace')
    //附魔书
    //忠诚
    e.recipes.create.mixing('minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:loyalty":1}}]',
        [Item.of('create:peculiar_bell',7),Item.of('minecraft:basalt',34),Item.of('create:scoria',8)])
        .id('mixing/enchanted_book/loytalty_silksong')
    //时运
    e.recipes.create.deploying('minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:fortune":1}}]',
        ['minecraft:book','minecraft:diamond'])
        .id('deploying/enchanted_book/fortune')
    //抢夺
    e.recipes.create.deploying('minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:looting":1}}]',
        ['minecraft:book','minecraft:emerald'])
        .id('deploying/enchanted_book/looting')
    //横扫之刃
    e.recipes.create.deploying('minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:sweeping_edge":1}}]',
        ['minecraft:book','minecraft:iron_sword'])
        .id('deploying/enchanted_book/sweeping_edge')
    
//农夫乐事
    
//机械动力
    //链式传动箱
    e.shapeless('4x create:encased_chain_drive',['create:andesite_casing','minecraft:chain'])
        .id('crafting/create/encased_chain_drive')
    //烈焰人燃烧室
    ti = 'kubejs:frankenstein'
    e.recipes.create.sequenced_assembly('create:blaze_burner','create:empty_blaze_burner',[
        e.recipes.create.deploying(ti,[ti,'minecraft:magma_cream']),
        e.recipes.create.deploying(ti,[ti,'minecraft:blaze_rod']),
        e.recipes.create.deploying(ti,[ti,'minecraft:blaze_rod']),
        e.recipes.create.deploying(ti,[ti,'minecraft:blaze_rod']),
        e.recipes.create.deploying(ti,[ti,'minecraft:blaze_rod']),
        e.recipes.create.deploying(ti,[ti,'ae2:charged_certus_quartz_crystal'])
    ],ti).id('sequenced_assembly/blaze_burner')
//龙+
    //染料配方
    // let dye_recipes = e.findRecipes({id:/.*dye_from_item$/})
    // dye_recipes.forEach(recipe=>{
    //     let json = recipe.json
    //     let result = json.get('results').getAsJsonArray()
    //     result.get(0).getAsJsonObject().addProperty('amount',new $Integer(256))//对，到这已经生效了
    // })
    //e.remove({id:/^dye_fluid_coloring/})


    
//航空学
    //引擎组件
    e.remove({id:'simulated:sequenced_assembly/engine_assembly'})
    ti = 'simulated:incomplete_engine_assembly'
    e.recipes.create.sequenced_assembly('simulated:engine_assembly','kubejs:industrial_iron_sheet',[
        e.recipes.vintageimprovements.curving(ti,ti,10,1,0),
        e.recipes.create.deploying(ti,[ti,'createdieselgenerators:engine_piston']),
        e.recipes.create.deploying(ti,[ti,'minecraft:blaze_rod']),
        e.recipes.create.filling(ti,[ti,Fluid.of('kubejs:lube',50)]),
        e.recipes.create.pressing(ti,ti)
    ],ti).loops(4).id('sequenced_assembly/engine_assembly')
    //大柴油机
    e.replaceInput({id:'createdieselgenerators:crafting/huge_diesel_engine'},'create:steam_engine','simulated:engine_assembly')
    //引擎
    e.replaceInput({id:'simulated:red_portable_engine'},'simulated:engine_assembly','createdieselgenerators:engine_piston')

    //树脂
    e.remove({id:'createpropulsion:crushing/spruce_log'}),
    e.recipes.create.compacting('createpropulsion:pine_resin',Ingredient.of(['minecraft:stripped_spruce_log','natures_spirit:stripped_larch_log','natures_spirit:stripped_cedar_log']))
        .id('compacting/minecraft/resin_clump')

    //创造物理手杖
    e.recipes.create.mechanical_crafting('simulated:creative_physics_staff',
        [
            '    AB',
            '   ACA',
            '  ADA ',
            ' EEA  ',
            'EFE   ',
            'EE    '
        ],
        {
            A:'create:refined_radiance',
            B:'create:chromatic_compound',
            C:'fluidlogistics:hand_pointer',
            D:'create_fantasizing:taiji_chipset',
            E:'create:shadow_steel',
            F:'mekanism:alloy_atomic'
        }
    ).id('mechanical_crafting/creative_physics_staff')
    
    //序列装配改变并提高概率
    ti = 'simulated:incomplete_gyroscopic_mechanism'
    e.recipes.create.sequenced_assembly('simulated:gyroscopic_mechanism','create:iron_sheet',[
        e.recipes.vintageimprovements.curving(ti,ti,10,1,0),
        e.recipes.create.deploying(ti,[ti,'create:shaft']),
        e.recipes.create.deploying(ti,[ti,'create:shaft']),
        e.recipes.create.deploying(ti,[ti,'simulated:incomplete_gyroscopic_mechanism[create:sequenced_assembly={id:"simulated:sequenced_assembly/gyroscopic_mechanism",progress:0.5f,step:3}]']),
        //e.recipes.create.deploying(ti,[ti,ti]),
        e.recipes.create.deploying(ti,[ti,'create:brass_nugget']),
        e.recipes.create.filling(ti,[ti,Fluid.of('createdieselgenerators:plant_oil',100)])
    ],ti).id('simulated:sequenced_assembly/gyroscopic_mechanism')
    e.recipes.vintageimprovements.vacuumizing
    // let aaa = e.recipes.vintageimprovements.pressurizing('create_fantasizing:incomplete_taiji_chipset[create:sequenced_assembly={id:"create_fantasizing:sequenced_assembly/taiji_chipset_exposing",progress:0.5f,step:3}]',
    //     'create:refined_radiance'
    // )
    // aaa.serialize()
    // console.log(aaa.json)
    //飞控
    ti = 'create_flight_control:incomplete_control_unit'
    e.recipes.create.sequenced_assembly('create_flight_control:control_unit','create:brass_sheet',[
        e.recipes.create.deploying(ti,[ti,'minecraft:diamond']),
        e.recipes.create.deploying(ti,[ti,'kubejs:circuit']),
        e.recipes.create.deploying(ti,[ti,'minecraft:compass'])
    ],ti).id('create_flight_control:sequenced_assembly/control_unit')
    ti = 'create_flight_control:incomplete_flight_control_computer'
    e.recipes.create.sequenced_assembly('create_flight_control:flight_control_computer','create:brass_casing',[
        e.recipes.create.deploying(ti,[ti,'create_flight_control:control_unit']),
        e.recipes.create.deploying(ti,[ti,'kubejs:circuit']),
        e.recipes.create.deploying(ti,[ti,'minecraft:emerald'])
    ],ti).id('create_flight_control:sequenced_assembly/flight_control_computer')

//经典改进
    //机器和工具配方
    e.remove({id:'vintageimprovements:sequenced_assembly/recipe_card'})
    e.shapeless('vintageimprovements:recipe_card',['create:brass_sheet','minecraft:paper'])
        .id('crafting/vintageimprovements/recipe_card')
    e.replaceInput({id:'vintageimprovements:craft/spring_coiling_machine'},
        'vintageimprovements:spring_coiling_machine_wheel', 'minecraft:iron_block' )
    e.shaped('vintageimprovements:laser',[
        ' A ',
        'BCB',
        'DED'
    ],{
        A:'create:precision_mechanism',
        B:'simulated:spring',
        C:'create:brass_casing',
        D:'create:copper_sheet',
        E:'create:electron_tube'
    }).id('vintageimprovements:craft/laser')
    e.remove({id:'vintageimprovements:mechanical_crafting/laser'})
    //树叶振动处理
    // e.recipes.vintageimprovements.leaves_vibrating('minecraft:leaf_litter',Ingredient.of("#minecraft:leaves",1),16)
    //     .id('vintageimprovements:vibrating/leaves_vibrating')
    


//汽鸣铁道
    //重写锅炉配方
    if(Platform.isLoaded('railways')){
        let boiler_recipes = e.recipeStream({mod:'railways',type:'create:mechanical_crafting'})
        boiler_recipes.forEach(recipe=>{
            let result = recipe.getOriginalRecipeResult()
            let id = recipe.getId()
            let metal = recipe.getOriginalRecipeIngredients().get(2).asStack().getItems().pop()
            e.shaped(result,[
                'ABA',
                'BCB',
                'ABA'
            ],{
                A:metal,
                B:'minecraft:blaze_rod',
                C:'minecraft:bucket'
            }).id('crafting/' + result.id.replace(':','/'))
            recipe.remove()
        })
        //重写列车长帽配方
        let cap_recipes = e.recipeStream({output:'#railways:conductor_caps'})
        cap_recipes.forEach(recipe=>{
            let result = recipe.getOriginalRecipeResult()
            let id = recipe.getId()
            let wool = recipe.json.get('ingredient')
            if(wool == null)return
            e.shapeless(result,[
                wool,'minecraft:string','create:precision_mechanism'
            ]).id('crafting/' + result.id.replace(':','/'))
            recipe.remove()
        })
        //删除颜料配方
        //按配方 ID 的前缀删除，精准拦截 palettes/dyeing/ 下的所有配方
        e.remove({ id: /railways:mixing\/palettes\/dyeing\/.*/ });
        //代偿配方：切石
        let locometal = ['railways:riveted_locometal', 'railways:brown_riveted_locometal', 'railways:maroon_riveted_locometal', 'railways:red_riveted_locometal', 'railways:vermilion_riveted_locometal', 'railways:orange_riveted_locometal', 'railways:granite_riveted_locometal', 'railways:dripstone_riveted_locometal', 'railways:ochrum_riveted_locometal', 'railways:yellow_riveted_locometal', 'railways:chartreuse_riveted_locometal', 'railways:olive_green_riveted_locometal', 'railways:lime_riveted_locometal', 'railways:green_riveted_locometal', 'railways:pine_green_riveted_locometal', 'railways:cyan_riveted_locometal', 'railways:sea_green_riveted_locometal', 'railways:turquoise_riveted_locometal', 'railways:light_blue_riveted_locometal', 'railways:blue_riveted_locometal', 'railways:royal_blue_riveted_locometal', 'railways:purple_riveted_locometal', 'railways:magenta_riveted_locometal', 'railways:light_gray_riveted_locometal', 'railways:tuff_riveted_locometal', 'railways:gray_riveted_locometal', 'railways:scorchia_riveted_locometal', 'railways:black_riveted_locometal']
        locometal.forEach(item=>{
            e.stonecutting(item,Ingredient.of('#kubejs:locometal'))
        })
        
    }
    
//杂项
    //清理铁板配方
    e.replaceInput({input:'create:iron_sheet',type:'minecraft:stonecutting'},
        'create:iron_sheet','createdeco:industrial_iron_sheet')

    //角砾岩粉碎
    e.recipes.create.crushing(['2x create:cinder_flour',CreateItem.of('mekanism:dust_sulfur')],'dndesires:breccia')
        .id('crushing/dndesires/breccia')

//物流附加
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

//通用机械
    //染料基础
    e.remove({id:'mekanism:dye_base'})

    //太阳能发电机简化
    e.replaceInput({id:'mekanismgenerators:generator/solar'},'mekanismgenerators:solar_panel','ae2:printed_silicon')

    //灌注合金，强化合金，原子合金
    e.replaceInput({id:'mekanism:metallurgic_infusing/alloy/infused'},'minecraft:copper_ingot','create:andesite_alloy')

    //荧石粉代替氟石粉
    e.replaceInput({input:'mekanism:dust_fluorite'},'mekanism:dust_fluorite',Ingredient.of(['mekanism:dust_fluorite','minecraft:glowstone_dust']))

    //碎矿洗涤
    e.recipes.create.splashing(['9x mekanism:nugget_tin',CreateItem.of('minecraft:glowstone_dust',0.5)],'create:crushed_raw_tin' )
        .id('create:splashing/mekanism/crushed_raw_tin')
    e.recipes.create.splashing(['9x mekmm:nugget_silver',CreateItem.of('minecraft:prismarine_crystals',0.25)],'create:crushed_raw_silver' )
        .id('splashing/mekmm/crushed_raw_silver')
    e.recipes.create.splashing(['9x mekanism:nugget_lead',CreateItem.of('ae2:ender_dust',0.15)],'create:crushed_raw_lead' )
        .id('create:splashing/mekanism/crushed_raw_lead')
    e.recipes.create.splashing(['9x mekanism:nugget_uranium',CreateItem.of('mekanism:dust_sulfur',0.5)],'create:crushed_raw_uranium' )
        .id('create:splashing/mekanism/crushed_raw_uranium')
    
//AE2
    e.recipes.create.item_application('extendedae:entro_budding_fully',['ae2:fluix_block','extendedae:entro_seed'])
        .id('item_application/extendedae/entro_budding_fully')

//神秘配方
    e.recipes.create.mixing('minecraft:stick',[Item.of('minecraft:stick',2)])
        .id('mixing/gunmu')
    e.recipes.create.sequenced_assembly('minecraft:diamond','minecraft:coal_block',[
        e.recipes.create.pressing('minecraft:coal_block','minecraft:coal_block')
    ])
    .transitionalItem('minecraft:coal_block').loops(114514).id('sequenced_assembly/diamond_114514') 
    e.recipes.create.filling(CreateItem.of('kubejs:graphite',0.5),
        ['create:millstone',Fluid.of('create_dragons_plus:black_dye',250)])   
        .id('filling/graphite')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('mekanism:sulfur_dioxide',300),`minecraft:bread[item_name='{"color":"black","italic":false,"translate":"item.minecraft.bread"}']`],
        [Fluid.of('mekanism:sulfuric_acid',300),'minecraft:sugar'],125)
        .secondaryFluidOutput(Fluid.of('kubejs:carbon_dioxide',300))
        .id('pressurizing/black_bread')
})
