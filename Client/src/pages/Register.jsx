import React, { useState } from 'react';
import '../styles/Register.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isArtist, setIsArtist] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/register', { name, email, password, profilePhoto, isArtist }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setName('');
        setEmail('');
        setPassword('');
        setProfilePhoto(null);
        setIsArtist(false);
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
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
          <label>Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            name="profilePhoto"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
          <br/>
          <label>
            <input
              type="checkbox"
              checked={isArtist}
              onChange={(e) => setIsArtist(e.target.checked)}
            />
            Register as an Artist
          </label>
          <br/>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
