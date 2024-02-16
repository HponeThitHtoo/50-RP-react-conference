import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import Location from './pages/Location';
import Food from './pages/Food';
import Schedule from './pages/Schedule';
import Rules from './pages/Rules';
import ProtectedRoute from './admin/pages/ProtectedRoute';
import DashboardSharedLayout from './admin/pages/DashboardSharedLayout';
import AdminHome from './admin/pages/AdminHome';
import Register from './admin/pages/Register';
import AdminSpeakers from './admin/pages/AdminSpeakers';
import AddSpeaker from './admin/pages/AddSpeaker';
import AdminRules from './admin/pages/AdminRules';
import AddRule from './admin/pages/AddRule';
import AdminLocation from './admin/pages/AdminLocation';
import EditLocation from './admin/pages/EditLocation';
import AdminFood from './admin/pages/AdminFood';
import AddFood from './admin/pages/AddFood';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="location" element={<Location />} />
        <Route path="food" element={<Food />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="rules" element={<Rules />} />
      </Route>
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <DashboardSharedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="speakers">
          <Route index element={<AdminSpeakers />} />
          <Route path="add" element={<AddSpeaker />} />
          <Route path="edit/:speakerId" element={<AddSpeaker edit />} />
        </Route>
        <Route path="rules">
          <Route index element={<AdminRules />} />
          <Route path="add" element={<AddRule />} />
          <Route path="edit/:ruleId" element={<AddRule edit />} />
        </Route>
        <Route path="location">
          <Route index element={<AdminLocation />} />
          <Route path="edit" element={<EditLocation />} />
        </Route>
        <Route path="foods">
          <Route index element={<AdminFood />} />
          <Route path="edit/:foodId" element={<AddFood />} />
        </Route>
      </Route>
      <Route path="admin/register" element={<Register />} />
    </Routes>
  );
}

function WrappedApp() {
  // return <div className="bg-blue-400 text-2xl text-yellow-600">TESTING</div>;
  return (
    <BrowserRouter>
      <App />
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default WrappedApp;
