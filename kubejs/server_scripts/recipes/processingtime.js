const mixing_map = new Map()


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

        //e.custom(json).id(id)
    })

    let mixing = e.findRecipes({type:'create:mixing',not:{mod:'createdieselgenerators'}})
    mixing.forEach(element =>{
        let processing_time = element.get('processing_time')
        if(processing_time != null){
            //console.log(element.getId()+'____'+processing_time)
        }else{
            element.set('processing_time',90)
            //e.custom(element.json).id(element.getId())         
        }
    })

    let centrifugation = e.findRecipes({type:'vintageimprovements:centrifugation'})
    centrifugation.forEach(element =>{
        let processing_time = element.get('processing_time')
        if(processing_time != 1000){
            //console.log(element.getId()+'____'+processing_time)
        }else{
            element.set('processing_time',250)
            //e.custom(element.json).id(element.getId())         
        }
    })
    
})
