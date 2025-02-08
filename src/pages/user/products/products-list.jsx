import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../../components/common/Loader";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function ProductsList() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 取得產品資料
  const [productsList, setProductsList] = useState([]);
  const getProductsData = async () => {
    setLoadingState(true);
    try {
      const result = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`
      );
      setProductsList(result.data.products);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 商品列表</title>
      </Helmet>
      {loadingState && <Loader />}

      <header className="container-fluid bg-light pt-6 pb-5 py-xl-8 px-3 px-xl-7">
        <nav className="mb-3 mb-xl-5" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink
                href="/"
                className="active text-decoration-none link-hover"
              >
                首頁
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              所有商品
            </li>
          </ol>
        </nav>
        <p className="fs-xl-3 text-gray my-0 ms-5">Products</p>
        <h2 className="lh-base fs-xl-1 text-gray">
          <img
            src="images/image/leaf-primary.png"
            alt="leaf-primary-icon"
            className="img-fluid"
          />{" "}
          所有商品
        </h2>
        <div className="w-xl-50 d-flex justify-content-between bg-white rounded-pill mt-4 px-3 px-lg-4 py-lg-3 shadow-sm">
          <i className="bi bi-search my-auto"></i>
          <input
            className="fs-5 form-control border-0"
            type="search"
            placeholder="想找些什麼呢？"
          />
        </div>
      </header>

      <main className="container-fluid mt-4 mt-xl-5 px-xl-7">
        <section className="d-flex">
          <a
            to="/products"
            className="col nav-link link-hover border text-center shadow-sm py-3 m-2"
          >
            <p className="fs-xl-3 my-auto">所有商品</p>
          </a>
          <a className="col nav-link link-hover border text-center shadow-sm py-3 m-2">
            <p className="fs-xl-3 my-auto">動物園</p>
          </a>
          <a className="col nav-link link-hover border text-center shadow-sm py-3 m-2">
            <p className="fs-xl-3 my-auto">動物聚落</p>
          </a>
          <a className="col nav-link link-hover border text-center shadow-sm py-3 m-2">
            <p className="fs-xl-3 my-auto">動物農場</p>
          </a>
          <a className="col nav-link link-hover border text-center shadow-sm py-3 m-2">
            <p className="fs-xl-3 my-auto">水族館</p>
          </a>
          <a className="col nav-link link-hover border text-center shadow-sm py-3 m-2">
            <p className="fs-xl-3 my-auto">鳥園</p>
          </a>
        </section>

        <section className="row my-4 my-xl-5">
          <nav className="col-xl-3">
            <div
              className="position-sticky border d-none d-xl-block"
              style={{ top: "5rem" }}
            >
              <div className="p-4">
                <h3 className="fw-500">依地區篩選</h3>
                <h4 className="fw-500 mt-xl-4">台灣</h4>
                <div className="form-check">
                  <input
                    className="form-check-input fs-5 mt-xl-3"
                    type="checkbox"
                  />
                  <label className="form-check-label fs-5 mt-xl-2">
                    台北市
                  </label>
                </div>
              </div>
              <div className="p-4">
                <h4 className="fw-500 mt-xl-4">日本</h4>
                <div className="form-check">
                  <input
                    className="form-check-input fs-5 mt-xl-3"
                    type="checkbox"
                  />
                  <label className="form-check-label fs-5 mt-xl-2">長野</label>
                </div>
              </div>
            </div>
          </nav>

          <main className="col-xl-9">
            <div className="dropdown d-flex justify-content-center justify-content-xl-end">
              <p className="fs-xl-5 my-auto me-3">排序方式</p>
              <button
                className="btn btn-outline-primary fs-xl-5 py-2 px-4 dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "200px" }}
              >
                最新上架
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item fs-5" href="#">
                    最新上架
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="accordion px-3 mt-3 d-block d-xl-none"
              id="accordionExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed py-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <i className="bi bi-funnel"></i>地區篩選
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body d-flex justify-content-around py-4">
                    <div className="">
                      <h4 className="fs-5 fw-500 mt-xl-4">台灣</h4>
                      <div className="form-check">
                        <input
                          className="form-check-input mt-xl-3"
                          type="checkbox"
                        />
                        <label className="form-check-label mt-xl-2"></label>
                      </div>
                    </div>
                    <div>
                      <h4 className="fs-5 fw-500 mt-xl-4">日本</h4>
                      <div className="form-check">
                        <input
                          className="form-check-input mt-xl-3"
                          type="checkbox"
                        />
                        <label className="form-check-label mt-xl-2"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {productsList.length !== 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {productsList.map((product) => (
                  <div className="col mt-4" key={product.id}>
                    <NavLink to={`/product/${product.id}`} className="text-decoration-none">
                      <div className="card h-100 mb-4 border-0 shadow-sm product-card-hover">
                        <div className="position-relative">
                          <div>
                            <span
                              className="fs-5 text-dark bg-white ps-2 opacity-75 position-absolute"
                              style={{ top: "15px", zIndex: "2" }}
                            >
                              <i className="bi bi-geo-alt-fill"></i>
                              {product.nation}
                              {product.area}
                            </span>
                            <img
                              src={product.imagesUrl[0]}
                              style={{ height: "240px", zIndex: "1" }}
                              className="card-img-top object-fit-cover"
                              alt="product-img"
                            />
                          </div>
                        </div>
                        <div className="card-body">
                          <span className="fs-5 text-primary">
                            <i className="bi bi-play-fill"></i>
                            {product.category}
                          </span>
                          <h4 className="card-text text-dark my-2 link-hover">
                            {product.title}
                          </h4>
                          <p>{product.feature}</p>
                          <p className="fs-5 text-primary fw-bolder">
                            <del style={{ color: "rgb(108, 105, 105)" }}>
                              NT${product.origin_price}
                            </del>
                            <br />
                            NT${product.price}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                <div className="col text-center m-5 py-10 bg-light">
                  <h2>此類別目前無商品</h2>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-center mt-4 mt-xl-6">
              {/* <CardPagination :pagination="pagination" /> */}
            </div>
          </main>
        </section>
      </main>
    </>
  );
}
