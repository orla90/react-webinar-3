import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { Link } from 'react-router-dom';
import SideLayout from '../../components/side-layout';
import BottomBordered from '../../components/bottom-bordered';

function ProfilePanel() {
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    callbacks.checkIsAuth();
  }, []);

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    user: state.user.user,
  }));

  const callbacks = {
    checkIsAuth: useCallback(
      () => store.actions.user.checkIsAuth(),
      [store]
    ),
    logoutUser: useCallback(() => store.actions.user.logoutUser(), [store]),
  };

  const onLogin = () => {
    navigate('/login');
  };

  const { t } = useTranslate();

  return (
    <BottomBordered bottom={'grey'}>
      <SideLayout padding='mixed-small' side='end'>
        {!select.isAuth ? (
          <button onClick={onLogin}>{t('profile.in')}</button>
        ) : (
          <>
            <Link to={`/profile`}>{select.user.name}</Link>
            <button onClick={callbacks.logoutUser} style={{ marginLeft: 20 }}>
              {t('profile.out')}
            </button>
          </>
        )}
      </SideLayout>
    </BottomBordered>
  );
}

export default memo(ProfilePanel);
