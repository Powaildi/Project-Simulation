ServerEvents.generateData('after_mods',event => {
  // Prevent duplicate registrations on script reloads.
  ThrusterFuelManager.clearScriptedFuels()


  ThrusterFuelManager.registerScriptedFuel('createpropulsion:turpentine', {
    thrustMultiplier: 1.2,
    consumptionMultiplier: 0.8,
    particle: 'plasma'
  })
  
  ThrusterFuelManager.registerScriptedFuel('kubejs:wood_gas', {
    thrustMultiplier: 1.0,
    consumptionMultiplier: 1.0,
    particle: 'plume'
  })

  ThrusterFuelManager.registerScriptedFuel('kubejs:lpg', {
    thrustMultiplier: 1.4,
    consumptionMultiplier: 0.8,
    particle: 'plasma'
  })

  ThrusterFuelManager.registerScriptedFuel('kubejs:refined_oil', {
    thrustMultiplier: 0.9,
    consumptionMultiplier: 0.6,
    particle: 'plume'
  })

  ThrusterFuelManager.registerScriptedFuel('kubejs:ammonia', {
    thrustMultiplier: 1.8,
    consumptionMultiplier: 1.6,
    particle: 'plasma'
  })

  ThrusterFuelManager.registerScriptedFuel('kubejs:fluix_gasoline', {
    thrustMultiplier: 1.6,
    consumptionMultiplier: 0.4,
    particle: 'plasma'
  })

  // Example with custom textures + RGB tint.
  ThrusterFuelManager.registerScriptedFuel('minecraft:water', {
    thrustMultiplier: 0.05,
    consumptionMultiplier: 1.0,
    particle: 'plume',
    overrideTextures: ['createpropulsion:plume_0', 'createpropulsion:plume_1'],
    useFluidColor: true
  })

  ThrusterFuelManager.registerScriptedFuel('kubejs:lube', {
    thrustMultiplier: 0.8,
    consumptionMultiplier: 1.0,
    particle: 'plume',
    overrideTextures: ['createpropulsion:plume_0', 'createpropulsion:plume_1'],
    overrideColor: '#7EEB5D'
  })
  // Override existing fuel behavior explicitly.
  ThrusterFuelManager.overrideFuel('minecraft:lava', {
    thrustMultiplier: 0.6,
    consumptionMultiplier: 1.0,
    particle: 'plume'
  })



  // Remove a fuel entirely.
  //ThrusterFuelManager.removeFuel('minecraft:water')
  
})
