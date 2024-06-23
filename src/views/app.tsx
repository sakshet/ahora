import { Header } from "@Components/header";
import { AppStateProvider, ServerStateProvider } from "@Context/context";
import { Homepage } from "@Views/homepage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AppStateProvider>
        <ServerStateProvider>
          <AppContainer />
        </ServerStateProvider>
      </AppStateProvider>
    </div>
  );
};

const AppContainer = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </Router>
  );
};
