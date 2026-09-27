FTBQuestsEvents.completed('659367C711A57B46',e=>{
    //第一章的第一个电路板
    //完成：从未拿到禁用物品
    let player = e.player
    let level = player.level
    level.runCommandSilent(`/ftbquests change_progress ${player.getName().string} complete 5FE39298C63104FA`)
})
FTBQuestsEvents.completed('63A6056E1032B84F',e=>{
    //禁用物品
    let player = e.player
    let level = player.level
    level.runCommandSilent(`/ftbquests change_progress ${player.getName().string} reset 5FE39298C63104FA`)
})