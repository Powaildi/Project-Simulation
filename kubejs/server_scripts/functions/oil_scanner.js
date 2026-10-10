ItemEvents.rightClicked('createdieselgenerators:oil_scanner',e=>{
    let {player,level,server} = e
    server.scheduleInTicks(20,()=>{
        level.runCommand(`/execute as ${player.getName().string} run cdg oil get`)
    })
})