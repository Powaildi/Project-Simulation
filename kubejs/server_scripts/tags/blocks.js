ServerEvents.tags('block',e=>{
    e.add('minecraft:allows_leaf_litter',[
        'natures_spirit:red_maple_leaves',
        'natures_spirit:orange_maple_leaves',
        'natures_spirit:yellow_maple_leaves'

    ])
    e.add('create_dragons_plus:passive_block_freezers','kubejs:cryogen')
    e.add('minecraft:wither_immune','kubejs:cryogen')
    e.add('minecraft:dragon_immune','kubejs:cryogen')

    e.add('createdieselgenerators:pumpjack_pipe','create:metal_girder')
    let pickup = [
        'functionalstorage:dark_oak_4', 'functionalstorage:crimson_4', 'functionalstorage:warped_4', 'functionalstorage:mangrove_4', 'functionalstorage:cherry_4', 'functionalstorage:framed_4', 'functionalstorage:fluid_1', 'functionalstorage:fluid_2', 'functionalstorage:fluid_4', 'functionalstorage:oak_1', 'functionalstorage:spruce_1', 'functionalstorage:birch_1', 'functionalstorage:jungle_1', 'functionalstorage:acacia_1', 'functionalstorage:dark_oak_1', 'functionalstorage:crimson_1', 'functionalstorage:warped_1', 'functionalstorage:mangrove_1', 'functionalstorage:cherry_1', 'functionalstorage:framed_1', 'functionalstorage:oak_2', 'functionalstorage:spruce_2', 'functionalstorage:birch_2', 'functionalstorage:jungle_2', 'functionalstorage:acacia_2', 'functionalstorage:dark_oak_2', 'functionalstorage:crimson_2', 'functionalstorage:warped_2', 'functionalstorage:mangrove_2', 'functionalstorage:cherry_2', 'functionalstorage:framed_2', 'functionalstorage:oak_4', 'functionalstorage:spruce_4', 'functionalstorage:birch_4', 'functionalstorage:jungle_4', 'functionalstorage:acacia_4',
        'minecraft:iron_block','create_rns:mine_head', 'create_rns:resonance_buffer', 'create_rns:resonator', 'create_rns:shattering_resonator', 'create_rns:stabilizing_resonator', 'createoreexcavation:sample_drill', 'minecraft:barrel', 'minecraft:chest', 'functionalstorage:framed_fluid_1', 'functionalstorage:framed_fluid_2', 'functionalstorage:framed_fluid_4', 'functionalstorage:compacting_drawer', 'functionalstorage:compacting_framed_drawer', 'functionalstorage:storage_controller', 'functionalstorage:framed_storage_controller', 'functionalstorage:controller_extension', 'functionalstorage:framed_controller_extension', 'functionalstorage:simple_compacting_drawer', 'functionalstorage:framed_simple_compacting_drawer', 'functionalstorage:armory_cabinet', 'functionalstorage:ender_drawer', 'beyonddimensions:net_hopper_block', 'beyonddimensions:net_pump_block', 'beyonddimensions:net_pathway', 'beyonddimensions:net_energy_pathway', 'beyonddimensions:net_interface', 'beyonddimensions:net_control', 'beyonddimensions:net_terminal_block', 'beyonddimensions:net_furnace_block', 'beyonddimensions:net_blast_furnace_block', 'beyonddimensions:net_smoker_block', 'beyonddimensions:schematicannon_pathway',
        'minecraft:composter', 'minecraft:crafter', 'minecraft:note_block', 'minecraft:cauldron','minecraft:copper_bulb', 'minecraft:exposed_copper_bulb', 'minecraft:weathered_copper_bulb', 'minecraft:oxidized_copper_bulb', 'minecraft:waxed_copper_bulb', 'minecraft:waxed_exposed_copper_bulb', 'minecraft:waxed_weathered_copper_bulb', 'minecraft:waxed_oxidized_copper_bulb', 'mbd2:air_compressor', 'mbd2:assembler', 'mbd2:sprinkler'
    ]
    e.add('create:wrench_pickup',pickup)
})
