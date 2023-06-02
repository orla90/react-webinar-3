import { memo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Form from '../../components/form';
import Title from '../../components/title';
import Error from '../../components/error';

function LoginForm() {
  const store = useStore();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector((state) => ({
    errorMessage: state.user.errorMessage,
  }));

  const callbacks = {
    onLoginUser: useCallback(
      () => store.actions.user.loginUser({ login, password }),
      [login, password]
    ),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callbacks.onLoginUser();
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding='form'>
      <Form onSubmit={onSubmit}>
        <Title title={t('profile.in')} />
        <Input
          value={login}
          onChange={(e) => setLogin(e)}
          type='text'
          label={t('login.login')}
          theme='middle'
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e)}
          type='password'
          label={t('login.password')}
          theme='middle'
        />
        {select.errorMessage && <Error>{select.errorMessage}</Error>}
        <button type='submit' style={{ maxWidth: 53 }}>
          {t('profile.in')}
        </button>
      </Form>
    </SideLayout>
  );
}

export default memo(LoginForm);
