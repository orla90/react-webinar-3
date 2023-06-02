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
 * @param nodes {Array}
 * @returns {Array}
 */

export function buildTree(list) {
  var map = {},
    node,
    roots = [],
    newList = [],
    i;

  for (i = 0; i < list.length; i++) {
    map[list[i]._id] = i;
    list[i].children = [];
    list[i].prefix = '';
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent) {
      node.prefix += list[map[node.parent._id]].prefix + '-';
      list[map[node.parent._id]].children.push(node);
    } else {
      roots.push(node);
    }
    newList.push(node);
  }
  return newList;
}
