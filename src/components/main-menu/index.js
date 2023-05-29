import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

export const MainMenu = ({ menu }) => {
  const cn = bem('MainMenu');

  return (
    <nav>
      <ul className={cn('list')}>
        {menu.map((item) => (
          <li className={cn('list-item')} key={item.content}>
            <Link to={item.to} className={cn('link')}>
              {item.content}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

MainMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      content: PropTypes.string,
    })
  ).isRequired,
};

export default memo(MainMenu);
