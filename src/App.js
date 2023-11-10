import './App.css';
import Navbar from "./components/Navbar/Navbar.js";
import Main from "./pages/main/Main";
import History from "./pages/history/History";
import Map from './pages/map/Map';
import Auth from './pages/auth/Auth';
import PrivateRoute from './private-route/PrivateRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    { path: "/auth", element: <Auth/>},
    { path: "/", element: <PrivateRoute><Wrapper child={<Map/>}/></PrivateRoute>},
    { path: "/history", element: <PrivateRoute><Wrapper child={<History/>}/></PrivateRoute>},
    { path: "/dashboard", element: <PrivateRoute><Wrapper child={<Main/>}/></PrivateRoute>},
  ])
  return (
    <RouterProvider router={router}/>
  );
}

const Wrapper = ({child}) => {
  return (
    <div className="App font-sans flex w-screen h-screen overflow-auto font-sans">
      <Navbar/>
      <div className="p-7 w-full">
        {child}
      </div>
    </div>
  );
}

export default App;
