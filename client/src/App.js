import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./components/layout/Landing";
import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import AuthContextProvider from "./contexts/AuthContext";
import DashBoard from "../src/views/Dashboard";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
