import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import Signup from "./pages/Signup";
import ForgetPassword from './pages/ForgetPassword';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTrip />} />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}
