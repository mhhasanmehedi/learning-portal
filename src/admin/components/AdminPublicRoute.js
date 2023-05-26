import { Navigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";

const AdminPublicRoute = ({ children }) => {
  const isLoggedIn = useAdminAuth();

  return !isLoggedIn ? children : <Navigate to="/admin/dashboard" />;
};

export default AdminPublicRoute;
