ServerEvents.recipes(e=>{

    function unifyRecipe(item,unify_to){
        e.replaceInput({input:item},item,unify_to)
        e.replaceOutput({output:item},item,unify_to)
    }
    
    unifyRecipe('create:powdered_obsidian','mekanism:dust_obsidian')
    unifyRecipe('mekanism:sawdust','createdieselgenerators:wood_chip')
    unifyRecipe('mekanism:dye_base','minecraft:clay_ball')
    unifyRecipe('vintageimprovements:andesite_sheet','createdeco:andesite_sheet')
    unifyRecipe('vintageimprovements:iron_spring','simulated:spring')

})