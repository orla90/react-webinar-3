import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import FlexContainer from '../../components/flex-container';
import MainMenu from '../../components/main-menu';
import Pagination from '../../components/pagination';
import i18Obj from '../../i18Obj';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    catalog: state.catalog,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  useEffect(() => {
    store.actions.catalog.getTotalPagesCount();
    store.actions.catalog.setListForCurrentPage();
  }, []);

  useEffect(() => {
    store.actions.catalog.setListForCurrentPage();
  }, [select.catalog.currentPage, select.catalog.perPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),

    // Установить текущую страницу
    setCurrentPage: useCallback(
      (page) => store.actions.catalog.setCurrentPage(page),
      [store]
    ),
    // Получить статью по id
    getArticleById: useCallback(
      (_id) => store.actions.articles.getArticleById(_id),
      [store]
    ),
    // Установить язык
    setLanguage: useCallback(
      (lang) => store.actions.language.setLanguage(lang),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            getArticleById={callbacks.getArticleById}
            language={select.language}
          />
        );
      },
      [callbacks.addToBasket, select.language]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={i18Obj[select.language].store}
        language={select.language}
        setLanguage={callbacks.setLanguage}
      />
      <FlexContainer>
        <MainMenu
          menu={[
            {
              to: select.catalog.currentPage
                ? `/${select.catalog.currentPage}`
                : `/`,
              content: `${i18Obj[select.language].home}`,
            },
          ]}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          language={select.language}
        />
      </FlexContainer>
      {!select.catalog.isLoading && (
        <>
          <List list={select.catalog.list} renderItem={renders.item} />
          <Pagination
            onSetCurrentPage={callbacks.setCurrentPage}
            currentPage={select.catalog.currentPage}
            totalPagesCount={select.catalog.totalPagesCount}
          />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Main);
