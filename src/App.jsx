import { Routes, Route } from "react-router-dom";
import { routes } from "./router/routes";
import { useRouteConfig } from "./router/useRouteConfig";

import UserLayout from "./router/UserLayout";
import AdminLayout from "./router/AdminLayout";

function App() {
  const { shouldShowHeaderFooter, shouldShowToTopBtn, isAdminRoute } =
    useRouteConfig();

  return (
    <>
      {isAdminRoute ? (
        <AdminLayout>
          <Routes>
            {routes
              .filter((route) => route.path.startsWith("/admin"))
              .map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
          </Routes>
        </AdminLayout>
      ) : (
        <UserLayout
          showHeaderFooter={shouldShowHeaderFooter}
          showToTopBtn={shouldShowToTopBtn}
        >
          <Routes>
            {routes
              .filter((route) => !route.path.startsWith("/admin"))
              .map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
          </Routes>
        </UserLayout>
      )}
    </>
  );
}

export default App;
