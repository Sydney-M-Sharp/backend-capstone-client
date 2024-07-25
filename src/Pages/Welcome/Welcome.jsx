import React from 'react';
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useRef } from 'react'
import Login from './Login';

function Welcome() {
  return (
    <div>
      <nav>
        
      </nav>
      <main>
        <h1>Welcome Page</h1>
        <p>This is the welcome page for our React application.</p>
      </main>
      <Login />
      <footer>
        <p>© 2023 My React App</p>
      </footer>
    </div>
  );
}

export default Welcome;