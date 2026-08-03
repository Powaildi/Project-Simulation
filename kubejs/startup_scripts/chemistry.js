StartupEvents.registry('mekanism:chemical',e=>{
    e.create('carbon_dioxide','mekanism:infuse_type').displayName('二氧化碳').tint('gray').gaseous()
    e.create('wood_gas','mekanism:infuse_type').displayName('木煤气').tint('#393657').gaseous().fuel(40,200)//第一个是每mB燃烧时间，决定消耗速度；第二个是每tick产能，决定每tick发电上限
    e.create('petrol_gas','mekanism:infuse_type').displayName('石油气').tint('#87DFC5').gaseous().fuel(60,600)
    e.create('ammonia','mekanism:infuse_type').displayName('氨气').tint('#8A6438').gaseous().fuel(10,1600)
    e.create('nitrogen','mekanism:infuse_type').displayName('氮气').tint('#ECC968').gaseous()
    e.create('nitrogen_dioxide','mekanism:infuse_type').displayName('二氧化氮').tint('#F19D4E').gaseous()
    e.create('nitric_acid','mekanism:infuse_type').displayName('硝酸').tint('#DF6119').gaseous()
    e.create('nitrogen_fertilizer','mekanism:infuse_type').displayName('氮肥').tint('#EBE84F').gaseous()
    e.create('chlorophyte_fuel','mekanism:infuse_type').displayName('叶绿裂变燃料').tint('green')
    e.create('chlorophyte_waste','mekanism:infuse_type').displayName('叶绿废料').tint('dark_green').radiation(0.01)
    
})
