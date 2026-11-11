MBDMachineEvents.onBeforeRecipeModify('mbd2:thermoelectric_generator',e=>{
    const machine = e.getEvent().machine
    const level = machine.level
    let facing = machine.getFrontFacing().orElse($Direction.NORTH)
    let burner_count = 5 //未来会修改
    
})