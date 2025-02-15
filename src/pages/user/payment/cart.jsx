import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";

import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../../components/common/Loader";
import { createAsyncMessage } from "../../../slice/messageSlice";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function Cart() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // message toast
  const dispatch = useDispatch();

  // 刪除購物車內產品函式
  const deleteCartProduct = async (id) => {
    setLoadingState(true);
    try {
      const result = await axios.delete(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${id}`
      );
      dispatch(createAsyncMessage(result.data))
      getCartListData();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data))
    } finally {
      setLoadingState(false);
    }
  };

  // 刪除所有購物車內產品函式
  const deleteAllCartProducts = () => {
    Swal.fire({
      title: "確定要清空購物車嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingState(true);
        try {
          const result = await axios.delete(
            `${VITE_API_BASE}/api/${VITE_API_PATH}/carts`
          );
          dispatch(createAsyncMessage(result.data))
          getCartListData();
        } catch (error) {
          dispatch(createAsyncMessage(error.response.data))
        } finally {
          setLoadingState(false);
        }
      }
    });
  };

  // 更新購物車產品數量函式
  const updateCartNum = async (product_id, id, e) => {
    e.preventDefault();
    const newQty = parseInt(e.target.value);
    const item = {
      data: {
        product_id: product_id,
        qty: newQty,
      },
    };
    setLoadingState(true);
    try {
      const result = await axios.put(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${id}`,
        item
      );
      dispatch(createAsyncMessage(result.data))
      getCartListData();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data))
    } finally {
      setLoadingState(false);
    }
  };

  // 取得購物車資料函式
  const [cartList, setCartList] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const getCartListData = async () => {
    setLoadingState(true);
    try {
      const result = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`
      );
      setCartList(result.data.data.carts);
      setCartTotalPrice(result.data.data.final_total);
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
    getCartListData();
  }, []);

  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 購物車列表</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
        <div className="row mt-5">
          <div className="text-center">
            <img
              className="img-fluid"
              src="images/cart-step/step1.png"
              alt="step-img"
            />
          </div>
          {cartList.length !== 0 ? (
            <div className="card">
              <div className="card-header bg-white d-flex justify-content-between py-3 py-xl-5">
                <h2 className="my-auto">
                  <i className="bi bi-cart4 me-xl-2"></i>
                  商品購物車
                </h2>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={deleteAllCartProducts}
                >
                  清空購物車
                </button>
              </div>
              <div className="card-body table-responsive p-0 mt-5">
                <table className="table custom-table fs-6">
                  <thead>
                    <tr>
                      <th>商品資訊</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th className="text-end">小計</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.map((product) => (
                      <tr key={product.id}>
                        <td className="d-md-flex">
                          <img
                            src={product.product.imagesUrl[0]}
                            alt="product-img"
                            style={{ width: "80px" }}
                          />
                          <p className="ms-md-2">{product.product.title}</p>
                        </td>
                        <td>${product.product.price}</td>
                        <td style={{ width: "200px" }}>
                          <div className="input-group input-group-sm flex-nowrap">
                            <input
                              min="1"
                              step="1"
                              type="number"
                              className="form-control"
                              value={product.qty}
                              style={{ width: "50px" }}
                              onChange={(e) =>
                                updateCartNum(product.product_id, product.id, e)
                              }
                            />
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                            >
                              {product.product.unit}
                            </span>
                          </div>
                        </td>
                        <td className="text-end">
                          ${product.final_total.toFixed(0)}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger text-end"
                            type="button"
                            onClick={() => deleteCartProduct(product.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="input-group ms-auto mb-5"
                style={{ width: "200px" }}
              >
                <input
                  type="text"
                  className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                  placeholder="輸入折扣碼"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                    type="button"
                    id="button-addon2"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-end bg-white py-4">
                <div className="text-end">
                  <p className="m-0">總計金額</p>
                  <p className="fs-2 text-primary fw-bolder m-0">
                    NT$ {cartTotalPrice.toFixed(0)}
                  </p>
                </div>
                <NavLink
                  to="/booking"
                  className="btn btn-primary fs-5 text-white ms-3 p-3 shadow-sm"
                >
                  前往結帳
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="py-5">
              <h2 className="text-center">
                目前購物車無任何商品Q_Q
                <br />
                趕快來去選購吧
              </h2>
            </div>
          )}

          <div className="d-flex justify-content-end my-4">
            <NavLink
              to="/products-list"
              className="fs-5 text-decoration-none link-hover"
            >
              繼續購物
              <i className="bi bi-chevron-double-right"></i>
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
