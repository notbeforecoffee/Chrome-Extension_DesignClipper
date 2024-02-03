import ProductForm from '@pages/productForm/Form';
// import ProductForm from '@pages/productForm/FormMenu';
import { Route, Routes } from 'react-router-dom';
import RoomTray from './pages/roomTray/Room'
import Project from './pages/projectMenu/Project';
import App from 'app';



const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Project />} /> 
      <Route path='roomTray' element={<RoomTray /> } />
      <Route path='productForm' element={ <ProductForm />} />
      <Route path='login' element = {<App />} />
    </Routes>
  );
};

export default AppRoutes;
