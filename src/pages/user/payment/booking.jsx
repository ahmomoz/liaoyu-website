import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../../components/common/Loader";
import UserForm from "../../../components/UserForm";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function Booking() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 取得購物車資料函式
  const [cartList, setCartList] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartFinalTotalPrice, setCartFinalTotalPrice] = useState(0);
  const getCartListData = async () => {
    setLoadingState(true);
    try {
      const result = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`
      );
      setCartList(result.data.data.carts);
      setCartTotalPrice(result.data.data.total);
      setCartFinalTotalPrice(result.data.data.final_total);
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
        <title>療遇 - 動物輕旅行 ｜ 結帳</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
        <div className="text-center mt-5">
          <img
            className="img-fluid"
            src="images/cart-step/step2.png"
            alt="step-img"
          />
        </div>
        <div className="row flex-row-reverse justify-content-center pb-5">
          <div className="col-md-4">
            <div className="border bg-white p-4 mb-4">
              {cartList.map((product) => (
                <div className="d-flex mt-2" key={product.id}>
                  <img
                    src={product.product.imagesUrl[0]}
                    alt="product-img"
                    className="me-2"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{product.product.title}</p>
                      <p className="mb-0">NT${product.product.price}</p>
                    </div>
                    <p className="mb-0 fw-bold">x{product.qty}</p>
                  </div>
                </div>
              ))}

              <table className="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      小計
                    </th>
                    <td className="text-end border-0 px-0 pt-4">
                      NT${cartTotalPrice.toFixed(0)}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      折扣金額
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">
                      -NT${(cartFinalTotalPrice - cartTotalPrice).toFixed(0)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總計金額</p>
                <p className="mb-0 h4 fw-bold">
                  NT${cartFinalTotalPrice.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
          {/* 表單 */}
          <div className="col-md-6">
            <div className="row justify-content-center text-start bg-white px-3 py-4 ">
              <h2 className="mb-3">填寫訂購人資料</h2>
              <UserForm
                cartList={cartList}
                getCartListData={getCartListData}
                setLoadingState={setLoadingState}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
