/**
 * 对数组进行多次 Fisher-Yates 洗牌（直接修改原数组）
 * 洗牌次数越多，元素的原始位置被打散得越彻底。
 *
 * @param {any[]} arr - 需要打乱的原数组（会被直接修改）
 * @param {number} times - 重复洗牌的次数
 * @returns {any[]} 返回原数组本身，方便进行链式调用
 */
function shuffle(arr,times) {
  const len = arr.length;
  //console.log(times) 
  for (let t = 0; t < times; t++) {
    for (let i = len - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 直接交换
    }
  }
  return arr; // 返回原数组，方便链式调用
}


ServerEvents.recipes(e=>{
    //3个报错的配方，但是不影响配方正常加载
    'create_fantasizing:sequenced_assembly/alternative_chromatic_compound'
    'create_fantasizing:sequenced_assembly/heart_of_the_sea_copy'
    'create_fantasizing:sequenced_assembly/compact_hydraulic_engine'
    //不在这里解决，而是在data文件夹解决
    
    //替用型异彩化合物
    e.remove({output:'create_fantasizing:alternative_chromatic_compound'})
    let ti = 'mekanism:enriched_carbon'

    let candidates = ['minecraft:orange_dye','minecraft:lime_dye','minecraft:cyan_dye',
        'minecraft:purple_dye','minecraft:pink_dye','minecraft:gray_dye']
    shuffle(candidates,5)
    e.recipes.create.sequenced_assembly('create_fantasizing:alternative_chromatic_compound','mekanism:alloy_atomic',[
        e.recipes.create.deploying(ti,[ti,candidates[0]]),
        e.recipes.create.deploying(ti,[ti,candidates[1]]),
        e.recipes.create.deploying(ti,[ti,candidates[2]]),
        e.recipes.create.deploying(ti,[ti,candidates[3]]),
        e.recipes.create.deploying(ti,[ti,candidates[4]])
        ])
        .transitionalItem(ti).id('sequenced_assembly/alternative_chromatic_compound')

    let candidates2 = ['create_dragons_plus:orange_dye','create_dragons_plus:lime_dye','create_dragons_plus:cyan_dye',
        'create_dragons_plus:purple_dye','create_dragons_plus:pink_dye','create_dragons_plus:gray_dye']
    shuffle(candidates2,5)
    e.recipes.create.sequenced_assembly('create_fantasizing:alternative_chromatic_compound','mekanism:alloy_atomic',[
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[0],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[1],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[2],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[3],250)]),
        e.recipes.create.filling(ti,[ti,Fluid.of(candidates2[4],250)])
        ])
        .transitionalItem(ti).id('sequenced_assembly/alternative_chromatic_compound_liquid')
})
