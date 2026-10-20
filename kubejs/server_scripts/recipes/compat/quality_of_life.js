
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
    //树叶振动处理
    // e.recipes.vintageimprovements.leaves_vibrating('minecraft:leaf_litter',Ingredient.of("#minecraft:leaves",1),16)
    //     .id('vintageimprovements:vibrating/leaves_vibrating')
    //红石构件切石
    let redstones = [
        //拉杆
        '16x minecraft:lever', '8x create:analog_lever', '8x simulated:throttle_lever',
        //小元件
        '16x minecraft:redstone_torch',
        '8x minecraft:repeater', '6x minecraft:comparator', '8x create:powered_latch', '8x create:powered_toggle_latch',
        '2x create:pulse_repeater', '4x create:pulse_extender', '4x create:pulse_timer', '2x create_connected:sequenced_pulse_generator',
        '2x simulated:redstone_accumulator', '2x simulated:redstone_inductor', '2x createpropulsion:redstone_converter', 
        //大元件
        '4x create:content_observer', '4x create:stockpile_switch','4x create_connected:inventory_access_port', '8x create:redstone_contact',
        //无线
        '8x create:redstone_link', 'create:linked_controller', 'simulated:linked_typewriter', '2x aeroworks:joystick',
        '2x simulated:directional_linked_receiver', '2x simulated:modulating_linked_receiver',
        'drivebywire:wire', 'drivebywire:backup_block', 'drivebywire:controller_hub',
        //大元件2
        '4x minecraft:daylight_detector', '8x minecraft:observer', '8x minecraft:target', '8x minecraft:note_block', '4x minecraft:redstone_lamp', '4x create:rose_quartz_lamp', 
        '4x minecraft:piston', '4x minecraft:sticky_piston', '6x minecraft:dispenser', '6x minecraft:dropper', 'minecraft:crafter',
        //抽屉升级
        '4x functionalstorage:redstone_upgrade', '2x functionalstorage:collector_upgrade', '2x functionalstorage:puller_upgrade', '2x functionalstorage:pusher_upgrade', '4x functionalstorage:void_upgrade',
        //列车
        '4x create:track_signal', '2x create:track_station', '4x create:track_observer',
        //应力
        '4x create:speedometer', '4x create:stressometer', '2x dndesires:multimeter',
        '8x create:clutch', '8x create_connected:inverted_clutch', '8x create:gearshift', '8x create_connected:inverted_gearshift', '2x create:sequenced_gearshift',
        //传感
        '4x simulated:velocity_sensor', '4x simulated:altitude_sensor', '4x simulated:optical_sensor', '4x simulated:laser_pointer', '4x simulated:laser_sensor',
        //杂项
        '4x simulated:redstone_magnet', 
        '4x minecraft:waxed_copper_bulb', '4x minecraft:waxed_exposed_copper_bulb', '4x minecraft:waxed_weathered_copper_bulb', '4x minecraft:waxed_oxidized_copper_bulb',
        'aeroworks:control_desk', 'aeroworks:lever_module', 'aeroworks:button_panel_module', 'aeroworks:button_keypad_module', 'aeroworks:joystick_module',
        'aeroworks:button_module', 'aeroworks:wheel_module', 'aeroworks:throttle_quadrant_module', 'aeroworks:yoke_module'
        //'2x redstonepen:control_box',
    ]
    redstones.forEach((item,index)=>{
        item = Item.of(item)
        e.stonecutting(item,'vintageimprovements:redstone_module')
            .id('stonecutting/redstone_'+index.toString().padStart(2, '0')+'/'+item.id.replace(':','/'))
    })


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
