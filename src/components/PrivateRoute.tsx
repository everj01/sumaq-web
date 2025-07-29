import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = (): boolean => {
  // Aquí decides tu lógica real de sesión (ejemplo: token en localStorage)
  return !!localStorage.getItem("auth_token_user");
};

export default function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
