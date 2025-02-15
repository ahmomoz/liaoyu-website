import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../components/common/Loader";

const { VITE_API_BASE } = import.meta.env;

export default function AdminHeader() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // 驗證身分
  const loginCheck = async (token) => {
    setLoadingState(true);
    try {
      axios.defaults.headers.common.Authorization = token;
      await axios.post(`${VITE_API_BASE}/api/user/check`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "驗證錯誤",
        text: error.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 登出
  const signOut = () => {
    document.cookie = "authToken=;expires=;";
    Swal.fire({
      title: "已登出",
      icon: "success",
    });
    navigate("/login");
  };

  // 首次進入頁面執行
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    ) || null;

    if (token) {
      loginCheck(token);
    } else {
      Swal.fire({
        icon: "warning",
        title: "未登入",
        text: "請先登入以檢視產品資料。",
      });
      navigate("/login");
    }
  },[]);

  return (
    <>
      {loadingState && <Loader />}

      <nav className="navbar navbar-expand-lg navbar-light fixed-top ps-lg-7 py-3 bg-white opacity-75">
        <div className="container-fluid">
          {/* 手動控制漢堡選單 */}
          <button
            className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`navbar-collapse collapse ${isOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <NavLink
                  to="/admin"
                  className="nav-link link-hover text-dark fs-5"
                >
                  後台首頁
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  to="/admin/products-list"
                  className="nav-link link-hover text-dark fs-5"
                >
                  產品列表
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink to="/" className="nav-link link-hover text-dark fs-5">
                  返回前台
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <button
                  type="button"
                  className="nav-link link-hover text-dark fs-5"
                  onClick={signOut}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
