import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom';
import i18Obj from '../../i18Obj';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket({item, language, onRemove, onClose, getArticleById, to=`article/${item._id}`}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => onRemove(item._id),
    onCloseModal: () => onClose(),
    getArticleById: () => getArticleById(item._id),
  };

  const onLinkClick = () => {
    callbacks.onCloseModal();
    callbacks.getArticleById();
  };

  return (
    <div className={cn()}>
      <Link
        to={to}
        className={cn('title')}
        onClick={onLinkClick}
      >
        {item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {i18Obj[language].pcs}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {i18Obj[language].remove}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
  getArticleById: propTypes.func,
  language: PropTypes.string,
  to: PropTypes.string,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {},
  getArticleById: () => { },
};

export default memo(ItemBasket);
