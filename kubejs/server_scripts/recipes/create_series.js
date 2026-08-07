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
  for (let t = 0; t < times; t++) {
    for (let i = len - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 直接交换
    }
  }
  return arr; // 返回原数组，方便链式调用
}

ServerEvents.recipes(e=>{
    let ti

//第二章

    

//第三章

    

//第四章


//终章


//创造物品配方







//QOL配方

    

    

//神秘配方
    
    
})
