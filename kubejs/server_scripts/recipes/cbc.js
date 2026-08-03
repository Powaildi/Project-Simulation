
ServerEvents.recipeSchemaRegistry(e=>{
    let a = {
  "neoforge:conditions": [
    {
      "type": "neoforge:not",
      "value": {
        "type": "neoforge:tag_empty",
        "tag": "c:storage_blocks/bronze"
      }
    }
  ],
  "type": "createbigcannons:melting",
  "heat_requirement": "heated",
  "ingredients": [
    {
      "tag": "c:storage_blocks/bronze"
    }
  ],
  "processing_time": 1620,
  "results": [
    {
      "amount": 810,
      "id": "createbigcannons:molten_bronze"
    }
  ]
}

})
ServerEvents.recipes(e=>{
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

    let stonemetals = [
        ['create:crimsite','minecraft:iron_ingot'],
        ['create:veridium','minecraft:copper_ingot'],
        ['create:ochrum','minecraft:gold_ingot'],
        ['create:asurine','create:zinc_ingot']
    ]
    stonemetals.forEach(element =>{
        let [stone,metal] = element
        e.custom(
            {
            "type": "createbigcannons:melting",
            "heat_requirement": "heated",
            "ingredients": [
                {
                "item": stone
                }
            ],
            "processing_time": 10,
            "results": [
                {
                "amount": 1,
                "id": metal
                }
            ]
            }
        ).id('melting/'+stone.replace(':','/'))
    })

    //弹簧丝
    e.remove({id:'createbigcannons:cutting/spring_wire_iron'})
    e.replaceInput({id:'createbigcannons:sequenced_assembly/recoil_spring'},'createbigcannons:spring_wire','simulated:spring')

    //弹药冲压板
    e.remove({id:'createbigcannons:cutting/autocannon_cartridge_sheet_iron'})
    e.remove({output:'createbigcannons:big_cartridge_sheet'})
    e.shapeless('2x createbigcannons:big_cartridge_sheet','2x create:brass_sheet')
      .id('crafting/createbigcannons/big_cartridge_sheet')
})
