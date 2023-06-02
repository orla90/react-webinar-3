import { memo } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function Protected({ isAuth, children, to }) {
  if (!isAuth) {
    return <Navigate to={to} replace />;
  }
  return children;
}

Protected.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
};

Protected.defaultProps = {
  to: '/',
};

export default memo(Protected);
