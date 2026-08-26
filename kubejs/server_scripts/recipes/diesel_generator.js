ServerEvents.recipes(e=>{
    //改变大发酵罐配方
    e.replaceInput({id:'createdieselgenerators:crafting/bulk_fermenter'},'create:andesite_alloy','createdeco:industrial_iron_sheet')
    //焦油用途
    e.replaceInput({id:'createdieselgenerators:crafting/asphalt_block'},'createdieselgenerators:crude_oil_bucket',
        Ingredient.of(['kubejs:tar_bucket','createdieselgenerators:crude_oil_bucket']))
    e.recipes.create.mixing('4x createdieselgenerators:asphalt_block',
        ['2x minecraft:gravel','2x minecraft:sand',Fluid.of('kubejs:tar',100)])
        .id('mixing/createdieselgenerators/asphalt_block')
    
//工作盆发酵
    e.custom({
        "type": "createdieselgenerators:basin_fermenting",
        "ingredients": [
            {"item": 'minecraft:bone_meal'},
            {"item": 'minecraft:bone_meal'},
            {"item": 'minecraft:bone_meal'},
            {
            "type": "fluid_stack",
            "fluid": "create:potion",
            "components": {
                "minecraft:potion_contents": {
                "potion": "minecraft:mundane"
                }
            },
            "amount": 50
            }
        ],
        "processing_time": 60,
        "results": [
            {"id": 'minecraft:bone',"count":3}
        ]
    }).id('basin_fermenting/bone')
//   "heat_requirement": "heated",
    //乙醇
    e.remove({id:'createdieselgenerators:basin_fermenting/fermentable'})
    e.remove({id:'createdieselgenerators:bulk_fermenting/fermentable'})

    e.custom({
        "type": "createdieselgenerators:basin_fermenting",
        "ingredients": [
            {"tag": 'createdieselgenerators:fermentable'},
            {"item": 'createdieselgenerators:wood_chip'},
            {
            "type": "fluid_stack",
            "fluid": "minecraft:water",
            "amount": 200
            }
        ],
        "processing_time": 400,
        "results": [
            {
            "id": "createdieselgenerators:ethanol",
            "amount": 200
            }
        ]
    }).id('basin_fermenting/ethanol')
    
//批量发酵
    e.custom({
        "type": "createdieselgenerators:bulk_fermenting",
        "ingredients": [
            {"tag": 'createdieselgenerators:fermentable'},
            {"item": 'createdieselgenerators:wood_chip'},
            {
            "type": "fluid_stack",
            "fluid": "minecraft:water",
            "amount": 300
            }
        ],
        "processing_time": 300,
        "results": [
            {
            "id": "createdieselgenerators:ethanol",
            "amount": 300
            }
        ]
    }).id('bulk_fermenting/ethanol')

// {
//   "type": "createdieselgenerators:bulk_fermenting",
//   "ingredients": [
//     {
//       "tag": "createdieselgenerators:fermentable"
//     },
//     {
//       "item": "minecraft:bone_meal"
//     }
//   ],
//   "processing_time": 400,
//   "results": [
//     {
//       "id": "createdieselgenerators:ethanol",
//       "amount": 400
//     }
//   ]
// }
//分馏
    //3层
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_tag",
            "fluid_tag": "c:crude_oil",
            "amount": 200
            }
        ],
        "heat_requirement": "heated",
        "processing_time": 120,
        "results": [
            {
            "id": "createdieselgenerators:diesel",
            "amount": 100
            },
            {
            "id": "createdieselgenerators:gasoline",
            "amount": 100
            },
            {
            "id": "kubejs:lpg",
            "amount": 50
            }
        ]
    }).id('distillation/crude_oil/3_layer')
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_tag",
            "fluid_tag": "c:crude_oil",
            "amount": 200
            }
        ],
        "heat_requirement": "superheated",
        "processing_time": 80,
        "results": [
            {
            "id": "createdieselgenerators:diesel",
            "amount": 150
            },
            {
            "id": "createdieselgenerators:gasoline",
            "amount": 150
            },
            {
            "id": "kubejs:lpg",
            "amount": 100
            }
        ]
    }).id('distillation/crude_oil/3_layer_superheated')
    //4层
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_tag",
            "fluid_tag": "c:crude_oil",
            "amount": 200
            }
        ],
        "heat_requirement": "heated",
        "processing_time": 120,
        "results": [
            {
            "id": "kubejs:tar",
            "amount": 50
            },
            {
            "id": "createdieselgenerators:diesel",
            "amount": 100
            },
            {
            "id": "createdieselgenerators:gasoline",
            "amount": 100
            },
            {
            "id": "kubejs:lpg",
            "amount": 50
            }
        ]
    }).id('distillation/crude_oil/4_layer')
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_tag",
            "fluid_tag": "c:crude_oil",
            "amount": 200
            }
        ],
        "heat_requirement": "superheated",
        "processing_time": 80,
        "results": [
            {
            "id": "kubejs:tar",
            "amount": 100
            },
            {
            "id": "createdieselgenerators:diesel",
            "amount": 150
            },
            {
            "id": "createdieselgenerators:gasoline",
            "amount": 150
            },
            {
            "id": "kubejs:lpg",
            "amount": 100
            }
        ]
    }).id('distillation/crude_oil/4_layer_superheated')
    //精炼油

    //液态空气
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_stack",
            "fluid": "kubejs:liquid_air",
            "amount": 1000
            }
        ],
        "heat_requirement": "heated",
        "processing_time": 180,
        "results": [
            {
            "id": "mekanism:oxygen",
            "amount": 200
            },
            {
            "id": "kubejs:nitrogen",
            "amount": 800
            }
        ]
    }).id('distillation/liquid_air')
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_stack",
            "fluid": "kubejs:liquid_air",
            "amount": 1000
            }
        ],
        "heat_requirement": "superheated",
        "processing_time": 60,
        "results": [
            {
            "id": "mekanism:oxygen",
            "amount": 200
            },
            {
            "id": "kubejs:nitrogen",
            "amount": 800
            }
        ]
    }).id('distillation/liquid_air_superheated')
    //液态下界空气
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_stack",
            "fluid": "kubejs:liquid_nether_air",
            "amount": 2000
            }
        ],
        "heat_requirement": "heated",
        "processing_time": 1800,
        "results": [
            {
            "id": "mekanism:sulfur_trioxide",
            "amount": 200
            },
            {
            "id": "mekanism:sulfur_dioxide",
            "amount": 400
            },
            {
            "id": "kubejs:nitrogen_dioxide",
            "amount": 400
            },
            {
            "id": "mekanism:oxygen",
            "amount": 200
            },
            {
            "id": "kubejs:nitrogen",
            "amount": 800
            }
        ]
    }).id('distillation/nether_air')
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_stack",
            "fluid": "kubejs:liquid_nether_air",
            "amount": 2000
            }
        ],
        "heat_requirement": "superheated",
        "processing_time": 600,
        "results": [
            {
            "id": "mekanism:sulfur_trioxide",
            "amount": 200
            },
            {
            "id": "mekanism:sulfur_dioxide",
            "amount": 400
            },
            {
            "id": "kubejs:nitrogen_dioxide",
            "amount": 400
            },  
            {
            "id": "mekanism:oxygen",
            "amount": 200
            },
            {
            "id": "kubejs:nitrogen",
            "amount": 800
            }
        ]
    }).id('distillation/nether_air_superheated')
    //液态末地空气
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_stack",
            "fluid": "kubejs:liquid_end_air",
            "amount": 1000
            }
        ],
        "heat_requirement": "heated",
        "processing_time": 240,
        "results": [
            {
            "id": "mekanism:chlorine",
            "amount": 100
            },
            {
            "id": "mekanism:oxygen",
            "amount": 200
            },
            {
            "id": "kubejs:nitrogen",
            "amount": 600
            },
            {
            "id": "mekanism:hydrofluoric_acid",
            "amount": 100
            },
        ]
    }).id('distillation/end_air')
    e.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
            "type": "fluid_stack",
            "fluid": "kubejs:liquid_end_air",
            "amount": 1000
            }
        ],
        "heat_requirement": "superheated",
        "processing_time": 80,
        "results": [
            {
            "id": "mekanism:chlorine",
            "amount": 100
            },
            {
            "id": "mekanism:oxygen",
            "amount": 200
            },
            {
            "id": "kubejs:nitrogen",
            "amount": 600
            },
            {
            "id": "mekanism:hydrofluoric_acid",
            "amount": 100
            },
        ]
    }).id('distillation/end_air_superheated')
})
