import StoreModule from '../module';

class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  async getCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        waiting: false,
        categories: json.result.items,
      },
      'Получены категории'
    );
  }
}

export default CategoriesState;
