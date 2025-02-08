import { useLocation } from "react-router-dom";

export const useRouteConfig = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // 不需要 Header 與 Footer 的頁面（適用於前台特定頁面）
  const noHeaderFooterRoutes = ["/login"];

  // 不需要右下角往上跳轉按鈕的頁面（適用於前台特定頁面）
  const noToTopBtnRoutes = ["/booking"];

  const shouldShowHeaderFooter =
    !isAdminRoute && !noHeaderFooterRoutes.includes(location.pathname);
  const shouldShowToTopBtn =
    !isAdminRoute && !noToTopBtnRoutes.includes(location.pathname);

  return { shouldShowHeaderFooter, shouldShowToTopBtn, isAdminRoute };
};
