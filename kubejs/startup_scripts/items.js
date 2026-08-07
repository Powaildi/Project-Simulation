StartupEvents.registry('item', e => {
    //注册物品
    e.create('circuit').displayName('电路板')
    e.create('graphite').displayName('石墨')
    e.create('logistics_toolbox').displayName('物流工具箱')
    e.create('fluid_toolbox').displayName('液流工具箱')
    e.create('infinite_heat_bar').displayName('无限加热燃料棒')
    e.create('infinite_superheat_bar').displayName('无限超级加热燃料棒')
    e.create('steel_sheet').displayName('钢板')

})
ItemEvents.modification(e=>{
    e.modify('createbigcannons:steel_block',i=>{
        i.setItemName(Text.translatable("tag.createbigcannons.block_steel"))
    })
})