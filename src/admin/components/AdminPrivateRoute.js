import { Navigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";

const AdminPrivateRoute = ({ children }) => {
  const isLoggedIn = useAdminAuth();

  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
