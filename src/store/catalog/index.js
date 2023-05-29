import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      perPage: 10,
      totalPagesCount: 0,
      isLoading: true,
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    );
  }
  
  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      'Определена текущая страница'
    );
  }

  async getTotalPagesCount() {
    const response = await fetch(
      `/api/v1/articles?limit=${this.perPage}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        totalPagesCount: Math.ceil(json.result.count / this.getState().perPage),
      },
      'Получено количество страниц'
    );
  }
  
  async setListForCurrentPage() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const skip = this.getState().perPage * (this.getState().currentPage - 1);
    const response = await fetch(
      `/api/v1/articles?limit=${this.getState().perPage}&skip=${skip}`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      isLoading: false,
    });
  }
}

export default Catalog;
