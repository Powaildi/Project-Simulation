ServerEvents.recipes(e=>{
    //移动火炮铸模配方
    let transfer = [
        'createbigcannons:very_small_cast_mould','createbigcannons:small_cast_mould','createbigcannons:medium_cast_mould',
        'createbigcannons:large_cast_mould','createbigcannons:very_large_cast_mould','createbigcannons:sliding_breech_cast_mould',
        'createbigcannons:cannon_end_cast_mould','createbigcannons:screw_breech_cast_mould','createbigcannons:autocannon_breech_cast_mould',
        'createbigcannons:autocannon_recoil_spring_cast_mould','createbigcannons:autocannon_barrel_cast_mould'
    ]
    transfer.forEach(element=>{
        e.remove({output:element})
        e.recipes.vintageimprovements.turning(element,Ingredient.of('#minecraft:logs'))
    })
})
