let $FarmlandWaterManager = Java.loadClass("net.neoforged.neoforge.common.FarmlandWaterManager");
let $Integer = Java.loadClass("java.lang.Integer");


MBDMachineEvents.onBeforeRecipeWorking('mbd2:sprinkler',e=>{
    let event = e.getEvent()

    let machine = event.getMachine()
    let {x,y,z} = machine.pos
    let level = machine.level

    let recipe = event.getRecipe()

    // 定义范围
    let range = Number(recipe.data.get('range')) //不转化为Number，水票的aabb会异常
    let height = 10                              //耕地多湿一格
    //水票用于湿润耕地
    let manager = $FarmlandWaterManager
    let aabb = AABB.ofBlocks([x-range,y-height,z-range],[x+range,y,z+range])
    let ticket = manager.addAABBTicket(level,aabb)

    level.server.scheduleInTicks(recipe.duration,c=>{
        ticket.invalidate()//时间过了就清除水票
    })

    level.runCommandSilent(`playsound minecraft:block.water.ambient block @a ${x} ${y} ${z} 1 1`)
})
MBDMachineEvents.onAfterRecipeWorking('mbd2:sprinkler',e=>{
    let event = e.getEvent()

    let machine = event.getMachine()
    let {x,y,z} = machine.pos
    let level = machine.level

    let recipe = event.getRecipe()
    let ripen = recipe.data.get('ripen')

    // 定义范围
    let range = Number(recipe.data.get('range'))
    let height = 9

    for (let dx = -range; dx <= range; dx++) {
        for (let dz = -range; dz <= range; dz++) {
            for (let dy = 0; dy >= -height; dy--) { //从上而下
                let pos = new BlockPos(x + dx, y + dy, z + dz)  // 构建坐标
                let state = level.getBlockState(pos)            // 获取当前状态
                let property
                // 碰到包含 'moisture' 的方块（比如耕地）就换下一列
                property = state.block.getStateDefinition().getProperty('moisture')
                if (property != null)break //只到最上面耕地 
                
                // 处理包含 'age' 的方块（比如作物）
                if(ripen == false)continue
                property = state.block.getStateDefinition().getProperty('age')
                if (property != null){
                    //获取年龄
                    let age = state.getValue(property)
                    // 获取最大年龄（取可能的最后一个值）
                    let maxage = property.getPossibleValues().toArray().pop()
                    // 计算新年龄（+1，但不能超过最大）
                    let newAge = new $Integer(Math.min(age + 1, maxage))
                    // 构造新状态，setValue会返回一个新的blockState
                    let newState = state.setValue(property,newAge)
                    //console.log(newState,state)
                    // ★ 更新到世界
                    level.setBlock(pos, newState, 3)  // 3 = 默认更新标志（可查文档）
                    continue
                }
                
            }
        }
    }
})
MBDMachineEvents.onRecipeWorking('mbd2:sprinkler',e=>{
    let event = e.getEvent()
    let machine = event.getMachine()
    let recipe = event.getRecipe()
    let {x,y,z} = machine.pos
    let level = machine.level
    let range = recipe.data.get('range')
    //喷水
    level.spawnParticles('simple_weather:rain',false,x+0.5,y-0.1,z+0.5,range*0.5,0,range*0.5,1*range,0)
    
})

//测试用代码
// BlockEvents.randomTick('farmersdelight:rich_soil_farmland',event => {
//     const { level, block } = event;
//     let {x,y,z} = block.pos
//     let FarmlandWaterManager = $FarmlandWaterManager
//     const hasTicket = FarmlandWaterManager.hasBlockWaterTicket(level, block.getPos());
//     if (hasTicket) {
//         //console.log(`✅ 耕地 ${block.getPos()} 有水票支持`);
//         level.spawnParticles('minecraft:end_rod',false,x+0.5,y+1,z+0.5,0.3,0,0.3,50,0)
//     } else {
//         //console.log(`❌ 耕地 ${block.getPos()} 没有水票`);
//         level.spawnParticles('minecraft:flame',false,x+0.5,y+1,z+0.5,0.3,0,0.3,50,0)
//     }
// });
