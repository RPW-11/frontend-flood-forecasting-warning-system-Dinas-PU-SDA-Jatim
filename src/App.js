import './App.css';
import Navbar from "./components/Navbar/Navbar.js";
import Main from "./pages/main/Main";
import History from "./pages/history/History";
import Map from './pages/map/Map';
import Auth from './pages/auth/Auth';
import Admin from './pages/admin/Admin.js';
import NotFound from './components/NotFound.js';
import PrivateRoute from './private-route/PrivateRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    { path: "/auth", element: <Auth/>},
    { path: "/", element: <Wrapper child={<Map/>}/>},
    { path: "/history/:stasiun", element: <Wrapper child={<History/>}/>},
    { path: "/dashboard/:stasiun", element: <Wrapper child={<Main/>}/>},
    { path: "/admin", element: <PrivateRoute><Wrapper child={<Admin/>}/></PrivateRoute>},
    { path: "*", element: <NotFound/>}
  ], { basename: '/ffwsview' })
  return (
    <RouterProvider router={router}/>
  );
}

const Wrapper = ({child}) => {
  return (
    <div className="App font-sans flex w-screen h-screen overflow-auto font-sans">
      <Navbar/>
      <div className="p-5 w-full">
        {child}
      </div>
    </div>
  );
}

export default App;
