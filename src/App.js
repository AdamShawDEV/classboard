import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import ClassGrid from "./components/ClassGrid";
import StudentGrid from "./components/StudentGrid";
import { AuthProvider } from "./components/hooks/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";


function App() {
  return (
    <AuthProvider>
      <div className="pageContent">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/classes" element={<ProtectedRoute redirect='/' component={<ClassGrid />} />} />
            <Route path="/class/:id" element={<StudentGrid />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
