import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { getLocaleCurrency } from '../../utils';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      {props.type === 'add-item' && (
        <button onClick={() => props.onAdd()}>Добавить</button>
      )}
      {props.type === 'open-cart' && (
        <>
          <div className='Controls-description'>
            В корзине:
            {props.cart.length ? (
              <span className='Controls-description__amount'>
                {props.cart.length}{' '}
                {plural(props.cart.length, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                })}
                {' / '}
                {getLocaleCurrency(props.сartSum)}
              </span>
            ) : (
              <span className='Controls-description__empty'>пусто</span>
            )}
          </div>
          <button
            onClick={() => props.onOpenCart()}
            className='Controls-button'
          >
            Перейти
          </button>
        </>
      )}
      {props.type === 'close-cart' && (
        <button onClick={() => props.onCloseCart()}>Закрыть</button>
      )}
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  onOpenCart: PropTypes.func,
  onCloseCart: PropTypes.func,
  type: PropTypes.string.isRequired,
  сartSum: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {},
  onOpenCart: () => {},
  onCloseCart: () => {},
};

export default React.memo(Controls);
