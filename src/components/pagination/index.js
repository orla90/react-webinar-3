import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { createPagesArray } from '../../utils';

function Pagination(props) {
  const cn = bem('Pagination');
  const pages = createPagesArray(props.currentPage, props.totalPagesCount);

  const pageNumber = +useParams()['*'] || 1;

  useEffect(() => {
    props.onSetCurrentPage(pageNumber);
  }, [pageNumber]);

  const handleOnClick = (e) => {
    if (e.target.innerText !== '...') {
      props.onSetCurrentPage(+e.target.innerText);
    }
  };

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        {pages.map((page, index) => (
          <Link
            to={`${page}`}
            onClick={handleOnClick}
            className={cn('link')}
            key={index}
          >
            <li
              className={
                page === '...'
                  ? cn('item', { disabled: true })
                  : props.currentPage === page
                  ? cn('item', { active: true })
                  : cn('item', { default: true })
              }
            >
              {page}
            </li>
          </Link>
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
