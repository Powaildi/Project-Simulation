ServerEvents.recipes(e=>{
    //福鲁伊克斯水晶死锁
    e.remove({id:'ae2:transform/fluix_crystal'})
    e.remove({id:'ae2:transform/fluix_crystals'})
    e.replaceOutput({id:'create:mixing/compat/ae2/fluix_crystal'},'ae2:fluix_crystal','2x ae2:fluix_dust')
    //赌怪配方，目前唯一，计划天降陨石获取
    e.recipes.vintageimprovements.pressurizing(CreateItem.of('ae2:fluix_crystal',0.002),[
        Fluid.of('createdieselgenerators:gasoline',500),'ae2:charged_certus_quartz_crystal','ae2:fluix_dust'
    ]).superheated()

    e.remove({output: 'ae2:charger'})
    e.shaped('ae2:charger', [
        'RCR',
        'CF ',
        'RCR'
    ], {
        R: 'mekanism:hdpe_sheet',
        C: 'createutilities:polished_amethyst',
        F: 'ae2:fluix_crystal'
    })
    //线缆改动
    e.replaceInput({id:'ae2:network/cables/glass_fluix'},'ae2:fluix_crystal','ae2:fluix_dust')

    //部分配方材料替换


    //恩特罗注入锭搅拌配方
    e.recipes.create.mixing('4x extendedae:entro_ingot',[
        '4x extendedae:entro_dust','4x minecraft:gold_ingot','4x minecraft:lapis_lazuli',Fluid.of('minecraft:water',500)
    ])
})
