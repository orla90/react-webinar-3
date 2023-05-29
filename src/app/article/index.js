import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import MainMenu from '../../components/main-menu';
import BasketTool from '../../components/basket-tool';
import ArticleMain from '../../components/article-main';
import Spinner from '../../components/spinner';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import FlexContainer from '../../components/flex-container';
import i18Obj from '../../i18Obj';

function Article() {
  const store = useStore();

  const select = useSelector((state) => ({
    article: state.articles.article,
    isLoading: state.articles.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
    currentPage: state.catalog.currentPage,
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

    getArticleById: useCallback(
      (_id) => store.actions.articles.getArticleById(_id),
      [store]
    ),
  };

  const ArticleId = useParams()['id'];

  useEffect(() => {
    callbacks.getArticleById(ArticleId);
  }, [ArticleId]);

  return (
    <PageLayout>
      <Head
        title={select.article.title}
        language={select.language}
        setLanguage={callbacks.setLanguage}
      />
      <FlexContainer>
        <MainMenu
          menu={[
            {
              to: select.currentPage ? `/${select.currentPage}` : `/`,
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
      {!select.isLoading ? (
        <ArticleMain
          article={select.article}
          onAdd={callbacks.addToBasket}
          language={select.language}
        />
      ) : (
        <Spinner />
      )}
    </PageLayout>
  );
}

export default memo(Article);
