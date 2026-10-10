PlayerEvents.chat(e=>{
    let {server,level,player,message} = e

    if(message.includes('牛来')){
        level.runCommandSilent(`/execute as @e[type=cow,limit=1] run say 妈妈`)
        level.runCommandSilent(`/tp @e[type=cow,limit=2,sort=nearest] ${player.getName().string}`)
    }else if(message.includes('妈妈')){
        server.scheduleInTicks(2,c=>{player.tell('牛来！')})
        level.runCommandSilent(`/tp @e[type=cow,limit=2,sort=nearest] ${player.getName().string}`)
    }
})
