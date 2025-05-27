import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile.jsx';
import Create from './pages/Create.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/create',
        element: <Create />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
