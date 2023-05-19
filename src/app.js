import React, { useCallback, useEffect, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();

  const [cartSum, setCartSum] = useState(0);
  const [isCartOpened, setIsCartOpened] = useState(false);

  useEffect(() => {
    let sum = 0;
    cart.forEach((el) => {
      sum += list.find((item) => item.code === el.code).price * el.count;
    });
    setCartSum(sum);
  }, [cart]);

  const onOpenCart = () => {
    if (!isCartOpened) {
      setIsCartOpened(!isCartOpened);
    }
  };

  const onCloseCart = () => {
    if (isCartOpened) {
      setIsCartOpened(!isCartOpened);
    }
  };

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItemToCart: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store]
    ),

    onDeleteItemFromCart: useCallback(
      (code) => {
        store.deleteItemFromCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        type='open-cart'
        cart={cart}
        сartSum={cartSum}
        onOpenCart={onOpenCart}
      />
      <List
        list={list}
        type='app-list'
        onDeleteItem={callbacks.onDeleteItemFromCart}
        onAddItemToCart={callbacks.onAddItemToCart}
      />
      {isCartOpened && (
        <Modal>
          <Cart
            onCloseCart={onCloseCart}
            cart={cart}
            list={list}
            сartSum={cartSum}
            onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
