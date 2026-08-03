
PlayerEvents.chat(e=>{
    let message = e.getMessage()
    let player = e.player
    let item = e.player.getMainHandItem()
    let block =item.block
    let registryAccess = e.player.level.registryAccess()
    let blockRegistry = registryAccess.registry('block')
    
    //let registries = registryAccess.registries().toList()
    //registries.forEach(element=>{
    //    console.log(element)
    //})
    //sable:physics_block_properties
    // let sableproperties = registryAccess.registry('sable:physics_block_properties').get()
    // console.log(sableproperties)
    

    if(message.search('#')==1){
        let tag = message.slice(2,-1)
        blockRegistry.get().forEach(element =>{
            if(element.hasTag(tag)){
                player.tell(Text.of(element).clickCopy(element).hover('右键复制'))
            }
        })
    }
})
