import React from 'react';
import Login from './Login';
import Register from './SignUp';
import './welcome.css'; 

function Welcome() {
  return (
    <div>
      <nav>
        {/* Navigation content */}
      </nav>
      <header className='page-header'>
        <h1>Welcome</h1>
        <p>This is the welcome page for our React application</p>
      </header>
      
        <div className="page-container">
          <Login />
          <Register />
        </div>
     
      <footer>
        <p>© 2024 Designs by Squid</p>
      </footer>
    </div>
  );
}

export default Welcome;