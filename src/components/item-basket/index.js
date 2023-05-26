import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import CustomLink from '../UI/custom-link';
import { ROUTES } from '../../constants/routes';
import i18Obj from '../../i18Obj';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onCloseModal: () => props.onClose(),
    getArticleById: () => props.getArticleById(props.item._id),
  };

  const onLinkClick = () => {
    callbacks.onCloseModal();
    callbacks.getArticleById();
  };

  return (
    <div className={cn()}>
      <CustomLink
        to={ROUTES.ARTICLE}
        className={cn('title')}
        onClick={onLinkClick}
      >
        {props.item.title}
      </CustomLink>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {i18Obj[props.language].pcs}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {i18Obj[props.language].remove}
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
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {},
  getArticleById: () => {},
};

export default memo(ItemBasket);
