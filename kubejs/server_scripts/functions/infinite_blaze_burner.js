BlockEvents.rightClicked('create:blaze_burner',e=>{
    let item = e.player.getMainHandItem()
    let block = e.block
    
    if(block.getEntityData().contains('isCreative')==true){
        return
    }
    if(item=='kubejs:infinite_heat_bar'){
        block.setBlockState('create:blaze_burner[blaze=kindled]',1)
    }else if(item=='kubejs:infinite_superheat_bar'){
        block.setBlockState('create:blaze_burner[blaze=seething]',1)
    }else{
        return//如果都不是，就直接结束
    }
    //播放声音应该使用player.playNotifySound，而不是player.playSound
    e.player.playNotifySound('minecraft:entity.blaze.shoot','blocks',0.2,0.1)
    item.setCount(item.getCount()-1)
    block.setEntityData({isCreative:1})
    
})

//废弃代码，因为用扳手拆就不掉，已在数据包实现
// BlockEvents.broken('create:blaze_burner',e=>{
//     let block = e.block
//     if(block.getEntityData().contains('isCreative')==false){
//         return//不是无限就结束
//     }
//     let info = block.getBlockState().toString()

//     if(info.search('kindled') != -1){//加热
//         block.popItem('kubejs:infinite_heat_bar')
//     }
//     if(info.search('seething') != -1){//超级加热
//         block.popItem('kubejs:infinite_superheat_bar')
//     }
// })
