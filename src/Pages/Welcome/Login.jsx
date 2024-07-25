import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/state';
import { login } from '../../data/auth';

const Login = () => {
  const { setToken } = useAppContext();
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
      console.log('Response from login:', res); // Log the response to see its content
      if (res && res.valid) {
        setToken(res.token);
        navigate('/'); // Navigate to the desired page after login
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={handleSubmit}>
          <h1 className="title">Welcome Back!</h1>
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
            <div className="control">
              <button className="button is-link is-light" type="button">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;