let ids = []

PlayerEvents.chat(e=>{
    return
    ids = []
    e.server.recipeManager.getAllRecipesFor('create:mixing').forEach(recipe=>{
        if(recipe.id().path.endsWith('dye_from_item')){
            ids.push(recipe.id())
            console.log(recipe.id())
        }
    })
    console.log("['"+ids.join("','")+"']")
    
})
ServerEvents.recipes(e=>{
    // e.forEachRecipe({id:'kubejs:mixing/create/cinder_flour'},recipe=>{
    //     console.log(recipe.originalJson)
    // })
})