ServerEvents.recipes(e=>{

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
    e.recipes.vintageimprovements.centrifugation(['minecraft:obsidian','minecraft:ghast_tear'],'minecraft:crying_obsidian',300)
        .id('centrifugation/ghast_tear')

    //嗅探兽蛋
    e.recipes.create.compacting('minecraft:sniffer_egg',
        ['minecraft:crimson_pressure_plate','minecraft:warped_pressure_plate',Fluid.of('ratatouille:egg_yolk',1000)])
        .id('compacting/sniffer_egg')

//机械动力
    //链式传动箱
    e.shapeless('4x create:encased_chain_drive',['create:andesite_casing','minecraft:chain']).id('crafting/create/encased_chain_drive')


//航空学
    //引擎
    e.replaceInput({id:'simulated:red_portable_engine'},'simulated:engine_assembly','createdieselgenerators:engine_piston')

    //树脂
    e.remove({id:'createpropulsion:crushing/spruce_log'}),
    e.recipes.create.compacting('minecraft:resin_clump',Ingredient.of(['minecraft:stripped_spruce_log','minecraft:stripped_pale_oak_log','natures_spirit:stripped_larch_log','natures_spirit:stripped_cedar_log']))
        .id('compacting/minecraft/resin_clump')

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
    
//汽鸣铁道
    //重写锅炉配方
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
        }).id(id)

    })

//火炮
    //移动火炮铸模配方
    let transfer = [
        'createbigcannons:very_small_cast_mould','createbigcannons:small_cast_mould','createbigcannons:medium_cast_mould',
        'createbigcannons:large_cast_mould','createbigcannons:very_large_cast_mould','createbigcannons:sliding_breech_cast_mould',
        'createbigcannons:cannon_end_cast_mould','createbigcannons:screw_breech_cast_mould','createbigcannons:autocannon_breech_cast_mould',
        'createbigcannons:autocannon_recoil_spring_cast_mould','createbigcannons:autocannon_barrel_cast_mould'
    ]
    transfer.forEach(element=>{
        e.remove({output:element})
        e.recipes.vintageimprovements.turning(element,Ingredient.of('#minecraft:logs'))
    })
    //修改配方时间
    let melting = e.findRecipes({type:'createbigcannons:melting'})
    melting.forEach(element =>{
        let json = element.json
        let id = element.getId()
        let time = json.get('processing_time')

        if(time == 20){
            time = 5
        }else{
            if(time == 180){
            time = 20
            }else{
                if(time == 1620){
                time = 80
                }else{
                    
                }
            }
        }
        json.addProperty('processing_time',time)

        e.custom(json).id(id)
    })

    
    //弹簧丝
    e.remove({id:'createbigcannons:cutting/spring_wire_iron'})
    e.replaceInput({id:'createbigcannons:sequenced_assembly/recoil_spring'},'createbigcannons:spring_wire','simulated:spring')

    //弹药冲压板
    e.remove({id:'createbigcannons:cutting/autocannon_cartridge_sheet_iron'})
    e.remove({output:'createbigcannons:big_cartridge_sheet'})
    e.shapeless('2x createbigcannons:big_cartridge_sheet','2x create:brass_sheet')
      .id('crafting/createbigcannons/big_cartridge_sheet')

//航空学无界
    //将更多的配方改为可以直接合成
    e.shaped('2x aero_no_horizon:suspension_track',[
        ' A ',
        'BCB',
        'DDD'
    ],{
        A:'create:mechanical_piston',
        B:'#minecraft:planks',
        C:'create:cogwheel',
        D:'create:belt_connector'
    }).id('aero_no_horizon:suspension_track')
    e.shaped('2x aero_no_horizon:small_simple_wheel_part',[
        ' A ',
        'ABA',
        ' A '
    ],{
        A:Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']),
        B:'create:cogwheel'
    }).id('aero_no_horizon:small_simple_wheel_part')
    e.shaped('2x aero_no_horizon:med_simple_wheel_part',[
        'AAA',
        'ABA',
        'AAA'
    ],{
        A:Ingredient.of(['minecraft:dried_kelp','delighto_flight:cloud_silk']),
        B:'create:cogwheel'
    }).id('aero_no_horizon:med_simple_wheel_part')

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


//神秘配方
    e.recipes.create.mixing('minecraft:stick',[Item.of('minecraft:stick',2)])
        .id('mixing/gunmu')
    
})
