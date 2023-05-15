/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
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
  selectItem(e, code) {
    if (e.target.tagName.toLowerCase() !== 'button') {
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          item.selected = (item.code === code) ? !item.selected : false;
          if (item.code === code && item.selectedCount && item.selected) {
            item.selectedCount = item.selectedCount + 1;
          } else if (item.code === code && !item.selectedCount && item.selected) {
            item.selectedCount = 1;
          }
          return item;
        })
      })
    }
  }
}

export default Store;
