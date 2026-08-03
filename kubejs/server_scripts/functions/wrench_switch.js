
let convertable = [
    'create:wrench',
    'cmparallelpipes:pipe_wrench',
    'mekanism:configurator'
]

convertable.forEach((element,index)=>{
    index = (index+1)%convertable.length
    //Tooltip在item_tooltip.js
    ItemEvents.dropped(element,e=>{
        if(e.itemEntity.getNbt().get('Thrower')==null)return//任务给的没有Thrower，直接取消
        let components = e.item.getComponents() //复制物品属性 
        if(e.player.getMainHandItem() =='minecraft:air'){//如果手上没有就返回
            e.player.setMainHandItem(Item.of(convertable[index],1,components))
            //e.player.getMainHandItem().setAttackDamage(20) //神秘加强
            e.cancel() //取消掉落
        }else{//手上有物品就此修改掉落物
            e.itemEntity.setItem(Item.of(convertable[index],1,components))
        }
    })
})
