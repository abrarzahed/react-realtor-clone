import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, loadingStatus } = useAuthStatus();

  if (loadingStatus) {
    return <h3>Loading...</h3>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
