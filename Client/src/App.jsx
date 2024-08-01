import React from 'react';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from './context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to='/login' />;
};

const AppContent = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/*' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      </Routes>

      <div ></div>
    </>
  );
};

const App = () => (
  <AppContent />
);

export default App;
