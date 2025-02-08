import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Loader from "../components/common/Loader";

const { VITE_API_BASE } = import.meta.env;

export default function Login() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 帳號密碼更新狀態
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 登入
  const navigate = useNavigate();
  const loginFn = async () => {
    setLoadingState(true);
    try {
      const result = await axios.post(
        `${VITE_API_BASE}/admin/signin`,
        formData
      );
      const { token, expired } = result.data;
      Cookies.set("accessToken", token, {
        expires: new Date(expired),
        path: "/",
      });
      axios.defaults.headers.common.Authorization = token;

      Swal.fire({
        title: "登入成功",
        icon: "success",
      });

      navigate("/admin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: error.response?.data?.message || "發生錯誤",
      });
    } finally {
      setLoadingState(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  // 首次進入頁面執行
  const token = Cookies.get("accessToken");
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "未登入",
        text: "請先登入以檢視產品資料。",
      });
      navigate("/login");
    } else {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 購物車列表</title>
      </Helmet>
      {loadingState && <Loader />}

      <div className="wrap pt-10">
        <div className="container login">
          <div className="row justify-content-center">
            <h1 className="h3 mb-5 font-weight-normal text-center">請先登入</h1>
            <div className="col-8">
              <form id="form" className="form-signin">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-primary w-100 mt-3"
                  type="button"
                  onClick={loginFn}
                >
                  登入
                </button>
              </form>
            </div>
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
      </div>
    </>
  );
}
