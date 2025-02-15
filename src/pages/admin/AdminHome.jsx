import { Helmet } from "react-helmet-async";

export default function AdminHome() {
  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 後台首頁</title>
      </Helmet>
      <div className="pt-8">
        <h1>這是後台首頁</h1>
      </div>
    </>
  );
}
