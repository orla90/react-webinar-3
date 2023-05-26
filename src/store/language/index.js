import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      language: 'ru',
    };
  }

  async setLanguage(lang) {
    this.setState(
      {
        ...this.getState(),
        language: lang,
      },
      'Переключен язык'
    );
  }
}

export default Language;
