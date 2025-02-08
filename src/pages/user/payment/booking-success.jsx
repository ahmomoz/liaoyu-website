import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function BookingSuccess() {
  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 訂購成功</title>
      </Helmet>

      <main className="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
    <div className="text-center mt-5">
      <img className="img-fluid" src="images/cart-step/step3.png" alt="step-img" />
    </div>
    <div className="row text-center">
      <div className="py-5 col-md-12">
        <h2>已成功送出訂單</h2>
        <p>非常感謝您的訂購，有任何問題歡迎來信詢問。</p>
        <NavLink to="/" className="btn btn-outline-dark me-2 rounded-0">回到首頁</NavLink>
      </div>
    </div>
  </main>
    </>
  );
}
