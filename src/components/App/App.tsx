import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import MainPage from "../../pages/Main/Main";
import LoginPage from "../../pages/Login/Login";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuth } from "../../store/slices/app-state";

const ProtectedRoute = ({
  user,
  redirectTo,
  children,
}: {
  user: boolean;
  redirectTo: string;
  children: React.ReactElement;
}) => {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

function App() {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <Box>
      <Header />
      <Box m={3}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={isAuth} redirectTo="/login">
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!isAuth} redirectTo="/">
                  <LoginPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
