ServerEvents.recipes(e=>{
    let ti
//vanilla backport - 26.2
    if(Platform.isLoaded('vanillabackport')){
        //水银和硫
        e.recipes.vintageimprovements.vacuumizing('4x mekanism:dust_sulfur',
            ['minecraft:cinnabar'],90,Fluid.of('kubejs:mercury',250))
            .heated().id('vacuumizing/cinnarbar_to_mercury')
        //硫磺块
        e.shapeless('minecraft:sulfur',Item.of('mekanism:dust_sulfur',9))
        e.shapeless(Item.of('mekanism:dust_sulfur',9),['minecraft:sulfur'])
    }

//CC&A 创想附加
    if(Platform.isLoaded('createaddition')){
        //删除吸管和cca的吸管烈焰人燃烧室
        e.remove({output:'createaddition:straw'})
        e.remove({type:'createaddition:liquid_burning'})
        //生物燃料的匹配
        e.remove({output:'mekanism:block_bio_fuel'})
        e.replaceInput({input:'mekanism:block_bio_fuel'},'mekanism:block_bio_fuel','createaddition:biomass_pellet_block')
        //特斯拉线圈
        e.remove({id:'createaddition:mechanical_crafting/tesla_coil'})
        e.shaped('createaddition:tesla_coil',[
            'AAA',
            'BCB',
            'DED'
        ],{
            A:'createaddition:copper_spool',
            B:'createaddition:capacitor',
            C:'create:andesite_alloy',
            D:'create:brass_sheet',
            E:'create:brass_casing'
        }).id('crafting/createaddition/tesla_coil')
        //去除木棍产生物质
        e.remove({id:'createaddition:mixing/biomass_from_stricks'})
    }

//CBC 火炮
    if(Platform.isLoaded('createaddition')){
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
        
        //弹簧丝
        e.remove({output:'createbigcannons:spring_wire'})
        e.replaceInput({id:'createbigcannons:sequenced_assembly/recoil_spring'},'createbigcannons:spring_wire','simulated:spring')

        //弹药冲压板
        e.remove({id:'createbigcannons:cutting/autocannon_cartridge_sheet_iron'})
        e.remove({output:'createbigcannons:big_cartridge_sheet'})
        e.shapeless('2x createbigcannons:big_cartridge_sheet','2x create:brass_sheet')
        .id('crafting/createbigcannons/big_cartridge_sheet')
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
        })
    }

//蜜蜂物流
    if(Platform.isLoaded('create_mobile_packages')){
        e.remove({id:'create_mobile_packages:robo_bee'})
        e.shaped('create_mobile_packages:robo_bee',[
            'ABA',
            'CDC'
        ],{
            A:'create:propeller',
            B:'create:andesite_alloy',
            C:'minecraft:honeycomb',
            D:'dndesires:overburden_casing',
        }).id('crafting/create_mobile_packages/robo_bee')
    }
//幻翼物流
    if(Platform.isLoaded('createphantom')){
        e.remove({or:[{id:'createphantom:phantomport'},{id:'createphantom:mini_phantom'}]})
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
    }

//CCK 中央厨房
    if(Platform.isLoaded('create_central_kitchen')){
        //去皮配方
        let treecutting = e.findRecipes({output:'farmersdelight:tree_bark',type:'create:cutting'})
        treecutting.forEach(element=>{
            let json = element.json
            //console.log(json)
            let ingredients = json.get('ingredients')
            //console.log(ingredients)
            //为什么这个列表不吃[0]?
            let input = String(ingredients).slice(10,-3)
            let results = json.get('results')
            let [a,b] = String(results).slice(1,-1).split(',')
            a=a.slice(7,-2)
            b=b.slice(7,-2)

            e.recipes.mekanism.sawing(a,b,1,input).id('sawing/'+input.replace(':','/')) 
        })
    }    
//ratatoulie 齿轮与麦穗
    if(Platform.isLoaded('ratatouille')){
        //树木肥料
        e.shapeless('3x create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',3),'ratatouille:ripen_matter'])
            .id('crafting/appliances/tree_fertilizer_3')
        //嗅探兽蛋
        e.recipes.create.compacting('minecraft:sniffer_egg',
            ['minecraft:crimson_pressure_plate','minecraft:warped_pressure_plate',Fluid.of('ratatouille:egg_yolk',1000)])
            .id('compacting/sniffer_egg')
        //巧克力
        e.recipes.create.mixing([Fluid.of('create:chocolate',500)],
            [Fluid.of('ratatouille:cocoa_liquor',250),Fluid.of('minecraft:milk',250),'minecraft:sugar'],60)
            .heated().id('mixing/create/chocolate')
        //珊瑚
        e.recipes.create.mixing([Fluid.of('createpropulsion:coral',500)],
            [Fluid.of('ratatouille:melon_juice_fluid',500),'minecraft:glowstone_dust','minecraft:blaze_powder'],60)
            .superheated().id('mixing/createpropulsion/coral')
    }

//航空学无界
    if(Platform.isLoaded('aero_no_horizon')){
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
    }
//航空学革新
    if(Platform.isLoaded('aero_reformation')){
        ti = 'aero_reformation:incomplete_rcs_thruster'
        e.recipes.create.sequenced_assembly('aero_reformation:rcs_thruster','createpropulsion:thruster',[
            e.recipes.create.deploying(ti,[ti,'create:precision_mechanism']),
            e.recipes.create.pressing(ti,ti),
            e.recipes.create.deploying(ti,[ti,'kubejs:circuit']),
            e.recipes.create.deploying(ti,[ti,'create:sturdy_sheet']),
            e.recipes.create.pressing(ti,ti)
        ],ti).id('aero_reformation:sequenced_assembly/rcs_thruster')
        ti = 'aero_reformation:incomplete_guidance_warhead'
        e.recipes.create.sequenced_assembly('aero_reformation:guidance_warhead','aero_reformation:directional_synchronizer_master',[
            e.recipes.create.deploying(ti,[ti,'create:precision_mechanism']),
            e.recipes.create.deploying(ti,[ti,'kubejs:circuit']),
            e.recipes.create.deploying(ti,[ti,'simulated:gyroscopic_mechanism']),
            e.recipes.create.deploying(ti,[ti,'aero_reformation:ender_compass'])
        ],ti).id('aero_reformation:sequenced_assembly/guidance_warhead')
    }
})