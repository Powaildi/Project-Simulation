

ServerEvents.recipes(e=>{
    //删除吸管和cca的吸管烈焰人燃烧室
    e.remove({output:'createaddition:straw'})
    e.remove({type:'createaddition:liquid_burning'})

    
})

//液体燃料，这部分无效
let liquidfuel = [
    ['createdieselgenerators:gasoline',24,true,1],


]
liquidfuel.forEach(element=>{
    let [fluid,burntime,superheat,amountConsumedPerTick] = element

    ServerEvents.generateData('after_mods',e=>{
        e.json('createliquidfuel',{
            
            "fluid": fluid,
            "burnTime": burntime,
            "superHeat": superheat,
            "amountConsumedPerTick" : amountConsumedPerTick
           
        })
    })

})
    
