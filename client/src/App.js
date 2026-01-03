import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import Signup from "./pages/Signup";
import UserProfile from './pages/UserProfile';
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import PublicRoute from "./components/PublicRoute";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes (ONLY when logged out) */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateTrip />} />
            <Route path='/profile' element ={<UserProfile/>}/>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
