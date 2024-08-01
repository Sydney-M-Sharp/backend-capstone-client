import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../data/auth';
import { useAppContext } from '../../context/state';
import './welcome.css'; // Import the CSS file

const Register = () => {
  const { setToken, setUserId } = useAppContext();
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
    };

    try {
      const res = await register(user);
      if (res && res.token) {
          setToken(res.token);
          setUserId(res.id);
        // Registration successful, redirect or notify user
        alert('Registration successful');
        navigate('/my-trips'); // Redirect to my trips page
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="section-container">
      <form className="box" onSubmit={handleSubmit}>
        <h3 className="title">Register</h3>
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
        <div className="field">
          <label className="label" htmlFor="first_name">First Name</label>
          <div className="control">
            <input
              id="first_name"
              className="input"
              type="text"
              ref={firstNameRef}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="last_name">Last Name</label>
          <div className="control">
            <input
              id="last_name"
              className="input"
              type="text"
              ref={lastNameRef}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <div className="control">
            <input
              id="email"
              className="input"
              type="email"
              ref={emailRef}
              required
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control-button">
            <button className="button" type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
