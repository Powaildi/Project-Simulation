MBDMachineEvents.onTick('mbd2:air_compressor',e=>{
    let event = e.getEvent()
    let machine = event.machine
    let {pos,level} = machine
    let sablepos = Sable.projectOutOfSubLevel(level,pos)
    let contact_void = sablepos.y()<=-40
    machine.setCustomData({'contact_void':contact_void})
})