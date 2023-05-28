import { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CustomLink from '../../components/UI/custom-link';
import BasketTool from '../../components/basket-tool';
import ArticleMain from '../../components/article-main';
import { ROUTES } from '../../constants/routes';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import FlexContainer from '../../components/flex-container';
import i18Obj from '../../i18Obj';

function Article() {
  const store = useStore();
  
  const select = useSelector((state) => ({
    article: state.articles.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
    currentPage: state.pagination.currentPage,
  }));
  
  const callbacks = {
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),

    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    setLanguage: useCallback(
      (lang) => store.actions.language.setLanguage(lang),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={select.article.title}
        language={select.language}
        setLanguage={callbacks.setLanguage}
      />
      <FlexContainer>
        <CustomLink to={select.currentPage ? `/${select.currentPage}`: ROUTES.HOME}>{i18Obj[select.language].home}</CustomLink>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          language={select.language}
        />
      </FlexContainer>
      <ArticleMain
        article={select.article}
        onAdd={callbacks.addToBasket}
        language={select.language}
      />
    </PageLayout>
  );
}

export default memo(Article);
