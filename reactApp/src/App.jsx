import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { NavBar } from "./components/Navbar";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const { auth } = useSelector((state) => state.authorisation);
  return (
    <Layout>
      <Layout.Content>
        <NavBar />
        <Routes>
          {auth
            ? privateRoutes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={item.element}
                  />
                );
              })
            : publicRoutes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={item.element}
                  />
                );
              })}
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App;
