import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfilePanel from '../../containers/profile-panel';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const select = useSelector((state) => ({
    isAuth: state.article.data,
    userProfile: state.profile.userProfile,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <ProfilePanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard profile={select.userProfile} t={t} />
    </PageLayout>
  );
}

export default memo(Profile);
