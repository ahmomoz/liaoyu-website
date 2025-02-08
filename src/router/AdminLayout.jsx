import PropTypes from "prop-types";

import AdminHeader from "../components/layout/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
