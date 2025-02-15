import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Swal from "sweetalert2";

import Pagination from "../../../components/admin/Pagination";
import Loader from "../../../components/common/Loader";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function AdminProductsList() {
  const [products, setProducts] = useState([]);
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 產品處理
  // 取得產品資料函式
  const [pagination, setPagination] = useState({});
  const getProductsData = async (page = 1) => {
    try {
      setLoadingState(true);
      const result = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/products?page=${page}`
      );
      const { products } = result.data;
      setPagination(result.data.pagination);
      setProducts(products);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 刪除產品函式
  const deleteProductsData = (id) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoadingState(true);
          await axios.delete(
            `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product/${id}`
          );
          Swal.fire({
            title: "產品刪除成功",
            icon: "success",
          });
          getProductsData();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
          });
        } finally {
          setLoadingState(false);
        }
      }
    });
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 產品列表</title>
      </Helmet>
      {loadingState && <Loader />}

      <div className="container">
        <div className="text-end mt-6">
          <NavLink
            to="/admin/product/add"
            type="button"
            className="btn btn-primary"
          >
            建立新的產品
          </NavLink>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120" className="text-end">
                原價
              </th>
              <th width="120" className="text-end">
                售價
              </th>
              <th width="100">是否啟用</th>
              <th width="120">操作</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(products).length > 0 ? (
              Object.values(products).map((item) => (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  <td className="text-end">
                    <del>{item.origin_price}</del>
                  </td>
                  <td className="text-end">{item.price}</td>
                  <td>
                    {item.is_enabled === 1 ? (
                      <span className="text-success">啟用</span>
                    ) : (
                      <span>未啟用</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group">
                      <NavLink
                        to={`/admin/product/${item.id}/edit`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        編輯
                      </NavLink>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteProductsData(item.id)}
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">尚無產品資料</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination pagination={pagination} getProductsData={getProductsData} />
      </div>
    </>
  );
}
