import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { createPagesArray } from '../../utils';

function Pagination(props) {
  const cn = bem('Pagination');
  const pages = createPagesArray(props.currentPage, props.totalPagesCount);

  const handleOnClick = (e) => {
    if (e.target.innerText !== '...') {
      props.onSetCurrentPage(+e.target.innerText);
    }
  };

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        {pages.map((page, index) => (
          <li
            key={index}
            onClick={handleOnClick}
            className={
              page === '...'
                ? cn('item', { disabled: true })
                : props.currentPage === page
                ? cn('item', { active: true })
                : cn('item', { default: true })
            }
          >
            <a className={cn('link')}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  onSetCurrentPage: PropTypes.func.isRequired,
  totalPagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  onSetCurrentPage: () => {},
};

export default memo(Pagination);
