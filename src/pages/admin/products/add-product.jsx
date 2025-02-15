import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../../components/common/Loader";
import FormInput from "../../../components/FormInput";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function AddProduct() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const navigate = useNavigate();

  // 回上一頁
  const toPrevPage = () => {
    navigate(-1);
  };

  // 驗證規則
  const schema = z.object({
    title: z.string().min(5, "標題至少要 5 個字元"),
    feature: z.string().min(10, "特色至少要 10 個字元"),
    nation: z.string().min(1, "地區為必填"),
    area: z.string().min(1, "縣市為必填"),
    address: z.string().min(1, "地區為必填"),
    addressEmbedCode: z.string().min(1, "地址嵌入碼為必填"),
    category: z.string().min(1, "地區為必填"),
    unit: z.string().min(1, "單位為必填"),
    origin_price: z.coerce.number().min(1, "原價為必填"),
    price: z.coerce.number().min(1, "售價為必填"),
    description: z.string().min(10, "產品描述至少要 10 個字元"),
    content: z.string().min(10, "說明內容至少要 10 個字元"),
    is_enabled: z.coerce.number(),
  });

  // 表單
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // 新增產品函式
  const onSubmit = async (data) => {
    setLoadingState(true);
    try {
      await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product`, {
        data: { ...data, ...temImage },
      });
      Swal.fire({
        title: "產品新增成功",
        icon: "success",
      });
      navigate("/admin/products-list");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  const [temImage, setTemImage] = useState({
    imageUrl: "",
    imagesUrl: [],
  });
  // 上傳圖片函式
  const imgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "請選擇檔案",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file-to-upload", file);
    try {
      setLoadingState(true);
      const result = await axios.post(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/upload`,
        formData
      );
      const url = result.data?.imageUrl;
      setTemImage((preData) => {
        if (!preData.imageUrl) {
          return { ...preData, imageUrl: url };
        } else if (!preData.imagesUrl || preData.imagesUrl.length === 0) {
          return { ...preData, imagesUrl: [url] };
        } else {
          return { ...preData, imagesUrl: [...(preData.imagesUrl || []), url] };
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "圖片上傳失敗，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 新增產品資料 input 更新狀態
  const handleProductInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTemImage((preData) => ({
      ...preData,
      [id]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "number"
          ? Number(value)
          : value,
    }));
  };
  // 新增產品資料 圖片更新
  const handleImageChange = (value, index) => {
    setTemImage((preData) => {
      const images = [...preData.imagesUrl];
      images[index] = value;
      return { ...preData, imagesUrl: images };
    });
  };
  // 移除圖片
  const handleRemoveImg = () => {
    setTemImage((preData) => {
      const images = [...preData.imagesUrl];
      images.pop();
      return { ...preData, imagesUrl: images };
    });
  };

  return (
    <>
      <Helmet>
        <title>療遇 - 動物輕旅行 ｜ 新增產品</title>
      </Helmet>
      {loadingState && <Loader />}

      <div className="container pt-6 pb-4">
        <h1 className="fs-3">新增產品</h1>

        <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="card mt-4 shadow-sm">
            <div className="card-header">
              <h5 className="my-1">圖片資訊</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                {temImage.imageUrl && (
                  <img
                    className="img-fluid mb-5"
                    style={{ width: "100px" }}
                    src={temImage.imageUrl}
                    alt="product-image"
                  />
                )}
                {temImage.imagesUrl && (
                  <>
                    {temImage.imagesUrl.map((image) => (
                      <img
                        className="img-fluid mb-5"
                        style={{ width: "100px" }}
                        src={image}
                        alt="product-image"
                        key={image}
                      />
                    ))}
                  </>
                )}

                <div>
                  <label htmlFor="imageUrl" className="form-label">
                    輸入圖片網址
                  </label>
                  <input
                    id="imageUrl"
                    type="text"
                    className="form-control mb-3"
                    placeholder="請輸入主圖連結"
                    value={temImage.imageUrl}
                    onChange={handleProductInputChange}
                  />
                </div>
                {temImage.imagesUrl.map((item, index) => (
                  <div className="mb-3" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入副圖連結"
                      value={item}
                      onChange={(e) => handleImageChange(e.target.value, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-3">
                {temImage.imagesUrl.length >= 1 && (
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={handleRemoveImg}
                  >
                    取消圖片
                  </button>
                )}
              </div>
              <div>
                <label htmlFor="fileInput" className="form-label">
                  上傳圖片
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="form-control"
                  id="fileInput"
                  onChange={imgUpload}
                />
              </div>
            </div>
          </div>

          <div className="card mt-4 shadow-sm">
            <div className="card-header">
              <h5 className="my-1">基本資訊</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <FormInput
                  id="title"
                  type="text"
                  labelText="標題"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="mb-3">
                <FormInput
                  id="feature"
                  type="text"
                  labelText="特色標語"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="nation"
                    type="text"
                    labelText="地區"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="area"
                    type="text"
                    labelText="縣市"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="address"
                    type="text"
                    labelText="地址"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="addressEmbedCode"
                    type="text"
                    labelText="地址嵌入碼"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="category"
                    type="text"
                    labelText="分類"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="unit"
                    type="text"
                    labelText="單位"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="origin_price"
                    type="number"
                    min="0"
                    labelText="原價"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <FormInput
                    id="price"
                    type="number"
                    min="0"
                    labelText="售價"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <hr />

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  產品描述
                </label>
                <textarea
                  id="description"
                  type="text"
                  className="form-control"
                  placeholder="請輸入產品描述"
                  rows="16"
                  {...register("description")}
                ></textarea>
                {errors?.description && (
                  <p className="text-danger">{errors?.description?.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  說明內容
                </label>
                <textarea
                  id="content"
                  type="text"
                  className="form-control"
                  placeholder="請輸入說明內容"
                  {...register("content")}
                ></textarea>
                {errors?.content && (
                  <p className="text-danger">{errors?.content?.message}</p>
                )}
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    id="is_enabled"
                    className="form-check-input"
                    type="checkbox"
                    {...register("is_enabled")}
                  />
                  <label className="form-check-label" htmlFor="is_enabled">
                    是否上架
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="text-end mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary mx-2"
              onClick={toPrevPage}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary text-light"
              disabled={!isValid}
            >
              確認新增
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
