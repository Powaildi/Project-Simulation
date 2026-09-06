
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
    e.add(dyebuckets,Text.red(Text.translatable("tooltip.dyebuckets")))
    
    let convertable = [
    'create:wrench',
    'cmparallelpipes:pipe_wrench',
    'mekanism:configurator'
    ]
    e.add(convertable,Text.aqua(Text.translatable("tooltip.convertable_wrenches")))

    e.add(['kubejs:infinite_heat_bar','kubejs:infinite_superheat_bar'],
        [Text.yellow(Text.translatable("tooltip.infinite_heat_bar")),Text.aqua(Text.translatable("tooltip.infinite_heat_bar_texby")),])
    e.add(['kubejs:infinite_heat_bar','kubejs:infinite_superheat_bar'],{shift:true},Text.lightPurple(Text.translatable("tooltip.infinite_heat_bar_shift")))
    
    e.add('ratatouille:spreader',Text.aqua(Text.translatable("tooltip.ratatouille.spreader")))
    e.add('ratatouille:spreader',{shift:true},[Text.aqua(Text.translatable("tooltip.ratatouille.spreader_shift_1")),Text.yellow(Text.translatable("tooltip.ratatouille.spreader_shift_2"))])
    
    e.add('bits_n_bobs:flywheel_bearing',Text.aqua(Text.translatable("tooltip.bits_n_bobs.flywheel_bearing")))
    e.add('bits_n_bobs:flywheel_bearing',{shift:true},[Text.green(Text.translatable("tooltip.bits_n_bobs.flywheel_bearing_shift"))])
    e.add('bits_n_bobs:cogwheel_chain_carriage',Text.aqua(Text.translatable("tooltip.bits_n_bobs.cogwheel_chain_carriage")))
    
    e.add('createdieselgenerators:distillation_controller',Text.aqua(Text.translatable("tooltip.createdieselgenerators.distillation_controller")))
    e.add('createdieselgenerators:distillation_controller',{shift:true},[
        Text.green(Text.translatable("tooltip.createdieselgenerators.distillation_controller_shift_1")),
        Text.green(Text.translatable("tooltip.createdieselgenerators.distillation_controller_shift_2"))
    ])
    e.add('createdieselgenerators:pumpjack_hole',Text.green(Text.translatable("tooltip.createdieselgenerators.pumpjack_hole")))

    e.add('mbd2:air_compressor',Text.yellow(Text.translatable("tooltip.mbd2.air_compressor")))

    e.add('create_fantasizing:alternative_chromatic_compound',Text.lightPurple(Text.translatable("tooltip.create_fantasizing.alternative_chromatic_compound")))

    e.add('kubejs:void_bucket',Text.blue(Text.translatable("tooltip.void_bucket")))
    e.add('kubejs:cryogen_bucket',[Text.aqua(Text.translatable("tooltip.cryogen_bucket_1")),Text.green(Text.translatable("tooltip.cryogen_bucket_2"))])
    e.add('minecraft:lava_bucket',[Text.gold(Text.translatable("tooltip.lava_bucket_1")),Text.yellow(Text.translatable("tooltip.lava_bucket_2"))])
    e.add('minecraft:water_bucket',[Text.aqua(Text.translatable("tooltip.water_bucket"))])

    e.add('natures_spirit:olives',Text.green(Text.translatable("tooltip.natures_spirit.olives")))
    e.add('natures_spirit:cheese_bucket',Text.yellow(Text.translatable("tooltip.natures_spirit.cheese_bucket")))
    e.add('natures_spirit:coconut',Text.green(Text.translatable("tooltip.natures_spirit.coconut")))
    
    //e.add(['railways:paint_brush','railways:empty_paint_pitcher'],Text.red(Text.translatable("tooltip.paint")))
    e.add(['#dndecor:containers_decor','createpropulsion:platinum_fluid_vessel'],{shift:true},Text.white(Text.translatable("tooltip.vessel")))

    e.add('#minecraft:small_flowers',Text.green(Text.translatable("tooltip.small_flowers")))
})
// Text.translatable("tooltip.")

// 请查看 file://./../../assets/kubejs/lang/zh_cn.json
