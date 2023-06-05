import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../containers/protected';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(
    () => {
      store.actions.user.checkIsAuth();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    activeModal: state.modals.name,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path={'/login'}
          element={
            <Protected to={`/profile`} isAuth={true}>
              <Login />
            </Protected>
          }
        />
        <Route
          path={'/profile'}
          element={
            <Protected to={'/login'} isAuth={false}>
              <Profile />
            </Protected>
          }
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
