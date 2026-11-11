BlockEvents.rightClicked(e=>{
    let {block,hand,player} = e
    if(hand != 'MAIN_HAND')return

    let value = 0
    let heat
    switch(block.id){
        case('create:blaze_burner'):
            heat = block.properties.get('blaze')
            if (heat == 'kindled') {
                value = 1
            } else if (heat == 'seething') {
                value = 2
            }
        break
        case('createdieselgenerators:burner'):
            heat = block.getEntityData().getFloat('Heat')
            if(heat == -1) value=0
            else value = heat/0.9
            //限制强度
            //if(value>5) value = Math.max(5,Math.log2(value)*2)
        break
        //这两个一起
        case('createpropulsion:liquid_burner'):
        case('createpropulsion:solid_burner'):
            let heatbuffer = block.getEntityData().getCompound('HeatBuffer')
            let capacity = heatbuffer.getFloat('Capacity')
            heat = heatbuffer.getFloat('Heat')
            value = heat/capacity/0.33
        break
        default:
            value = 0
    }
    //player.tell(value)
})
