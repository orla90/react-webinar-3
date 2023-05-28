import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      article: {},
      isLoading: true,
    };
  }

  async getArticleById(id) {
    this.setState(
      {
        ...this.getState(),
        isLoading: true,
      });
    
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
          code: json.result.madeIn.code,
          edition: json.result.edition,
          category: json.result.category.title,
          price: json.result.price,
        },
        isLoading: false,
      },
      'Получена статья о товаре'
    );
  }
}

export default Article;
