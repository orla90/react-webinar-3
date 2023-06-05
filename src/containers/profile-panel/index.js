import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { Link } from 'react-router-dom';
import SideLayout from '../../components/side-layout';

function ProfilePanel() {
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    callbacks.getProfileData();
  }, []);

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    userProfile: state.profile.userProfile,
  }));

  const callbacks = {
    getProfileData: useCallback(() => store.actions.profile.getProfileData(), [store]),
    logoutUser: useCallback(() => store.actions.user.logoutUser(), [store]),
  };

  const onLogin = () => {
    navigate('/login');
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding='mixed-small' side='end' bottom='grey'>
      {!select.isAuth ? (
        <button onClick={onLogin}>{t('profile.in')}</button>
      ) : (
        <>
          <Link to={`/profile`}>
            {select.userProfile.name}
          </Link>
          <button onClick={callbacks.logoutUser} style={{ marginLeft: 20 }}>
            {t('profile.out')}
          </button>
        </>
      )}
    </SideLayout>
  );
}

export default memo(ProfilePanel);
