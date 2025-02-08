import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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

        <div className={`navbar-collapse collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <NavLink to="/admin" className="nav-link link-hover text-dark fs-5">
                後台首頁
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink to="/admin/products-list" className="nav-link link-hover text-dark fs-5">
                產品列表
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink to="/" className="nav-link link-hover text-dark fs-5">
                返回前台
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
