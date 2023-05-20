import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import AppItem from './components/app-item';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();

  const [isCartOpened, setIsCartOpened] = useState(false);

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
      <Controls type='open-cart' cart={cart} onOpenCart={onOpenCart} />
      <List list={list}>
        <AppItem onAddItemToCart={callbacks.onAddItemToCart} />
      </List>
      {isCartOpened && (
        <Modal>
          <Cart
            onCloseCart={onCloseCart}
            cart={cart}
            list={list}
            onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
