import { Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Event } from "../pages/Event";

export const publicRoutes = [
  { path: "login", element: <Login /> },
  { path: "*", element: <Navigate to={"/login"} /> },
];
export const privateRoutes = [
  { path: "/", element: <Event /> },
  { path: "*", element: <Navigate to={"/"} /> },
];
