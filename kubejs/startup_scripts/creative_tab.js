//提前设置
let transmission = [
        //1
        'create:shaft', 
        'create:cogwheel', 
        'create:large_cogwheel', 
        'createadditionallogistics:flexible_shaft', 
        'createadditionallogistics:lazy_shaft', 
        'createadditionallogistics:lazy_cogwheel', 
        'createadditionallogistics:lazy_large_cogwheel', 
        'create:andesite_casing',
        'create:brass_casing', 
        //2
        'create:gearbox', 
        'create:vertical_gearbox', 
        'create_connected:parallel_gearbox', 
        'create_connected:vertical_parallel_gearbox', 
        'create_connected:six_way_gearbox', 
        'create_connected:vertical_six_way_gearbox',
        'create:encased_chain_drive', 
        'create_connected:encased_chain_cogwheel', 
        'create:adjustable_chain_gearshift',
        //3
        'create:clutch', 
        'create_connected:inverted_clutch', 
        'create:gearshift', 
        'create_connected:inverted_gearshift', 
        'create:sequenced_gearshift',
        'create:rotation_speed_controller',
        'simulated:analog_transmission', 
        'create:creative_motor', 
        'gnkinetics:creative_gear_motor',
        //4
        'minecraft:chain', 
        'create:chain_conveyor', 
        'create:belt_connector', 
        'bits_n_bobs:small_flanged_cogwheel', 
        'bits_n_bobs:large_flanged_cogwheel', 
        'escalated:wooden_walkway_steps', 
        'escalated:metal_walkway_steps',
        'simulated:auger_shaft', 
        'simulated:auger_cog',
        //5
        'copycats:copycat_shaft',
        'copycats:copycat_cogwheel', 
        'copycats:copycat_large_cogwheel', 
        'create:speedometer', 
        'create:stressometer',
        'dndesires:multimeter',
        'dndesires:omni_speed_controller', 
        'create_connected:brass_gearbox', 
        'create_connected:vertical_brass_gearbox', 


        //6
        'gnkinetics:worm_gear', 
        'gnkinetics:magnet_gear', 
        'gnkinetics:large_magnet_gear', 
        'gnkinetics:ring_gear', 
        'gnkinetics:planetary_gear', 
        'gnkinetics:hollow_brass_gear', 
        'gnkinetics:hollow_large_brass_gear', 
        'gnkinetics:hollow_cogwheel', 
        'gnkinetics:hollow_large_cogwheel', 
        
        'gnkinetics:industrial_gear', 
        'gnkinetics:large_industrial_gear', 
        'gnkinetics:cogstone', 
        'gnkinetics:andesite_cogwheel', 
        'gnkinetics:tiny_brass_gear', 
        'gnkinetics:brass_gear', 
        'gnkinetics:large_brass_gear', 
        'gnkinetics:tiny_cogwheel', 
        'gnkinetics:shaftless_cogwheel', 
        
        'gnkinetics:shaftless_industrial_gear', 
        'gnkinetics:shaftless_large_industrial_gear', 
        'gnkinetics:shaftless_cogstone', 
        'gnkinetics:shaftless_andesite_cogwheel', 
        'gnkinetics:shaftless_tiny_brass_gear', 
        'gnkinetics:shaftless_brass_gear', 
        'gnkinetics:shaftless_large_brass_gear', 
        'gnkinetics:shaftless_tiny_cogwheel', 
        'gnkinetics:shaftless_large_cogwheel',

        'createaddition:alternator', 
        'createaddition:electric_motor', 
        'create_fantasizing:compact_wind_engine', 
        'create_fantasizing:sculk_engine', 
        'create_fantasizing:compact_hydraulic_engine', 
        'create_fantasizing:yin_yang_engine', 
        'createdieselgenerators:huge_diesel_engine',
        'createdieselgenerators:diesel_engine', 
        'createdieselgenerators:large_diesel_engine', 
        //7
        'create:windmill_bearing',
        'create:steam_engine', 
        'create:large_water_wheel', 
        'create:water_wheel', 
        'create:copper_valve_handle', 
        'create_connected:large_crank_wheel', 
        'create_connected:crank_wheel', 
        'create:hand_crank',
        'createutilities:void_motor', 
        //8
        
        'create:fluid_tank', 
        'create:blaze_burner', 
        'create:creative_blaze_cake', 
        'createaddition:creative_energy',
        'minecraft:water_bucket'
    ]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let machines =[
        'create:millstone', 
        'create:crushing_wheel', 
        'create:mechanical_press', 
        'create:mechanical_mixer', 
        'create:basin', 
        'create:mechanical_saw', 
        'create:deployer', 
        'create:spout', 
        'create:blaze_burner', 
        
        'create:encased_fan', 
        'create_connected:fan_blasting_catalyst', 
        'create_connected:fan_smoking_catalyst', 
        'create_connected:fan_splashing_catalyst', 
        'create_connected:fan_haunting_catalyst', 
        'create_connected:fan_freezing_catalyst', 
        'create_connected:fan_seething_catalyst', 
        'create_connected:fan_sanding_catalyst', 
        'create_connected:fan_ending_catalyst_dragons_breath', 
        
        'vintageimprovements:belt_grinder', 
        'vintageimprovements:spring_coiling_machine', 
        'vintageimprovements:vacuum_chamber', 
        'vintageimprovements:vibrating_table', 
        'vintageimprovements:centrifuge', 
        'vintageimprovements:curving_press', 
        'vintageimprovements:helve_hammer', 
        'vintageimprovements:lathe', 
        'vintageimprovements:laser',

        'create:nozzle',
        'createdieselgenerators:distillation_controller',
        'createdieselgenerators:bulk_fermenter',
        'createdieselgenerators:basin_lid', 
        'createbigcannons:basin_foundry_lid', 
        'vintageimprovements:convex_curving_head', 
        'vintageimprovements:concave_curving_head', 
        'vintageimprovements:w_shaped_curving_head', 
        'vintageimprovements:v_shaped_curving_head', 
        
        'createaddition:rolling_mill',
        'createaddition:tesla_coil', 
        'dndesires:hydraulic_press', 
        'dndesires:gold_mixer', 
        'fluidlogistics:copper_basin', 
        'create_power_loader:andesite_chunk_loader', 
        'create_power_loader:brass_chunk_loader', 
        'create:mechanical_crafter', 
        'createimp:batch_mechanical_crafter',

        'ratatouille:oven', 
        'ratatouille:thresher', 
        'ratatouille:oven_fan', 
        'ratatouille:squeeze_basin', 
        'ratatouille:mechanical_demolder', 
        'ratatouille:spreader', 
        'ratatouille:frozen_block', 
        'ratatouille:compost_tower',
        'ratatouille:irrigation_tower',

        'create_integrated_farming:fishing_net', 
        'create_integrated_farming:chicken_roost', 
        'create_integrated_farming:vacuum_harvester', 
        'createdieselgenerators:mold[createdieselgenerators:mold_type="createdieselgenerators:bowl"]', 
        'createdieselgenerators:mold[createdieselgenerators:mold_type="createdieselgenerators:lines"]', 
        'createdieselgenerators:mold[createdieselgenerators:mold_type="createdieselgenerators:chain"]', 
        'createdieselgenerators:mold[createdieselgenerators:mold_type="createdieselgenerators:bar"]', 
        'createoreexcavation:drilling_machine', 
        'createoreexcavation:extractor',

        'createoreexcavation:sample_drill', 
        'dndesires:industrial_fan',
        'mbd2:air_compressor',
        'mbd2:assembler', 
        'mbd2:sprinkler'
    ]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let logistic = [
        'create:andesite_funnel', 
        'create:brass_funnel', 
        'create:andesite_tunnel', 
        'create:brass_tunnel', 
        'create:chute', 
        'create_connected:brass_chute', 
        'create:smart_chute', 
        'create:depot', 
        'create:weighted_ejector',

        'create:mechanical_arm', 
        'create_connected:inventory_access_port', 
        'create:stockpile_switch', 
        'minecraft:barrel',
        'create:item_vault',
        'create_connected:item_silo', 
        'create:packager', 
        'create:repackager', 
        'create:package_frogport', 
        
        'create:stock_link', 
        'create:stock_ticker', 
        'create:redstone_requester', 
        'create:factory_gauge', 
        'createimp:work_warehouse', 
        'createimp:template_panel', 
        'createadditionallogistics:package_editor', 
        'createimp:batch_repackager', 
        'create:fluid_pipe', 

        'create:mechanical_pump', 
        'fluidlogistics:fluid_pump', 
        'create:smart_fluid_pipe', 
        'create:fluid_valve', 
        'create:fluid_tank', 
        'create_connected:fluid_vessel', 
        'create:hose_pulley', 
        'create:item_drain', 
        'create:spout',

        'fluidlogistics:fluid_transporter',
        'fluidlogistics:smart_faucet', 
        'fluidlogistics:faucet', 
        'create:copper_casing',
        'fluidlogistics:multi_fluid_tank', 
        'fluidlogistics:horizontal_multi_fluid_tank',
        'fluidlogistics:fluid_packager', 
        'fluidlogistics:fluid_repackager', 
        'fluidlogistics:copper_frogport', 

        'create_fantasizing:transporter',
        'fluidlogistics:smart_hopper', 
        'fluidlogistics:water_containing_copper_casing', 
        'fluidlogistics:mechanical_fluid_gun', 
        'fluidlogistics:multi_fluid_access_port',
        'create:creative_fluid_tank', 
        'dndesires:roll_table',
        'createimp:andesite_scrap_bucket', 
        'createimp:brass_scrap_bucket', 

        'minecraft:hopper', 
        'createutilities:void_chest', 
        'createutilities:void_battery', 
        'createutilities:void_tank',
        'create:creative_crate',
        'mekanism:basic_logistical_transporter', 
        'mekanism:advanced_logistical_transporter', 
        'mekanism:elite_logistical_transporter', 
        'mekanism:ultimate_logistical_transporter', 
        
        'createadditionallogistics:cash_register', 
        'mekanism:basic_mechanical_pipe', 
        'mekanism:advanced_mechanical_pipe', 
        'mekanism:elite_mechanical_pipe', 
        'mekanism:ultimate_mechanical_pipe', 
        'mekanism:basic_pressurized_tube', 
        'mekanism:advanced_pressurized_tube', 
        'mekanism:elite_pressurized_tube', 
        'mekanism:ultimate_pressurized_tube',

        'createaddition:modular_accumulator', 
        'mekanism:basic_universal_cable', 
        'mekanism:advanced_universal_cable', 
        'mekanism:elite_universal_cable', 
        'mekanism:ultimate_universal_cable', 
        'mekanism:basic_thermodynamic_conductor', 
        'mekanism:advanced_thermodynamic_conductor', 
        'mekanism:elite_thermodynamic_conductor', 
        'mekanism:ultimate_thermodynamic_conductor',

        'createaddition:creative_energy', 
        'createaddition:copper_spool', 
        'createaddition:gold_spool', 
        'createaddition:electrum_spool', 
        'createaddition:festive_spool', 
        'createaddition:connector', 
        'createaddition:small_light_connector', 
        'createaddition:large_connector', 
        'createaddition:redstone_relay',

        'create_mobile_packages:bee_port', 
        'create_mobile_packages:portable_stock_ticker', 
        'create_mobile_packages:robo_bee', 
        'create_mobile_packages:mobile_packager', 
        'createphantom:phantomport', 
        'createphantom:mini_phantom', 
        'createphantom:tunable_portable_ticker', 
        'createphantom:storage_channel_extension_card', 
        'createimp:network_manager',
        
        'createimp:process_manager', 
        'createadditionallogistics:package_accelerator',
    ]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let structure = [
        //1
        'create:rope_pulley', 
        'bits_n_bobs:chain_pulley', 
        'create:elevator_pulley', 
        'create:windmill_bearing', 
        'create:mechanical_bearing', 
        'create:clockwork_bearing', 
        'bits_n_bobs:flywheel_bearing', 
        'bits_n_bobs:cogwheel_chain_carriage',
        'create:cart_assembler',
        //2
        'create:mechanical_piston', 
        'create:sticky_mechanical_piston', 
        'create:piston_extension_pole', 
        'create:gantry_carriage', 
        'create:gantry_shaft', 
        'create:sticker', 
        'create:linear_chassis', 
        'create:secondary_linear_chassis', 
        'create:radial_chassis',
        //3
        'minecraft:white_wool', 
        'create:white_sail', 
        'create:sail_frame', 
        'minecraft:rail', 
        'minecraft:powered_rail', 
        'minecraft:detector_rail', 
        'minecraft:activator_rail', 
        'create:controller_rail', 
        'minecraft:minecart',
        
        'create:contraption_controls', 
        'create:mechanical_drill', 
        'create:mechanical_saw', 
        'create:deployer', 
        'create:portable_storage_interface', 
        'create:redstone_contact', 
        'create:mechanical_harvester', 
        'create:mechanical_plough', 
        'create:mechanical_roller',
        
        'create:controls', 
        'create:railway_casing', 
        'create:schedule', 
        'create:track_station', 
        'create:portable_fluid_interface',
        'create:rose_quartz_lamp', 
        'create:track_signal',
        'create:track_observer', 
        'railways:track_coupler', 

        'railways:track_create_andesite_narrow', 
        'create:track', 
        'railways:track_create_andesite_wide', 
        'railways:track_monorail', 
        'createaddition:portable_energy_interface',
        'railways:fuel_tank', 
        'railways:portable_fuel_interface',
        'createdieselgenerators:pumpjack_hole', 
        'create:metal_girder',

        'createdieselgenerators:pumpjack_bearing', 
        'createdieselgenerators:pumpjack_crank', 
        'createdieselgenerators:pumpjack_head',
        'create_rns:miner_bearing', 
        'create_rns:mine_head', 
        'create_rns:resonator', 
        'create_rns:stabilizing_resonator', 
        'create_rns:shattering_resonator', 
        'create_rns:resonance_buffer'
    ]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let tools = [
    'create:wrench', 
    'create:goggles', 
    'create:super_glue', 
    'create:minecart_coupling', 
    'create:crafting_blueprint', 
    'create:empty_schematic', 
    'create:schematic_and_quill', 
    'create:blaze_cake', 
    'create:creative_blaze_cake', 
    
    'create:clipboard', 
    'create:cardboard_sword', 
    'create:filter', 
    'create:attribute_filter', 
    'create:package_filter', 
    'createdieselgenerators:oil_scanner', 
    'createdieselgenerators:lighter[createdieselgenerators:fluid_contents={amount:200,id:"createdieselgenerators:gasoline"},createdieselgenerators:lighter_state="closed"]', 
    'simulated:creative_physics_staff', 
    'simulated:plunger_launcher', 
    
    'create_aeronautics_toolgun:structure_tool', 
    'create_aeronautics_toolgun:survival_structure_tool', 
    'create_aeronautics_toolgun:magnetic_gun', 
    'create_aeronautics_toolgun:creative_magnetic_gun', 
    'create_aeronautics_toolgun:portable_structure_container',
    'create_aeronautics_toolgun:disposable_vehicle_container', 
    'minecraft:slime_ball', 
    'simulated:honey_glue', 
    'fluidlogistics:hand_pointer'

    ]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let aero = [
    'aeronautics_utility_objects:brass_universal_joint', 
    'aeronautics_utility_objects:hydraulic_connection_head', 
    'aeronautics_utility_objects:hydraulic_hinge_head', 
    'aeronautics_utility_objects:hydraulic_regulator', 
    'aeronautics_utility_objects:universal_joint_rod', 
    'aeronautics_utility_objects:universal_joint_rod2', 
    'aeronautics_utility_objects:hydraulic_rod', 
    'aeronautics_utility_objects:creative_hydraulic_rod', 
    'aeronautics_utility_objects:damping_stress_bearing',

    'simulatedcoasters:coaster_track', 
    'simulatedcoasters:coaster_cart', 
    'simulatedcoasters:coaster_anchorpoint', 
    'simulatedcoasters:rivet', 
    'simulatedcoasters:red_balloon', 
    'aeroworks:gyroscope', 
    'aeroworks:joystick', 
    'aeroworks:mechanical_servo', 
    'aeroworks:stepper_servo',

    'aero_reformation:redstone_spring', 
    'aero_reformation:ender_compass', 
    'aero_reformation:directional_synchronizer_master', 
    'aero_reformation:directional_synchronizer_slave', 
    'aero_reformation:sensor_agency', 
    'aero_reformation:electric_loadstone', 
    'aero_reformation:rcs_thruster', 
    'aero_reformation:power', 
    'aero_reformation:pilot_seat', 

    'aero_reformation:create_seat', 
    'aero_reformation:end_rod_seat', 
    'aero_reformation:physics_anchor', 
    'aero_reformation:filter_patch', 
    'aero_reformation:gravity_crystal', 
    'aero_reformation:com_offset', 
    'aero_reformation:high_friction_block', 
    'aero_reformation:high_friction_slab', 
    'aero_reformation:high_friction_stairs', 
    'aero_reformation:high_friction_vertical_slab', 
    
    'aero_reformation:ethereal_key', 
    'aero_reformation:mushroom_shell', 
    'aero_reformation:guidance_warhead', 
    'aero_reformation:warhead_configurator', 
    'kineticgrip:grip_handle', 
    'create_aeronautics_throwable_rope_connector:throwable_rope_connector', 
    'create_aeronautics_throwable_rope_connector:rope_connector_launcher', 
    'create_aeronautics_throwable_rope_connector:mounted_rope_launcher',

    'vsfluidlink:hose_connector', 
    'vsfluidlink:magnet_hose_connector', 
    'vsfluidlink:item_hose_connector', 
    'vsfluidlink:item_magnet_hose_connector', 
    'vsfluidlink:electric_wire_connector', 
    'vsfluidlink:electric_magnet_wire_connector', 
    'vsfluidlink:chain_connector', 
    'vsfluidlink:magnet_chain_connector', 
    'sable_schematic_api:blueprint_tool', 

    'sable_schematic_api:physics_manager', 
    'sable_schematic_api:camera', 
    'sable_schematic_api:honey_welder', 
    'sable_schematic_api:blueprint_manuscript', 
    'sable_schematic_api:film', 
    'sable_schematic_api:film_printer', 
    'sable_schematic_api:projector', 
    'sable_schematic_api:projector_base', 
    'sable_schematic_api:projector_screen', 
    
    'sable_schematic_api:projector_screen_locator', 
    'drivebywire:wire', 'drivebywire:wire_cutter', 
    'drivebywire:backup_block', 
    'drivebywire:controller_hub', 
    'drivebywiretypewriter:typewriter_hub'
    ]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
StartupEvents.registry('creative_mode_tab',e=>{

    e.create('transmission')
    .displayName(Text.translatable("tab.transmission"))
    .icon(()=>'gnkinetics:brass_gear')
    .content(showRestrictedItems=>transmission[0])


    e.create('machines')
    .displayName(Text.translatable("tab.machines"))
    .icon(()=>'dndesires:gold_mixer')
    .content(showRestrictedItems=>machines[0])

    e.create('logistic')
    .displayName(Text.translatable("tab.logistic"))
    .icon(()=>'create:brass_funnel')
    .content(showRestrictedItems=>logistic[0])

    e.create('structure')
    .displayName(Text.translatable("tab.structure"))
    .icon(()=>'create:elevator_pulley')
    .content(showRestrictedItems=>structure[0])

    e.create('tools')
    .displayName(Text.translatable("tab.tools"))
    .icon(()=>'simulated:honey_glue')
    .content(showRestrictedItems=>tools[0])

    e.create('aero')
    .displayName(Text.translatable("tab.aero"))
    .icon(()=>'simulatedcoasters:red_balloon')
    .content(showRestrictedItems=>aero[0])
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let modifying = [
    //自行注册的
    ['kubejs:transmission',transmission],
    ['kubejs:machines',machines],
    ['kubejs:logistic',logistic],
    ['kubejs:structure',structure],
    ['kubejs:tools',tools],
    ['kubejs:aero',aero]
    //修改其它的
]

modifying.forEach(element=>{
    let [resourceLocation,list] = element

    StartupEvents.modifyCreativeTab(resourceLocation,e=>{
        list.forEach((item,index,array)=>{
            if(index == 0)return
            Item.findItem(item.split('[')[0]).ifError(()=>{
                item = `minecraft:light_gray_stained_glass_pane[custom_name='"#${index}:${item}"']`
                array[index] = item
            })
            e.addAfter(array[index-1],item)
        })
    })

})
