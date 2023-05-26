import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { ROUTES } from '../constants/routes';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  
  return (
    <BrowserRouter>
      <Routes >
        <Route path={ROUTES.HOME} element={<Main />} />
        <Route path={ROUTES.ARTICLE} element={<Article />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
