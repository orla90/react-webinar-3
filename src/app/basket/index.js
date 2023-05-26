import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import i18Obj from '../../i18Obj';

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Получить статью по id
    getArticleById: useCallback(
      (_id) => store.actions.articles.getArticleById(_id),
      [store]
    ),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onClose={callbacks.closeModal}
            getArticleById={callbacks.getArticleById}
            language={select.language}
          />
        );
      },
      [callbacks.removeFromBasket, select.language]
    ),
  };

  return (
    <ModalLayout
      title={i18Obj[select.language].basket}
      onClose={callbacks.closeModal}
      language={select.language}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} language={select.language} />
    </ModalLayout>
  );
}

export default memo(Basket);
