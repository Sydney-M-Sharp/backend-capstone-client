import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/state';
import { login } from '../../data/auth';
import './welcome.css'; // Import the CSS file

const Login = () => {
  const { setToken, setUserId } = useAppContext();
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await login(user);
      if (res && res.valid) {
        setToken(res.token);
        setUserId(res.id);
        navigate('/my-trips'); // Navigate to the desired page after login
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="section-container">
      <form className="box" onSubmit={handleSubmit}>
        <h3 className="title">Log In</h3>
        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <div className="control">
            <input
              id="username"
              className="input"
              type="text"
              ref={usernameRef}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <div className="control">
            <input
              id="password"
              className="input"
              type="password"
              ref={passwordRef}
              required
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
