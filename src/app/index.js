import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../components/protected';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const select = useSelector((state) => ({
    activeModal: state.modals.name,
    isAuth: state.user.isAuth,
    userId: state.user.userProfile.id,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path={'/login'}
          element={
            <Protected
              isAuth={!select.isAuth}
              to={`/profile/:${select.userId}`}
            >
              <Login />
            </Protected>
          }
        />
        <Route
          path={'/profile/:id'}
          element={
            <Protected isAuth={select.isAuth} to={'/login'}>
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
