import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './components/Home'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { DBProvider } from './DBProvider';
import CiferRu from './components/CiferRu'
import CiferKor from './components/CiferKor'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home />},
      { path: "home", element: <Home />},
      { path: "ciferRu", element: <CiferRu />},
      { path: "ciferKor", element: <CiferKor />}
    ]

  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DBProvider>
      <RouterProvider router={router} />
    </DBProvider>
  </React.StrictMode>
);

