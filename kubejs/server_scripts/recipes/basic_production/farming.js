ServerEvents.recipes(e=>{
    let potion_mundane = Fluid.ingredientOf('create:potion',{"minecraft:potion_contents":{potion:"minecraft:mundane"}},true)
        
    //骨粉再生
    e.recipes.createdieselgenerators.basin_fermenting('3x minecraft:bone',
        ['3x minecraft:bone_meal',Fluid.sizedIngredientOf(potion_mundane,50)],
        60).id('basin_fermenting/bone')
    //骨粉稀释液
    e.recipes.create.mixing(Fluid.of('kubejs:bone_meal_diluent',500),
        [Fluid.of('minecraft:water',500),'4x minecraft:bone_meal'],90)
        .id('mixing/bone_meal_diluent')
        
    //树木肥料
    e.shapeless('create:tree_fertilizer',[Ingredient.of('#minecraft:flowers',2),'minecraft:moss_block','minecraft:bone_meal'])
        .id('crafting/appliances/tree_fertilizer')

    
})