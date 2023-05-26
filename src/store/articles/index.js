import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      article: {},
    };
  }

  async getArticleById(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        article: {
          ...this.getState().article,
          _id: json.result._id,
          title: json.result.title,
          description: json.result.description,
          country: json.result.madeIn.title,
          edition: json.result.edition,
          category: json.result.category.title,
          price: json.result.price,
        },
      },
      'Получена статья о товаре'
    );
  }
}

export default Article;
