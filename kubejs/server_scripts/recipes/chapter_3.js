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
    //console.log(times) 
    for (let t = 0; t < times; t++) {
        for (let i = len - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 直接交换
        }
    }
    return arr; // 返回原数组，方便链式调用
}


ServerEvents.recipes(e=>{
    //3个报错的配方，但是不影响配方正常加载
    'create_fantasizing:sequenced_assembly/alternative_chromatic_compound'
    'create_fantasizing:sequenced_assembly/heart_of_the_sea_copy'
    'create_fantasizing:sequenced_assembly/compact_hydraulic_engine'
    //不在这里解决，而是在data文件夹解决
    
    //替用型异彩化合物
    e.remove({output:'create_fantasizing:alternative_chromatic_compound'})
    let ti = 'mekanism:enriched_carbon'

    let candidates = ['minecraft:orange_dye','minecraft:lime_dye','minecraft:cyan_dye',
        'minecraft:purple_dye','minecraft:pink_dye','minecraft:gray_dye']
    shuffle(candidates,5)
    e.recipes.create.sequenced_assembly('create_fantasizing:alternative_chromatic_compound','mekanism:alloy_atomic',[
        e.recipes.create.deploying(ti,[ti,candidates[0]]),
        e.recipes.create.deploying(ti,[ti,candidates[1]]),
        e.recipes.create.deploying(ti,[ti,candidates[2]]),
        e.recipes.create.deploying(ti,[ti,candidates[3]]),
        e.recipes.create.deploying(ti,[ti,candidates[4]])
        ])
        .transitionalItem(ti).id('sequenced_assembly/alternative_chromatic_compound')

    let candidates2 = ['create_dragons_plus:orange_dye','create_dragons_plus:lime_dye','create_dragons_plus:cyan_dye',
        'create_dragons_plus:purple_dye','create_dragons_plus:pink_dye','create_dragons_plus:gray_dye']
    shuffle(candidates2,5)
    e.recipes.create.sequenced_assembly('create_fantasizing:alternative_chromatic_compound','mekanism:alloy_atomic',[
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[0],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[1],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[2],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[3],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[4],250)])
        ])
        .transitionalItem(ti).id('sequenced_assembly/alternative_chromatic_compound_liquid')
    //太极芯片组（使用数据包）
    e.recipes.vintageimprovements.pressurizing(['create_fantasizing:incomplete_taiji_chipset[create:sequenced_assembly={id:"create_fantasizing:sequenced_assembly/taiji_chipset_shadow_plating",progress:0.5f,step:3}]', 'create_fantasizing:incomplete_taiji_chipset[create:sequenced_assembly={id:"create_fantasizing:sequenced_assembly/taiji_chipset_exposing",progress:0.5f,step:3}]'],
        ['create_fantasizing:incomplete_taiji_chipset[create:sequenced_assembly={id:"create_fantasizing:sequenced_assembly/taiji_chipset_shadow_plating",progress:0.33333334f,step:2}]', 'create_fantasizing:incomplete_taiji_chipset[create:sequenced_assembly={id:"create_fantasizing:sequenced_assembly/taiji_chipset_exposing",progress:0.33333334f,step:2}]'],
    25).secondaryFluidInput(Fluid.of('kubejs:cryogen',200))
    .id('pressurizing/helper/incomplete_taiji_chipset')
    
    //传统炼钢劣化
    e.remove({output:'mekanism:enriched_iron'})
    e.recipes.mekanism.metallurgic_infusing('mekanism:enriched_iron','kubejs:industrial_iron_storage_block','648x mekanism:carbon',false)
        .id('metallurgic_infusing/mekanism/enriched_iron')
    e.remove({input:'mekanism:dust_steel'})
    e.recipes.create.compacting('mekanism:ingot_steel','10x mekanism:dust_steel').superheated()
        .id('compacting/createbigcannons/steel_ingot/from_dust')
    //移除cbc的炼钢配方
    e.remove({id:'createbigcannons:mixing/alloy_steel'})
    //反应堆玻璃
    e.replaceInput({id:'mekanismgenerators:reactor/glass'},'mekanism:enriched_iron','mekanism:ingot_steel')

    //钢板
    // e.recipes.create.pressing('kubejs:steel_sheet','mekanism:ingot_steel')
    //     .id('pressing/steel_sheet')
    e.recipes.vintageimprovements.hammering('kubejs:steel_sheet','mekanism:ingot_steel')
        .id('hammering/steel_sheet')
    e.custom({
            "type": "dndesires:hydraulic_compacting",
            "ingredients": [
                {"item": 'mekanism:ingot_steel'},
            ],
            "results": [
                {
                "count": 1,
                "id": 'kubejs:steel_sheet'
                }
            ]
        }).id('hydraulic_compacting/steel_sheet')
    //钢制机壳
    e.remove({id:'mekanism:steel_casing'})
    ti = 'dndesires:industrial_casing'
    e.recipes.create.sequenced_assembly('mekanism:steel_casing','dndesires:overburden_casing',[
        e.recipes.create.deploying(ti,[ti,'ae2:quartz_glass']),
        e.recipes.create.deploying(ti,[ti,'vintageimprovements:steel_spring']),
        e.recipes.create.deploying(ti,[ti,'vintageimprovements:steel_rod']),
        e.recipes.create.deploying(ti,[ti,'vintageimprovements:steel_rod']),
        e.recipes.create.deploying(ti,[ti,'kubejs:steel_sheet']),
        e.recipes.vintageimprovements.vacuumizing([ti],[ti,'mekanism:ingot_osmium'],30)
            .secondaryFluidInput(Fluid.of('kubejs:nitrogen',100))
    ],ti).loops(4).id('sequenced_assembly/steel_casing')
    //mek管道
    e.remove({output:['mekanism:basic_mechanical_pipe', 'mekanism:basic_pressurized_tube', 'mekanism:basic_logistical_transporter', 'mekanism:basic_universal_cable', 'mekanism:basic_thermodynamic_conductor']})
    e.shaped('12x mekanism:basic_mechanical_pipe',
        [
            'AAA',
            'BBB',
            'AAA'
        ],{
            A:'kubejs:steel_sheet',
            B:'ae2:quartz_glass'
        }
    ).id('crafting/basic_mechanical_pipe')
    e.shaped('12x mekanism:basic_pressurized_tube',
        [
            'AAA',
            'BBB',
            'AAA'
        ],{
            A:'kubejs:steel_sheet',
            B:'mekanism:ingot_osmium'
        }
    ).id('crafting/basic_pressurized_pipe')
    e.shaped('12x mekanism:basic_logistical_transporter',
        [
            'AAA',
            'BCB',
            'AAA'
        ],{
            A:'kubejs:steel_sheet',
            B:'minecraft:wind_charge',
            C:'mekanism:basic_control_circuit'
        }
    ).id('crafting/basic_logistical_transporter')
    e.shaped('12x mekanism:basic_universal_cable',
        [
            'AAA',
            'BBB',
            'AAA'
        ],{
            A:'kubejs:steel_sheet',
            B:'ae2:quartz_vibrant_glass'
        }
    ).id('crafting/basic_universal_cable')
    e.shaped('12x mekanism:basic_thermodynamic_conductor',
        [
            'AAA',
            'BBB',
            'AAA'
        ],{
            A:'kubejs:steel_sheet',
            B:'create:shadow_steel'
        }
    ).id('crafting/basic_thermodynamic_conductor')
})
