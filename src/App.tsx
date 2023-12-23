import { Provider } from 'react-redux';
import store from './store';
import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './features/Room';
import LoginPage from './features/Auth/Login';
import NotFoundPage from './features/NotFoundPage';
import useRefreshToken from './hooks/useRefreshToken';
import BaseLayout from './components/layout/BaseLayout';
import LoadingPage from './services/UI/LoadingPage';
import { ToastContainer } from 'react-toastify';
import CustomerPage from './features/Customer';
import InvoicePage from './features/Invoice';
import QuickRoomPage from './features/Room/Forms/QuickRoom';
import ChatPage from './features/Chat';

function AppUI() {
  const { loading, shield } = useRefreshToken();
  if (loading) return null;

  return (
    <React.Fragment>
      <Routes>
        <Route path='/private' element={shield(BaseLayout)}>
          <Route path='room' element={<RoomPage />} />
          <Route path='quick-room' element={<QuickRoomPage />} />
          <Route path='chat' element={<ChatPage />} />
          <Route path='customer' element={<CustomerPage />} />
          <Route path='invoice' element={<InvoicePage />} />
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
