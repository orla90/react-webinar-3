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

  async setListForCurrentPage([currentPage = 1, perPage = 10]) {
    const skip = perPage * (currentPage - 1);
    const response = await fetch(
      `/api/v1/articles?limit=${perPage}&skip=${skip}`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
    });
  }
}

export default Catalog;
