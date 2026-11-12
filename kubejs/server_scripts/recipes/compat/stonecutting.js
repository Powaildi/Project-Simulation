ServerEvents.recipes(e=>{


    //红石构件切石
    let redstones = [
        //拉杆
        '16x minecraft:lever', '8x create:analog_lever', '8x simulated:throttle_lever',
        //小元件
        '16x minecraft:redstone_torch',
        '8x minecraft:repeater', '6x minecraft:comparator', '8x create:powered_latch', '8x create:powered_toggle_latch',
        '2x create:pulse_repeater', '4x create:pulse_extender', '4x create:pulse_timer', '2x create_connected:sequenced_pulse_generator',
        '2x simulated:redstone_accumulator', '2x simulated:redstone_inductor', '2x createpropulsion:redstone_converter', 
        //大元件
        '4x create:content_observer', '4x create:stockpile_switch','4x create_connected:inventory_access_port', '8x create:redstone_contact',
        //无线
        '8x create:redstone_link', 'create:linked_controller', 'simulated:linked_typewriter', '2x aeroworks:joystick',
        '2x simulated:directional_linked_receiver', '2x simulated:modulating_linked_receiver',
        'drivebywire:wire', 'drivebywire:backup_block', 'drivebywire:controller_hub',
        //大元件2
        '4x minecraft:daylight_detector', '8x minecraft:observer', '8x minecraft:target', '8x minecraft:note_block', '4x minecraft:redstone_lamp', '4x create:rose_quartz_lamp', 
        '4x minecraft:piston', '4x minecraft:sticky_piston', '6x minecraft:dispenser', '6x minecraft:dropper', 'minecraft:crafter',
        //抽屉升级
        '4x functionalstorage:redstone_upgrade', '2x functionalstorage:collector_upgrade', '2x functionalstorage:puller_upgrade', '2x functionalstorage:pusher_upgrade', '4x functionalstorage:void_upgrade',
        //列车
        '4x create:track_signal', '2x create:track_station', '4x create:track_observer',
        //应力
        '4x create:speedometer', '4x create:stressometer', '2x dndesires:multimeter',
        '8x create:clutch', '8x create_connected:inverted_clutch', '8x create:gearshift', '8x create_connected:inverted_gearshift', '2x create:sequenced_gearshift',
        //传感
        '4x simulated:velocity_sensor', '4x simulated:altitude_sensor', '4x simulated:optical_sensor', '4x simulated:laser_pointer', '4x simulated:laser_sensor',
        //杂项
        '4x simulated:redstone_magnet', 
        '4x minecraft:waxed_copper_bulb', '4x minecraft:waxed_exposed_copper_bulb', '4x minecraft:waxed_weathered_copper_bulb', '4x minecraft:waxed_oxidized_copper_bulb',
        'aeroworks:control_desk', 'aeroworks:lever_module', 'aeroworks:button_panel_module', 'aeroworks:button_keypad_module', 'aeroworks:joystick_module',
        'aeroworks:button_module', 'aeroworks:wheel_module', 'aeroworks:throttle_quadrant_module', 'aeroworks:yoke_module'
        //'2x redstonepen:control_box',
    ]
    redstones.forEach((item,index)=>{
        item = Item.of(item)
        e.stonecutting(item,'vintageimprovements:redstone_module')
            .id('stonecutting/redstone_'+index.toString().padStart(2, '0')+'/'+item.id.replace(':','/'))
    })

})