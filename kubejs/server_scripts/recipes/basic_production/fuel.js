ServerEvents.recipes(e=>{    

    //木屑
    e.shapeless('4x createdieselgenerators:wood_chip','createdieselgenerators:chip_wood_block')
        .id('crafting/createdieselgenerators/wood_chip')
    e.remove({id:'createdieselgenerators:crushing/wood_chip_planks'})
    e.custom({
        "type": "create:milling",
        "ingredients": [
            {
            "type": "neoforge:difference",
            "base": [
                {
                "tag": "minecraft:planks"
                },
                {
                "item": "minecraft:bamboo_mosaic"
                }
            ],
            "subtracted": {
                "item": "createdieselgenerators:chip_wood_block"
            }
            }
        ],
        "results": [
            {
            "id": "createdieselgenerators:wood_chip",
            "count": 7
            },
            {
            "id": "createdieselgenerators:wood_chip",
            "chance": 0.5
            }
        ]
        })
        .id('milling/wood_chip_planks')
    e.replaceInput({id:'createdieselgenerators:crushing/wood_chip_slabs'},'createdieselgenerators:chip_wood_block','createdieselgenerators:chip_wood_slab')
    //液化木煤气
    e.recipes.vintageimprovements.pressurizing('minecraft:charcoal',Ingredient.of('#minecraft:logs'),125,Fluid.of('kubejs:wood_gas',250))
        .heated()
        .id('pressurizing/wood_gas')
    e.recipes.vintageimprovements.pressurizing(['minecraft:charcoal',Fluid.of('kubejs:tar',100)],Ingredient.of('#minecraft:logs'),60,Fluid.of('kubejs:wood_gas',250))
        .superheated()
        .id('pressurizing/wood_gas_superheated')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('kubejs:wood_gas',75),'createdieselgenerators:chip_wood_block',60,0)
        .heated()
        .id('pressurizing/wood_gas_from_chip')

    //种子油
    e.recipes.create.mixing(Fluid.of('createdieselgenerators:plant_oil',500),
        [Ingredient.of('#c:seeds',4)],90)
        .heated().id('mixing/seed_oil')
    //生物柴油
    e.recipes.create.mixing(Fluid.of('createdieselgenerators:biodiesel',200),
        [Fluid.of('createdieselgenerators:plant_oil',100),Fluid.of('createdieselgenerators:ethanol',100)],90)
        .id('mixing/biodiesel')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('createdieselgenerators:biodiesel',500),
        [Fluid.of('createdieselgenerators:plant_oil',200),Fluid.of('createdieselgenerators:ethanol',200)],90)
        .heated().id('pressurizing/biodiesel_0')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('createdieselgenerators:biodiesel',500),
        Fluid.of('createdieselgenerators:plant_oil',200),90).secondaryFluidInput(Fluid.of('createdieselgenerators:ethanol',200))
        .heated().id('pressurizing/biodiesel_1')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('createdieselgenerators:biodiesel',500),
        Fluid.of('createdieselgenerators:ethanol',200),90).secondaryFluidInput(Fluid.of('createdieselgenerators:plant_oil',200))
        .heated().id('pressurizing/biodiesel_2')

    //原油再生
    e.recipes.vintageimprovements.pressurizing([Fluid.of('createdieselgenerators:crude_oil',200)],
        [Fluid.of('createdieselgenerators:plant_oil',200)],125).secondaryFluidInput(Fluid.of('mekanism:hydrogen',100))
        .heated().id('pressurizing/crude_oil/seed_oil')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('createdieselgenerators:crude_oil',200)],
        [Fluid.of('kubejs:tar',100)],125).secondaryFluidInput(Fluid.of('mekanism:hydrogen',100))
        .heated().id('pressurizing/crude_oil/tar')
    e.recipes.vintageimprovements.pressurizing([Fluid.of('createdieselgenerators:crude_oil',200)],
        [Fluid.of('minecraft:water',200),'mekanism:dust_coal'],125).secondaryFluidInput(Fluid.of('mekanism:hydrogen',100))
        .heated().id('pressurizing/crude_oil/coal')
    

    //充能玫瑰茶途径
    e.recipes.create.mixing([Fluid.of('delighto_flight:charged_rose_tea',250),'ae2:certus_quartz_crystal'],
        [Fluid.of('minecraft:water',250),'ae2:charged_certus_quartz_crystal','minecraft:rose_bush','minecraft:sugar'])
        .heated().id('mixing/delighto_flight/charged_rose_tea')
    //福鲁伊克斯汽油
    e.recipes.vintageimprovements.pressurizing([Fluid.of('kubejs:fluix_gasoline',250),Fluid.of('minecraft:water',250)],
        [Fluid.of('createdieselgenerators:gasoline',250),'ae2:fluix_dust'],125).secondaryFluidInput(Fluid.of('delighto_flight:charged_rose_tea',250))
        .heated().id('pressurizing/fluix_gasoline')
    e.recipes.create.mixing([Fluid.of('kubejs:fluix_gasoline',500),CreateItem.of('ae2:fluix_pearl',0.85)],
        [Fluid.of('createdieselgenerators:gasoline',500),'ae2:fluix_pearl','ae2:fluix_dust'],60)
        .superheated().id('mixing/fluix_gasoline')


    //利用燃料生产红石
    let redstone_fuel = [
        ['createdieselgenerators:plant_oil',250],
        ['createdieselgenerators:ethanol',200],
        ['createdieselgenerators:biodiesel',50],
        ['createdieselgenerators:gasoline',50],
        ['createdieselgenerators:diesel',50],
        ['kubejs:wood_gas',100],
        ['kubejs:lpg',50],
        ['kubejs:fluix_gasoline',25],
        ['kubejs:ammonia',40]

    ]
    redstone_fuel.forEach(element=>{
        let [fuel,amount] = element
        e.recipes.create.filling('minecraft:redstone',['create:cinder_flour',Fluid.of(fuel,amount)])
            .id('filling/redstone/'+fuel.replace(':','/'))
        e.recipes.vintageimprovements.pressurizing('4x minecraft:redstone',
            '4x create:cinder_flour',90).secondaryFluidInput(Fluid.of(fuel,amount*4))
            .heated().id('pressurizing/redstone/'+fuel.replace(':','/'))
    })
    //利用燃料生产荧石
    let glowstone_fuel = [
        ['createdieselgenerators:biodiesel',50],
        ['kubejs:fluix_gasoline',25],
        ['kubejs:ammonia',40]
    ]
    glowstone_fuel.forEach(element=>{
        let [fuel,amount] = element
        e.recipes.create.filling('minecraft:glowstone_dust',['minecraft:redstone',Fluid.of(fuel,amount)])
            .id('filling/glowstone/'+fuel.replace(':','/'))
        e.recipes.vintageimprovements.pressurizing('4x minecraft:glowstone_dust',
            '4x minecraft:redstone',290).secondaryFluidInput(Fluid.of(fuel,amount*4))
            .heated().id('pressurizing/glowstone/'+fuel.replace(':','/'))
    })

    //润滑油
    e.recipes.vintageimprovements.pressurizing(Fluid.of('kubejs:lube',250),
        [Fluid.of('createdieselgenerators:diesel',250)],60)
        .secondaryFluidInput(Fluid.of('mekanism:sulfur_dioxide',250))
        .heated().id('pressurizing/lube_1')
    e.recipes.vintageimprovements.pressurizing(Fluid.of('kubejs:lube',250),
        [Fluid.of('createdieselgenerators:diesel',250)],60)
        .secondaryFluidInput(Fluid.of('mekanism:hydrogen',250))
        .heated().id('pressurizing/lube_2')

    
    
})