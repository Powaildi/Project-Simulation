//初始化值，每次加载存档都会初始化，如果要搞生存挑战请直接修改脚本
let allow_modify = false //只影响玩家是否通过物品操作以下变量
let bounce_time = 0
let tnt_mode = true
let fission_mode = false
let strength = 1

let players = new Set()

function search(list,target){//集合疑似已经残废，用这个代替
    let result = false
    list.forEach(element=>{
        if(element==target){
            result = true
        }
    })
    return result
}

//总开关，以免误触
ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;
    event.register(
        Commands.literal('allowbounce')
            .requires(source => source.hasPermission(2))//需要管理员权限
            .executes(context=>{
                allow_modify = !allow_modify
                if(allow_modify){
                    bounce_time = -1
                }else{
                    bounce_time = 0
                }
                const player = context.source.getPlayer()
                player.tell(Text.green(`允许修改弹弹时间：${allow_modify}`))
                player.tell(Text.green(`永恒弹弹时间：${bounce_time<0}`))
                player.tell(Text.red(`TNT爆炸模式：${tnt_mode}(TNT落地爆炸，只有TNT多次弹)`))
                player.tell(Text.lightPurple(`分裂繁殖模式：${fission_mode}(仅对巨型铁砧有效)`))
                player.tell(Text.red(`强度：${strength}(弹性和爆炸强度)`))
                return 1
            })
    );
});
//使用方式提示
ItemEvents.modifyTooltips(e=>{
    e.add('minecraft:slime_block',{shift:true},Text.green('切换永恒弹弹模式'))
    e.add('minecraft:slime_ball',{shift:true},Text.green('弹弹时间+60秒'))
    e.add('minecraft:tnt',{shift:true},Text.red('弹弹时间-切换TNT爆炸模式'))
    e.add('minecraft:gunpowder',{shift:true},Text.red('弹弹时间-根据手持的数量调整强度，丢出时爆炸'))
    e.add('minecraft:anvil',{shift:true},Text.lightPurple('弹弹时间-切换分裂繁殖模式'))
    e.add('minecraft:dispenser',{shift:true},Text.lightPurple('弹弹时间-将现存的掉落物发射为下落的方块'))
    e.add(['minecraft:slime_block','minecraft:slime_ball','minecraft:tnt','minecraft:gunpowder','minecraft:anvil','minecraft:dispenser'],
        {alt:true},[Text.blue('弹弹时间相关物品：'),Text.blue('黏液块、黏液球、TNT、火药、铁砧、发射器')]
    )
})
//右键事件
ItemEvents.rightClicked('minecraft:slime_block',e=>{
    let player = e.player
    if(!allow_modify){
        player.tell(Text.yellow('现在不允许修改弹弹时间，请输入/allowbounce来切换状态').clickRunCommand('/allowbounce').hover('左键直接运行该指令'))
        return
    }
    bounce_time = -bounce_time-1
    player.tell(Text.green(`永恒弹弹时间：${bounce_time<0}`))
    console.log(bounce_time)
    if(!search(players,player)){
        players.add(player)//你真的是集合吗？怎么能加重复元素
    }
})
ItemEvents.rightClicked('minecraft:slime_ball',e=>{
    let player = e.player
    if(!allow_modify){
        //player.tell(Text.yellow('现在不允许得到弹弹时间，请输入/allowbounce来切换状态').clickRunCommand('/allowbounce'))
        return
    }
    bounce_time =Math.max(0,bounce_time)
    bounce_time += 1200
    player.tell(Text.green(`你现在有${bounce_time/20}秒的弹弹时间，快去制造掉落的方块吧！`))
    if(!search(players,player)){
        players.add(player)
    }
})
ItemEvents.rightClicked('minecraft:tnt',e=>{
    let player = e.player
    if(!allow_modify){
        return
    }
    tnt_mode = !tnt_mode
    player.tell(Text.red(`弹弹时间-TNT爆炸模式：${tnt_mode}(TNT落地爆炸，只有TNT多次弹)`))
    if(tnt_mode){
        player.tell(Text.red(`TNT落地爆炸，且只有TNT多次弹`))
    }else{
        player.tell(Text.red(`TNT落地不爆炸`))
    }
})
ItemEvents.rightClicked('minecraft:anvil',e=>{
    let player = e.player
    if(!allow_modify){
        return
    }
    fission_mode = !fission_mode
    player.tell(Text.lightPurple(`弹弹时间-分裂繁殖模式：${fission_mode}(仅对巨型铁砧有效)`))
})
ItemEvents.rightClicked('minecraft:dispenser',e=>{
    if(!bounce_time)return
    let entities = e.level.getEntities()
    entities.forEach(entity=>{
        if(entity.type=='minecraft:item'){
            entity.spawn()
        }
    })
    e.player.tell(Text.lightPurple('现存的掉落物已起飞！'))
})
ItemEvents.rightClicked('minecraft:gunpowder',e=>{
    strength = e.item.getCount()
    e.player.tell(Text.red(`弹弹时间-强度：${strength}(弹性和爆炸强度)`))
})

//播报
ServerEvents.tick(e=>{
    if(!bounce_time)return
    bounce_time = Math.max(bounce_time-1,-1)
    //提醒
    if(bounce_time<2000&&bounce_time){
        if(bounce_time%200)return
        players.forEach(player=>{
            player.tell(Text.green(`弹弹时间剩余${bounce_time/20}秒`))
        })
    }
    

    if(!bounce_time){
        players.forEach(player=>{
            player.tell(Text.green('弹弹时间结束'))
        })
        players.clear()
    }
})

//掉落重生
BlockEvents.stoppedFalling(e=>{
    if(!bounce_time)return
    let block = e.block
    let {x,y,z} = block.pos
    if((block.getUp()=='minecraft:air')||1){

        if(!(block.id=='minecraft:tnt')&&tnt_mode)return//只让tnt跳
        if(block.id=='minecraft:tnt'&&tnt_mode){
            e.level.explode(null,null,null,block.pos,2*strength,false,'tnt')
        }
        block.popItem(block.item)
        block.set('minecraft:air')
    }
    //巨型铁砧不触发这个事件，不能再弹，因此采取被动再触发方案
    if(block.getDown()=='anvilcraft:giant_anvil'){
        let block2 = block.getDown()
        if(fission_mode){
            block2.popItem(block2.item)//分裂
        }
        block2.set('minecraft:air')
    }
    
})

//从物品变成别的
EntityEvents.spawned('minecraft:item',e=>{
    if(!bounce_time)return
    let item = e.entity.getItem()
    let block = item.getBlock()
    let pos = e.entity.onPos
    let aboveblock = e.level.getBlock(pos.above(1))
    //火药爆炸
    if(item=='minecraft:gunpowder'&&tnt_mode){
            e.level.explode(null,null,null,pos,4*strength,false,'tnt')
        }

    if(block==null){
        //console.log(item)
        return
    }

    // if(!(aboveblock=='minecraft:air'))return
    while(!(aboveblock=='minecraft:air')&&pos.y<=320){
        pos = pos.above(1)
        aboveblock = e.level.getBlock(pos.above(1))
    }

    for(let i=item.getCount();i>0;i--){
        //巨型铁砧
        if(item=='anvilcraft:giant_anvil'){
            e.level.spawnEntity('anvilcraft:falling_giant_anvil',entity=>{
                entity.setPos(pos)
                entity.mergeNbt({
                BlockState:{Name:'anvilcraft:giant_anvil',
                    Properties:{
                        half:'mid_center',
                        cube:'center'
                    }}
                })
            })
            continue
        }
        //正常情况
        e.level.spawnEntity('minecraft:falling_block',entity=>{
            entity.setPos(pos)
            entity.mergeNbt({
                BlockState:{Name:block.id}
            })
        })
        
        
    }
    e.entity.kill()
    e.cancel()
})

//掉落方块出生效果
EntityEvents.spawned('minecraft:falling_block',e=>{
    if(!bounce_time)return
    let entity = e.entity
    entity.mergeNbt({
        FallHurtAmount: 3.0,
        FallHurtMax: 100,
        HurtEntities:1
    })
    entity.addMotion(Math.random()-0.5,(Math.random()+0.5)*Math.max(strength*0.1,1),Math.random()-0.5)
    let {x,y,z} = entity.onPos
    e.level.runCommandSilent(`/playsound minecraft:block.anvil.land voice @a ${x} ${y} ${z} 1 1`)
    e.level.runCommandSilent(`/particle minecraft:firework ${x} ${y+0.2} ${z} 0 0 0 0.1 30 force @a`)
    
})

if(Platform.isLoaded('anvilcraft')){
//掉落巨型铁砧出生效果
EntityEvents.spawned('anvilcraft:falling_giant_anvil',e=>{
    if(!bounce_time)return
    let entity = e.entity
    entity.mergeNbt({
        FallHurtAmount: 3.0,
        FallHurtMax: 100,
        HurtEntities:1
    })
    entity.addMotion(Math.random()-0.5,(Math.random()+0.5)*strength,Math.random()-0.5)
    let {x,y,z} = entity.onPos
    e.level.runCommandSilent(`/playsound minecraft:block.anvil.land voice @a ${x} ${y} ${z} 1 0.1`)
    e.level.runCommandSilent(`/particle minecraft:firework ${x} ${y+0.2} ${z} 0 0 0 0.1 30 force @a`)
    
})
}
