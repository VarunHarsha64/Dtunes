import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setEmail('');
        setPassword('');
        toast.success('Login successful');
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      toast.error('Retry Login');
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <br />
          <p onClick={redirectToRegister} className='register-redirect'>Do not have an account? Sign Up here!</p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
