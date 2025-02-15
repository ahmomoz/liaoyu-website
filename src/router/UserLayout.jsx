import { Outlet, useMatch } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTopBtn from "../components/layout/ScrollToTopBtn";
import ScrollToTop from "../components/layout/ScrollToTop";
import MessageToast from "../components/common/MessageToast";

export default function UserLayout() {
  // 使用 `useMatch` 來判斷當前路由
  const isLoginPage = useMatch("/login");
  const isBookingPage = useMatch("/booking");

  // 根據匹配結果決定是否顯示 Header/Footer 或 返回頂部按鈕
  const showHeaderFooter = !isLoginPage;
  const showToTopBtn = !isBookingPage;

  return (
    <>
      <MessageToast />
      <ScrollToTop />
      {showHeaderFooter && <Header />}
      <Outlet />
      {showToTopBtn && <ScrollToTopBtn />}
      {showHeaderFooter && <Footer />}
    </>
  );
}
