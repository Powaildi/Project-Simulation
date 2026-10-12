LiquidFuel.modify(e=>{
    e.modify('minecraft:lava').burnTime(1).consumedPerTick(1001)

    e.create('kubejs:ammonia').burnTime(30).consumedPerTick(3).superHeats(true)
    e.create('kubejs:fluix_gasoline').burnTime(20).consumedPerTick(1).superHeats(true)
    e.create('createdieselgenerators:biodiesel').burnTime(15).consumedPerTick(3).superHeats(true)
    e.create('mekanism:hydrogen').burnTime(10).consumedPerTick(5).superHeats(true)

    e.create('createdieselgenerators:diesel').burnTime(20).consumedPerTick(1)
    e.create('createdieselgenerators:ethanol').burnTime(10).consumedPerTick(3)
    e.create('createdieselgenerators:gasoline').burnTime(20).consumedPerTick(1)
    e.create('kubejs:lpg').burnTime(30).consumedPerTick(3)
    e.create('kubejs:refined_oil').burnTime(15).consumedPerTick(1)
    e.create('kubejs:wood_gas').burnTime(10).consumedPerTick(2)


})