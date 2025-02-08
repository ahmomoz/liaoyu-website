import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../../components/common/Loader";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function ProductDetail() {
  // loading
  const [loadingState, setLoadingState] = useState(true);
  const { id } = useParams();

  // 取得產品資料函式
  const [productList, setProductList] = useState({ imagesUrl: [] });
  const getProductData = async () => {
    setLoadingState(true);
    try {
      const result = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`
      );
      setProductList(result.data.product);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 調整加入購物車的數量
  const [quantity, setQuantity] = useState(1);
  const handleQty = (e) => {
    setQuantity(e.target.value);
  };

  // 將產品加進購物車函式
  const addToCart = async () => {
    setLoadingState(true);
    try {
      const item = {
        data: {
          product_id: productList.id,
          qty: parseInt(quantity),
        },
      };
      const result = await axios.post(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`,
        item
      );
      Swal.fire({
        title: result.data.message,
        icon: "success",
      });
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
    getProductData();
  }, []);

  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 商品列表</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="container-fluid pt-6 pb-5 py-xl-6 px-3 px-xl-5 px-xxl-8">
        <nav className="mb-3 mb-xl-4" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-hover" to="/">
                首頁
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <NavLink
                className="text-decoration-none link-hover"
                to="/products"
              >
                所有商品
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {productList.title}
            </li>
          </ol>
        </nav>
        <section className="row mt-3" data-aos="fade-up">
          <div className="col-xl-12">
            <div className="mb-2">
              <h1>
                {productList.nation}｜{productList.title}
              </h1>
              <div className="d-flex justify-content-between my-3 my-xl-4">
                <div>
                  <span className="fs-lg-5 bg-primary text-light rounded rounded-pill py-1 px-3 me-3">
                    {productList.category}
                  </span>
                  <i className="fs-lg-4 bi bi-qr-code"></i>
                  <span className="fs-lg-4">
                    {productList.nation} {productList.area}
                  </span>
                </div>
                <div className="d-flex align-items-end">
                  <span className="d-none d-lg-block">
                    商品ID {productList.id}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <img
                className="w-100 object-fit mb-3"
                src={productList.imageUrl}
                alt="product-img"
              />
              <div className="d-flex" style={{ overflowX: "auto" }}>
                {productList.imagesUrl.slice(0, 5).map((img) => (
                  <img
                    className="object-fit me-2"
                    src={img}
                    alt="product-img"
                    key={img}
                    style={{ width: "200px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="row flex-column-reverse flex-xl-row"
          data-aos="fade-up"
        >
          <div className="col-12 col-xl-8 mt-xl-3">
            <div className="fs-5 d-xl-flex ps-1 py-3 mb-xl-3">
              <div className="mx-xl-3 me-xl-5">
                <i className="bi bi-pin-fill"></i>
                時限內可免費取消
              </div>
              <div className="mt-2 mt-sm-0">
                <i className="bi bi-pin-fill"></i>
                票券類商品請現場出示QRcode
              </div>
            </div>
            <hr />
            <div className="py-3">
              <p className="fs-5 white-space-pre-line my-auto">
                {productList.content}
              </p>
            </div>
            <hr />
            <div className="my-3">
              <div className="d-flex my-4">
                <i className="fs-4 text-primary me-2 bi bi-stars"></i>
                <h2 className="fs-4 my-auto fw-bolder">商品介紹</h2>
              </div>
              <p className="fs-5 lh-lg white-space-pre-line">
                {productList.description}
              </p>
            </div>
            <div className="my-3">
              <div className="d-flex my-5">
                <i className="fs-4 text-primary me-2 bi bi-stars"></i>
                <h2 className="fs-4 my-auto fw-bolder">使用地點</h2>
              </div>
              <div
                className="position-relative"
                style={{ paddingBottom: "56.25%", height: "0" }}
              >
                <iframe
                  src={productList.addressEmbedCode}
                  width="800"
                  height="400"
                  className="border-0 position-absolute top-0 start-0 w-100 h-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <hr />
            <div className="bg-light mt-4 px-3 px-xl-5 py-4 rounded-5">
              <div className="d-flex my-xl-4">
                <i className="fs-5 text-gray me-2 bi bi-pin-fill"></i>
                <h2 className="fs-5 my-auto">注意事項</h2>
              </div>
              <ul className="fs-5 lh-lg white-space-pre-line">
                ‧若購買商品為票券時
                <li>
                  請於進入園區時，使用入口處的自動驗票閘門掃描您的QR
                  code，以完成入園手續。
                </li>
                <li>
                  已購買本電子票券的遊客，請務必攜帶智慧型手機，並出示您的二維碼進行掃描，
                  以確保順利進入園區。請不要印製電子票券。
                </li>
                <li>如需在同一天內多次進出園區，請至出口處取得再入園手章。</li>
                <li>
                  請留意，園區內的所有設施與表演活動可能因天候等因素而有所更改或暫停營運，故無法提前通知。
                </li>
                <li>此票券僅適用於園區的一般營業日，不適用於特別營業時間。</li>
                <li>
                  旅客必須在電子券所指定的日期前往指定的園區參觀，無法自行更改入園日期或園區。
                </li>
                <li>
                  若您在訂購後在票券有效期內需要取消訂單或變更人數、票種、園區或入園日期等資訊，
                  請透過電話或電子郵件聯繫客服人員。
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-xl-4 my-3 mt-xl-3">
            <div
              className="card position-sticky shadow-sm p-5"
              style={{ top: "5rem" }}
            >
              <div className="mb-3 text-end">
                <span>
                  <del>
                    NT${productList.origin_price}元/{productList.unit}{" "}
                  </del>
                </span>
                <span className="fs-3 d-flex flex-nowrap justify-content-end">
                  NT${productList.price}元/{productList.unit}
                </span>
              </div>
              <div className="input-group mb-3 border mt-3">
                <input
                  className="form-control border-0 text-center my-auto shadow-none"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQty}
                />
              </div>
              <div className="d-flex flex-column flex-xxl-row justify-content-xxl-end mt-xl-3">
                <button
                  href="#"
                  className="btn btn-primary btn-block rounded-0 py-2 ms-xxl-2"
                  onClick={addToCart}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
