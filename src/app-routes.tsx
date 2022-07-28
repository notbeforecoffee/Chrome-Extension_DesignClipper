import { Route, Routes } from 'react-router-dom';
import WebForm from './pages/webForm/Form';



const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<WebForm />} /> 
    </Routes>
  );
};

export default AppRoutes;
