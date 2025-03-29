import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './Pages/Users';
import Login from './Pages/Login';
import EditUser from './Pages/EditUser';
import { UserProvider } from './Context/UserContext';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    { path: "/", element: <Users /> },
    { path: "/edit", element: <EditUser /> },
    { path: "/login", element: <Login /> }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={appRouter} />
    </UserProvider>
  </React.StrictMode>
);

