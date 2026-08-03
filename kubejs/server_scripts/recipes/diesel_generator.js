ServerEvents.recipes(e=>{
    //去除剪线配方
    e.remove({type:'createdieselgenerators:wire_cutting'})
    //去除植物油配方
    e.remove({id:'createdieselgenerators:compacting/plant_oil'})
    //改变大发酵罐配方
    e.replaceInput({id:'createdieselgenerators:crafting/bulk_fermenter'},'create:andesite_alloy','createdeco:industrial_iron_sheet')
    //焦油用途
    e.replaceInput({id:'createdieselgenerators:crafting/asphalt_block'},'createdieselgenerators:crude_oil_bucket',
        Ingredient.of(['kubejs:tar_bucket','createdieselgenerators:crude_oil_bucket']))

    //批量发酵

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
    
})
