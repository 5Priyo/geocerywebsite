import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userRole } = useAuth();

  return allowedRoles.includes(userRole) ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
