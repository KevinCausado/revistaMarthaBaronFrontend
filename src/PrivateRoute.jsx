import { Navigate } from 'react-router-dom';
import { UseAuth } from 'contexts/ConfigContext';
import { BASE_URL_LOGIN } from './config/constant';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = UseAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al login
    return <Navigate to={BASE_URL_LOGIN} />;
  }

  // Si está autenticado, renderizar el componente hijo
  return children;
};

export default PrivateRoute;
