import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import i18Obj from '../../i18Obj';
import './style.css';

function Item({ item, language, onAdd, getArticleById, to=`article/${item._id}` }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
    getArticleById: () => getArticleById(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={to}
          onClick={callbacks.getArticleById}
          className={cn('link')}
        >
          {item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd} className={cn('btn')}>
          {i18Obj[language].add}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  getArticleById: PropTypes.func,
  language: PropTypes.string,
  to: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  getArticleById: () => { },
};

export default memo(Item);
