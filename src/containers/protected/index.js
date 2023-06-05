import { memo } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Protected({ children, to, isAuth }) {
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
  }));

  if (select.isAuth === isAuth) {
    return <Navigate to={to} replace />;
  }
  return children;
}

Protected.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  isAuth: PropTypes.bool,
};

Protected.defaultProps = {
  to: '/',
};

export default memo(Protected);
