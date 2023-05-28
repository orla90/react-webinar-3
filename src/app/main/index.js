import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import FlexContainer from '../../components/flex-container';
import CustomLink from '../../components/UI/custom-link';
import Pagination from '../../components/pagination';
import i18Obj from '../../i18Obj';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.pagination.currentPage,
    perPage: state.pagination.perPage,
    totalPagesCount: state.pagination.totalPagesCount,
    language: state.language.language,
  }));

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.pagination.getTotalPagesCount();
  }, []);

  useEffect(() => {
    store.actions.catalog.setListForCurrentPage([
      select.currentPage,
      select.perPage,
    ]);
  }, [select.currentPage, select.perPage]);

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
      (page) => store.actions.pagination.setCurrentPage(page),
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
        <CustomLink to={select.currentPage? `${select.currentPage}`: ROUTES.HOME}>{i18Obj[select.language].home}</CustomLink>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          language={select.language}
        />
      </FlexContainer>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onSetCurrentPage={callbacks.setCurrentPage}
        currentPage={select.currentPage}
        totalPagesCount={select.totalPagesCount}
      />
    </PageLayout>
  );
}

export default memo(Main);
