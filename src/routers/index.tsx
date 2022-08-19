import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Catalog } from "../pages/Catalog";
import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";

const PrivateRoute = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const PublicRoute = () => {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/catalog" replace />;
  }
  return <Outlet />;
};

export const Routers = () => {
  const { accessToken } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          accessToken ? (
            <Navigate to="/catalog" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/" element={<PublicRoute />}>
        <Route path="/cadastro" element={<SingUp />} />
        <Route path="/login" element={<SingIn />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/*" element={<Navigate to="/catalog" replace />} />
      </Route>
    </Routes>
  );
};
