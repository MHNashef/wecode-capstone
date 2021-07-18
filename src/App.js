import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Routes from "./components/Routes";
import { AuthProvider } from "./AuthContext";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
