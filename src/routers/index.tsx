import { Route, Routes } from "react-router-dom";
import { Catalog } from "../pages/Catalog";
import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/cadastro" element={<SingUp />} />
      <Route path="/login" element={<SingIn />} />
      <Route path="/" element={<Catalog />} />
    </Routes>
  );
};
