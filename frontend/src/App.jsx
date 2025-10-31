import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/AdminDashboard";
import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";
import UserList from "./pages/UserList";
import StoreList from "./pages/StoreList";
import Navbar from "./componets/Navbar";
import OwnerUpdatePassword from "./componets/OwnerUpdatePassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserLayout from "./layouts/UserLayout";
import UserStores from "./pages/UserStores";
import UpdatePassword from "./pages/UpdatePassword";
import StoreDashboard from "./pages/StoreDashboard";
import StoreLayout from "./layouts/StoreLayout";


function App() {
  return (
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <AdminLayout>
              <AddUser />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <AdminLayout>
              <StoreList />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UserList />
            </AdminLayout>
          }
        />
              <Route
        path="/user/stores"
        element={
          <UserLayout>
            <UserStores />
          </UserLayout>
        }
      />
      <Route
        path="/user/update-password"
        element={
          <UserLayout>
            <UpdatePassword />
          </UserLayout>
        }
      />

      <Route
  path="/owner/dashboard"
  element={
    <StoreLayout>
      <StoreDashboard />
    </StoreLayout>
  }
/>
      <Route
  path="/owner/password"
  element={
    <StoreLayout>
      <OwnerUpdatePassword />
    </StoreLayout>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
