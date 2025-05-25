import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../Screens/Login/Login";
import Signup from "../Screens/Signup/Signup";
import Layout from '../Layout/Layout'
import EmployeeDashboard from "../Screens/EmployeeDashboard/EmployeeDashboard";
import ManagerDashboard from "../Screens/ManagerDashboard/ManagerDashboard";
import AdminDashboard from "../Screens/AdminDashboard/AdminDashboard";
import AuthGuard from '../components/AuthGuard';

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <AuthGuard>
            <Login />
          </AuthGuard>
        } />
        <Route path="/signup" element={
          <AuthGuard>
            <Signup />
          </AuthGuard>
        } />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route path='/request-access' element={<EmployeeDashboard />} />
          <Route path='/pending-requests' element={<ManagerDashboard />} />
          <Route path='/create-software' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
