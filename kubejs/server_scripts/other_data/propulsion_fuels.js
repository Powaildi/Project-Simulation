ServerEvents.generateData('after_mods',event => {
  // Prevent duplicate registrations on script reloads.
  ThrusterFuelManager.clearScriptedFuels()


  // ThrusterFuelManager.registerScriptedFuel('createpropulsion:turpentine', {
  //   thrustMultiplier: 1.2,
  //   consumptionMultiplier: 0.8,
  //   particle: 'plasma'
  // })
  
  ThrusterFuelManager.registerScriptedFuel('kubejs:wood_gas', {
    thrustMultiplier: 1.1,
    consumptionMultiplier: 1.6,
    particle: 'plume'
  })

  ThrusterFuelManager.registerScriptedFuel('kubejs:lpg', {
    thrustMultiplier: 1.34985, //稍微多一点就能从被动变成超级加热
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

  // // Example with custom textures + RGB tint.
  // ThrusterFuelManager.registerScriptedFuel('minecraft:water', {
  //   thrust_multiplier: 0.05,
  //   consumptionMultiplier: 1.0,
  //   particle: 'plume',
  //   overrideTextures: ['createpropulsion:plume_0', 'createpropulsion:plume_1'],
  //   useFluidColor: true
  // })

  // ThrusterFuelManager.registerScriptedFuel('kubejs:lube', {
  //   thrustMultiplier: 0.8,
  //   consumptionMultiplier: 1.0,
  //   particle: 'plume',
  //   overrideTextures: ['createpropulsion:plume_0', 'createpropulsion:plume_1'],
  //   overrideColor: '#7EEB5D'
  // })

  // Override existing fuel behavior explicitly.
  ThrusterFuelManager.overrideFuel('minecraft:lava', {
    thrustMultiplier:0.44975, //稍微多一点就能从被动变成加热
    consumptionMultiplier: 0.44,
    particle: 'plume'
  })
  
  ThrusterFuelManager.overrideFuel('createdieselgenerators:biodiesel',{
    thrustMultiplier:1.4, 
    consumptionMultiplier: 1.1,
    particle: 'plume'
  })


  //Remove a fuel entirely.
  ThrusterFuelManager.removeFuel('minecraft:water')
  //ThrusterFuelManager.removeFuel('minecraft:lava')
})
