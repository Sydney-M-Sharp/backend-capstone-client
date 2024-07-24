import React from 'react';
import { useRoutes } from 'react-router-dom';
import Welcome from './Pages/Welcome/Welcome.jsx';


function Routes() {
  const routes = useRoutes([
    { path: '/', element: <Welcome /> },
  ]);

  return routes;
}

export default Routes;