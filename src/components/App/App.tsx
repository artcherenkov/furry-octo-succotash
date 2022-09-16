import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import MainPage from "../../pages/Main/Main";
import { setWidgets } from "../../store/slices/app-state";
import { WIDGET } from "../../mocks/data";
import { useAppDispatch } from "../../store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWidgets([WIDGET]));
  }, []);

  return (
    <Box>
      <Header />
      <Box m={3}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
