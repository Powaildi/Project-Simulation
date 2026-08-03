ServerEvents.recipes(e=>{
    //重写锅炉配方
    let boiler_recipes = e.recipeStream({mod:'railways',type:'create:mechanical_crafting'})
    boiler_recipes.forEach(recipe=>{
        let result = recipe.getOriginalRecipeResult()
        let id = recipe.getId()
        let metal = recipe.getOriginalRecipeIngredients().get(2).asStack().getItems().pop()
        e.shaped(result,[
            'ABA',
            'BCB',
            'ABA'
        ],{
            A:metal,
            B:'minecraft:blaze_rod',
            C:'minecraft:bucket'
        }).id(id)

    })
})
