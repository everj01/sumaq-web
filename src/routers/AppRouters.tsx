import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Perfil from '../pages/Perfil';
import Map from '../pages/Map';
import PrivateRoute from '../components/PrivateRoute';
import NotFound from '../pages/NotFound';


function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/register" element={<Welcome />} />

      <Route element={<PrivateRoute />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/map" element={<Map />} />
        <Route path="/addPost" element={<Map />} />
      </Route>
    </Routes>
    </>
    
  );
}

export default AppRoutes;