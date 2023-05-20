import React from 'react';
import Controls from '../controls';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import { getLocaleCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  const initialCodes = props.cart.cartList.map((item) => item.code);
  const initialCartList = props.list.filter((item) =>
    initialCodes.includes(item.code)
  );

  return (
    <div className={cn()}>
      <header className={cn('header')}>
        <h2 className={cn('title')}>Корзина</h2>
        <Controls
          type='close-cart'
          cart={props.cart}
          onCloseCart={props.onCloseCart}
        />
      </header>
      <div className={cn('content')}>
        <List list={initialCartList} cart={props.cart}>
          <CartItem onDeleteItemFromCart={props.onDeleteItemFromCart} />
        </List>
        {initialCartList.length > 0 ? (
          <div className={cn('total')}>
            <span className={cn('total__title')}>Итого</span>
            <span className={cn('total__currency')}>
              {getLocaleCurrency(props.cart.totalSum)}
            </span>
          </div>
        ) : (
          <h2 className={cn('empty')}>В корзине пока нет товаров</h2>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cart: PropTypes.object.isRequired,
  onCloseCart: PropTypes.func,
  onDeleteItemFromCart: PropTypes.func,
};

Cart.defaultProps = {
  onCloseCart: () => {},
  onDeleteItemFromCart: () => {},
};

export default React.memo(Cart);
