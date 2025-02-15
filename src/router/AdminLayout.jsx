import { Outlet } from "react-router-dom";

import AdminHeader from "../components/layout/AdminHeader";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet /> 
    </>
  );
}