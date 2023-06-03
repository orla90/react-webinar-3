/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Построение дерева с дочерними узлами и префиксами
 * @param list {Array}
 * @returns {Array}
 */
export function buildTree(list) {
  let map = {},
    node,
    roots = [];

  for (let i = 0; i < list.length; i++) {
    map[list[i]._id] = i;
    list[i].children = [];
    list[i].prefix = '';
  }

  for (let i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parent) {
      node.prefix += list[map[node.parent._id]].prefix + '- ';
      list[map[node.parent._id]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

/**
 * Преобразует дерево в массив в корректной последовательности
 * @param tree {Array}
 * @param unpackedTree {Array}
 * @returns {Array}
 */
export function unpackTree(tree, unpackedTree = []) {
  tree.forEach((node) => {
    unpackedTree.push(node);
    if (node.children.length > 0) {
      unpackTree(node.children, unpackedTree);
    }
  });
  return unpackedTree;
}
