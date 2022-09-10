import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import MainPage from "../../pages/Main/Main";

function App() {
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
