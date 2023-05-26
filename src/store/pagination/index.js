import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 1,
      perPage: 10,
      totalPagesCount: 0,
    };
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
}

export default Pagination;
