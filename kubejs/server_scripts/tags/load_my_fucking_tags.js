// 优先修复缺失的标签，防止连锁报错
// 事件在服务器启动、标签加载后触发
ServerEvents.tags('item', event => {
    // 1. 修复 c:foods/meat 标签：添加缺失的子标签，即使它们目前为空
    event.add('c:foods/meat', 'c:foods/meat/raw', 'c:foods/meat/cooked')

    // 2. 修复 kaleidoscope_nether:mod_items 标签：先移除错误引用，再添加正确的物品
    // 注意：请将 'kaleidoscope_nether:正确的物品ID' 替换为实际存在的物品
    event.remove('kaleidoscope_nether:mod_items', [
        'kaleidoscope_nether:glowing_soup',
        'kaleidoscope_nether:glowing_pudding',
        'kaleidoscope_nether:glowing_kabob',
        'kaleidoscope_nether:glowing_salad'
    ])
    // 如果这些物品实际存在，但ID不同，请在这里添加正确的ID
    // event.add('kaleidoscope_nether:mod_items', ['kaleidoscope_nether:正确物品ID1', 'kaleidoscope_nether:正确物品ID2'])

    // 3. 修复 c:foods/cheese 标签：添加缺失的子标签
    event.add('c:foods/cheese', 'c:cheese', 'c:cheeses')

    // 4. 修复 c:cooked_meats 标签：移除不存在的物品引用
    event.remove('c:cooked_meats', 'kaleidoscope_cookery:cooked_donkey_meat')
    // 如果该物品实际存在但ID不同，请使用 event.add() 添加正确ID
})
