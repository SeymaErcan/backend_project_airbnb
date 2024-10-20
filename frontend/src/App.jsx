import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Correctly import useDispatch
import Homepage from './components/Homepage/Homepage';
import Navigation from './components/Navigation/Navigation';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import ManageSpotsPage from './components/ManageSpotsPage/ManageSpotsPage';
import SpotDetailsPage from './components/SpotDetailsPage/SpotDetailsPage';
import CreateSpotFormPage from './components/CreateSpotFormPage/CreateSpotFormPage';
import * as sessionActions from './store/session';
import EditSpotFormPage from './components/EditSpotFormPage/EditSpotFormPage';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/signup',
        element: <SignupFormModal />
      },
      {
        path: '/login',
        element: <LoginFormModal />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotFormPage />
      },
      {
        path: '/spots/:spotId',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <SpotDetailsPage />
          },
          {
            path: '/spots/:spotId/edit',
            element: <EditSpotFormPage />
          }
        ]
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
