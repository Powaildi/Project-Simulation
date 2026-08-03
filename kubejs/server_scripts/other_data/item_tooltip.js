
ItemEvents.modifyTooltips(e=>{
    let dyebuckets = [
        'create_dragons_plus:white_dye_bucket',
        'create_dragons_plus:light_gray_dye_bucket',
        'create_dragons_plus:gray_dye_bucket',
        'create_dragons_plus:black_dye_bucket',
        'create_dragons_plus:brown_dye_bucket',
        'create_dragons_plus:red_dye_bucket',
        'create_dragons_plus:orange_dye_bucket',
        'create_dragons_plus:yellow_dye_bucket',
        'create_dragons_plus:lime_dye_bucket',
        'create_dragons_plus:green_dye_bucket',
        'create_dragons_plus:cyan_dye_bucket',
        'create_dragons_plus:light_blue_dye_bucket',
        'create_dragons_plus:blue_dye_bucket',
        'create_dragons_plus:purple_dye_bucket',
        'create_dragons_plus:magenta_dye_bucket',
        'create_dragons_plus:pink_dye_bucket'
    ]
    e.add(dyebuckets,Text.red('流体源进行染色会消耗'))

    let convertable = [
    'create:wrench',
    'cmparallelpipes:pipe_wrench',
    'mekanism:configurator'
    ]
    e.add(convertable,Text.aqua("丢弃以切换种类"))

    e.add(['kubejs:infinite_heat_bar','kubejs:infinite_superheat_bar'],
        [Text.yellow('右键烈焰人燃烧室使用，拆除燃烧室返还。'),Text.aqua('材质 by 一饣λ'),])
    e.add(['kubejs:infinite_heat_bar','kubejs:infinite_superheat_bar'],{shift:true},Text.lightPurple('烈焰人宝宝 你看看这个烈焰棒好不好吃呀'))
    
    e.add('ratatouille:spreader',Text.aqua('一次可以催熟更多作物！'))
    e.add('ratatouille:spreader',{shift:true},[Text.aqua('每个催熟素催熟数量：5->32，且不会重复选取'),Text.yellow('根据可催熟的作物数量一次消耗更多催熟素')])
    
    e.add('bits_n_bobs:flywheel_bearing',Text.aqua('提供更多应力！'))
    e.add('bits_n_bobs:flywheel_bearing',{shift:true},[Text.green('应力量/角质量：5->4096')])

    e.add('createdieselgenerators:distillation_controller',Text.aqua('增大分馏塔面积可以增加并行数(1.3.15)'))
    e.add('createdieselgenerators:distillation_controller',{shift:true},[
        Text.green('优先采用高度最高，加热等级最高的配方'),
        Text.green('修复了issue#366,368')
    ])

    e.add('create_fantasizing:alternative_chromatic_compound',Text.lightPurple('每次加载配方时，会从6种物品/流体中选5种进入配方，并打乱。'))

    e.add('kubejs:void_bucket',Text.blue('不会推动实体'))
    e.add('kubejs:cryogen_bucket',[Text.aqua('对接触的实体造成强大持久的冻伤效果'),Text.green('对玩家和女仆造成的伤害更少且不会指数增长')])
    e.add('minecraft:lava_bucket',[Text.gold('不再适合当烈焰人燃烧室燃料'),Text.yellow('岩浆只是自己很热而已，不含燃料')])
    e.add('minecraft:water_bucket',[Text.aqua('不要在意它的燃料属性')])
})
