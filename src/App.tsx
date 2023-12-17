import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/Home';
import LoginPage from './features/Auth/Login';
import NotFoundPage from './features/NotFoundPage';
import useRefreshToken from './hooks/useRefreshToken';
import BaseLayout from './components/layout/BaseLayout';
import LoadingPage from './services/UI/LoadingPage';
import { ToastContainer } from 'react-toastify';

function AppUI() {
  const { loading, shield } = useRefreshToken();
  if (loading) return null;

  return (
    <React.Fragment>
      <Routes>
        <Route path='/private' element={shield(BaseLayout)}>
          <Route path='home' element={<HomePage />} />
        </Route>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={<LoginPage />} />
       
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppUI />
      <LoadingPage />
      <ToastContainer />
    </Provider>
  );
}

export default App;
