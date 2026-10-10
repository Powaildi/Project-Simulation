

const common_convertable = [
    //这些转化不会复制属性
    //工业平台
    'minecraft:black_concrete', 'minecraft:white_concrete', 
    'minecraft:gray_concrete',  'minecraft:snow_block',
    //随意的转化
    'minecraft:light_gray_concrete','minecraft:diorite',
    'minecraft:deepslate', 'minecraft:stone',
    'minecraft:tinted_glass', 'minecraft:glass'
]
const high_value_convertable = [
    'create:ochrum', 'minecraft:raw_gold_block', 24, -8,
    'create:crimsite', 'minecraft:raw_iron_block', 24, -8,
    'create:veridium', 'minecraft:raw_copper_block', 24, -8,
    'create:asurine', 'create:raw_zinc_block', 24, -8,
    'mekanism:block_charcoal', 'minecraft:coal_block', 16, -8,
    'minecraft:slime_block', 'minecraft:honey_block', 16, -8,
    'create:rose_quartz_block','minecraft:quartz_block', -400, 400
]                                                       //黑块，白块，黑转白加的疲劳值，白转黑加的疲劳值，
const converting_fatigue_max = 1200                      //疲劳值瘫痪机制，到达这个数后就不能转化方块。疲劳值借助TicksFrozen计算

const boundary_convertable = [
    'minecraft:red_mushroom_block', 'minecraft:brown_mushroom_block', 
    'minecraft:redstone_block', 'minecraft:lapis_block'
]

const color_convertable = [
    'black','white',
    'gray','light_gray',
    //带light的会和不带的冲突，这种情况下，应该把带light的放在不带的后面
    'blue','orange',
    'brown','light_blue',//就像这样，否则会出现light_orange，因为匹配成功以后被改成了匹配失败的id
    'red','green',
    'purple','yellow',
    'magenta,','lime',
    'pink','cyan'
]
const color_temp = []

MEJSEvents.entityTick(e=>{
    let {level,entity} = e
    if(entity.getName().string != 'Ant')return
    let server = level.server
    if(server == null)return
    let ant = entity

    //读取蚂蚁窝
    let nestpos = ant.getPersistentData().getIntArray('nestpos')
    let nest = level.getBlock(nestpos[0],nestpos[1],nestpos[2])
    if(nest.id != 'mbd2:ant_nest'){
        ant.kill()
        nest.popItem('minecraft:armor_stand')
        return
    }
    
    //冷却和开关
    let stop = nest.entity.persistentData.getBoolean('stop')
    let move_cooldown = nest.entity.persistentData.getInt('cd')
    if(server.tickCount%move_cooldown || stop)return//实现冷却
    
    
    //蚂蚁行动 
    //旋转
    let on_block = level.getBlock(ant.onPos)
    let blockid = on_block.getId()
    //排除随机发生的踩到空气情况
    if(blockid=='minecraft:air'){
        on_block = on_block.getDown()
        blockid = on_block.getId()
        //console.log(blockid)
    }

    //转向方式
    let turn_mode = (() => {
        //空气
        if(blockid=='minecraft:air')return 3
        //细雪
        let TicksFrozen = ant.getTicksFrozen()
        if(TicksFrozen == 140)return 4
    //黑白转向规则
        //普通匹配
        let index = common_convertable.indexOf(blockid)
        if(index != -1){
            turn_mode = index%2
            //转化方块
            on_block.setBlockState(common_convertable[index^1])//最低位取反，两两交换
            return turn_mode
        }
        //高价值方块匹配
        index = high_value_convertable.indexOf(blockid)
        if(index != -1){
            turn_mode = index%2
            //瘫痪机制:需要借助TicksFrozen
            let fatigue_multiplier = ant.persistentData.getInt('paralyzed') || 2
            if(TicksFrozen <= converting_fatigue_max * fatigue_multiplier){
                //转化方块
                on_block.setBlockState(high_value_convertable[index^1])
                //添加的TicksFrozen即为冷却
                ant.setTicksFrozen(TicksFrozen+high_value_convertable[index+2]*2)//这里*2是因为TicksFrozen每tick减少2
                ant.persistentData.putInt('paralyzed',2)
            }else{
                ant.persistentData.putInt('paralyzed',1)
                return 4
            }
            return turn_mode
        }
        //切换方块状态匹配

        //保留方块状态匹配
        // index = keep_state_convertable.indexOf(blockid)
        // if(index != -1){
        //     turn_mode = index%2
        //     //转化方块
        //     let properties = String(on_block.getProperties()).replace('{','[').replace('}',']')
        //     on_block.setBlockState(keep_state_convertable[index^1]+properties)//最低位取反，两两交换
        //     return turn_mode
        // }
    //冰块滑行规则
        if(on_block.hasTag('minecraft:ice'))return 3
    //边界规则
        index = boundary_convertable.indexOf(blockid)
        if(index != -1){
            //转化方块
            on_block.setBlockState(boundary_convertable[index^1])//最低位取反，两两交换
            return 2
        }
    //黑白转向-通用颜色匹配
        //缓存
        index = color_temp.indexOf(blockid)
        if(index != -1){
            turn_mode = index%2
            //转化方块
            copyStateSwapBlock(on_block,color_temp[index^1])
            return turn_mode
        }
        //寻找
        let match_success = false
        let newid = 'minecraft:glass' //测试用，最终不应出现为这个
        
        color_convertable.forEach((element,index,array)=>{
            if(blockid.includes(element)){
                //寻找对位方块，需要排除像红沙这种没有对位的东西
                newid = blockid.replace(element,array[index^1])
                Item.findItem(newid).ifSuccess(()=>{
                    match_success = true
                    turn_mode = index%2
                    if(index%2){//匹配到后面
                        color_temp.push(newid)
                        color_temp.push(blockid)
                    }else{//匹配到前面
                        color_temp.push(blockid)
                        color_temp.push(newid)
                    }
                })
            }
        })
        
        if(match_success){
            //保留方块状态
            copyStateSwapBlock(on_block,newid)
            return turn_mode
        }
    
        //匹配失败
        return -1
    })()

    switch(turn_mode){
    //在白格上右转，在黑格上左转
    case(0):ant.setRotation(ant.yRotO%360+90,0)//计划为黑格
    break
    case(1):ant.setRotation(ant.yRotO%360+270,0)//计划为白格
    break
    case(2):ant.setRotation(ant.yRotO%360+180,0)//计划为边界
    break
    case(3)://计划为冰
    break
    case(4)://瘫痪
    level.spawnParticles('minecraft:snowflake',false,ant.xo,ant.yo+1,ant.zo,0.2,0.5,0.2,1,0)
    return
    break
    case(-1):
    ant.setRotation(ant.yRotO%360+180,0)//同边界
    break
    }
        
        let forward = ant.getForward()
        ant.move('self',forward)
        let blockpos = ant.blockPosition()
        let move_to_pos = [blockpos.x+0.5,ant.getY(),blockpos.z+0.5]//对齐网格
        ant.moveTo(move_to_pos)

})

EntityEvents.spawned('minecraft:armor_stand',e=>{
    let {entity} = e
    let name = entity.getName().string
    if(name.indexOf('Ant') == -1)return
    let nestpos = name.split(' ').slice(1).map(Number)
    if(nestpos[0] == undefined){
        //重加载
        if(entity.persistentData.get('nestpos') || false)return
        //非正规途径生成
        entity.block.popItem('minecraft:armor_stand')
        e.cancel()
        return
    }
    entity.setCustomName('Ant')
    entity.persistentData.putIntArray('nestpos',nestpos)
    entity.mergeNbt(
        {
            'ArmorItems':[
                {},{},{'count':1,'id':'minecraft:torch'},{'count':1,'id':'minecraft:turtle_helmet'}
            ]
            ,
            'attributes':[
                {'base':1,'id':"minecraft:generic.step_height"},
                {'base':1,'id':"minecraft:generic.movement_efficiency"},
                {'base':0,'id':"minecraft:friction_modifier"}
                
            ]
        }
    )
    
})
// ItemEvents.rightClicked('minecraft:armor_stand',e=>{
//     let data = e.getItem().components.getTyped('minecraft:custom_data')
//     if(data != null)let [x,y,z] = String(data.value()).split('nest:[I;').pop().split(']')[0].split(',')
//     let pos = [Number(x),Number(y),Number(z)]
//     let nest = e.level.getBlock(pos)
// })

/**
 * 替换方块，但是保留属性，需要是同类方块。
 * 
 * @param  on_block - 原始方块
 * @param {String} new_block - 新方块的id
 */
function copyStateSwapBlock(on_block,new_block){
    let properties = on_block.getProperties()
    if(properties.empty){
        properties = ''
    }else{
        properties = String(properties).replace('{','[').replace('}',']')
    }
    on_block.setBlockState(new_block+properties)//最低位取反，两两交换
}
