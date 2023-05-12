/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {} ) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.count = 1;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.setCount(), title: 'Новая запись'}]
    })
  }

  /**
   * Установка счетчика количества записей
   * @returns {number}
   */
  setCount() {
    const code = (this.count !== 1) ? this.count + 1 : this.state.list.length + 1;
    this.count = code;
    return code;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        item.selected = (item.code === code) ? !item.selected : false;
        if (item.code === code && item.selectedCount && item.selected) {
          item.selectedCount = item.selectedCount + 1;
          item.title = this.editTitle(item);
        } else if (item.code === code && !item.selectedCount && item.selected) {
          item.selectedCount = 1;
          item.title = this.editTitle(item);
        } 
        return item;
      })
    })
  }
  
  /**
   * Корректировка заголовка записи
   * @param item {Object}
   * @returns {string}
   */
  editTitle(item) {
    return `${item.title.split(' | ')[0]} | Выделяли ${item.selectedCount} ${this.checkWordDeclension(item.selectedCount, ['раз', 'раза', 'раз'])}`
  }
  
  /**
   * Функция для склонения слов
   * @param number {number} 
   * @param words {[string]}
   * @returns {string}
   */
  checkWordDeclension(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2
      : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10
        : 5]];
  }
}

export default Store;
