
ServerEvents.recipes(e=>{
    //修改配方时间

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
