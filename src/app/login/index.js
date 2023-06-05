import { memo, useEffect, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useSelector from '../../hooks/use-selector';
import LocaleSelect from '../../containers/locale-select';
import ProfilePanel from '../../containers/profile-panel';
import LoginForm from '../../containers/login-form';
import Spinner from '../../components/spinner';
import { useNavigate } from 'react-router-dom';

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    waiting: state.user.waiting,
  }));

  const callbacks = {
    getProfileData: useCallback(() => store.actions.profile.getProfileData(), [store]),
    resetErrorMessage: useCallback(() => store.actions.user.resetErrorMessage(), [store]),
  };

  useEffect(() => {
    callbacks.getProfileData();
  }, []);
  
  useEffect(() => {
    callbacks.resetErrorMessage();
  }, [navigate]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <ProfilePanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
