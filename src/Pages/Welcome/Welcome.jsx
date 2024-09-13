import React from 'react';
import Login from './Login';
import Register from './SignUp';
// import './welcome.css'; 

function Welcome() {
  return (
    <div>
    
      <div className='page-header'>
        <h1 class='page-header-title'>Welcome to Socii</h1>
        <div class="welcome-info">Let's Plan Your Next Adventure</div>
      </div>
      
        <div className="page-container">
        {/* <div className="section-container-for-message">
        With Socii you can to plan trips with others in one convenient app. We can't wait to see where you go next!
        </div>
        <div className="section-container-for-messages">
        Please log in or register below to continue
        </div> */}
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