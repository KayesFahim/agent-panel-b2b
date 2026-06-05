import { Navigate, useLocation } from 'react-router-dom';
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import getAuthToken from '../../Token/getAuthToken';

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const user = secureLocalStorage.getItem('user-info');
  const admin = secureLocalStorage.getItem('admin-info');
  const token = getAuthToken();

  // Check if there is no user or no user token, redirect to the sign-in page
  if ((user === null || !token) && !admin?.email) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // If both admin and user information exist, render the children components
  return children;
};

export default PrivateRoute;
