import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';

const Layout = () => {
  return <>
    <Outlet />
  </>
}

const router = createBrowserRouter([{
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <h1>Seymusum</h1>
    },
    {
      path: '/login',
      element: <LoginFormPage />
    }
  ]
}])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
