import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

export default function PrivateRoute(props) {
  const { loggedIn, loadingStatus } = useAuthStatus();

  if (loadingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to={props.path} />;
}
