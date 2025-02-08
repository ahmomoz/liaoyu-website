import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";

import FormInput from "./FormInput";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function UserForm({
  cartList,
  getCartListData,
  setLoadingState,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      tel: "",
      address: "",
      message: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();

  // 送出訂單
  const onSubmit = async (data) => {
    setLoadingState(true);
    const { email, name, tel, address } = data;
    const form = {
      data: {
        user: { email, name, tel, address },
        message: data.message,
      },
    };
    try {
      const result = await axios.post(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/order`,
        form
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 700,
      });
      reset();
      getCartListData();
      navigate("/booking-success")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message
      })
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-3">
        <FormInput
          register={register}
          errors={errors}
          id="email"
          labelText="收件人信箱"
          type="email"
          rules={{
            required: {
              value: true,
              message: "收件人信箱為必填",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email 格式不正確",
            },
          }}
        />
      </div>

      <div className="mb-3">
        <FormInput
          register={register}
          errors={errors}
          id="name"
          labelText="收件者名稱"
          type="text"
          rules={{
            required: {
              value: true,
              message: "收件者名稱為必填",
            },
          }}
        />
      </div>

      <div className="mb-3">
        <FormInput
          register={register}
          errors={errors}
          id="tel"
          labelText="電話"
          type="tel"
          rules={{
            required: {
              value: true,
              message: "電話為必填",
            },
            minLength: {
              value: 8,
              message: "電話不少於 8 碼",
            },
            maxLength: {
              value: 12,
              message: "電話不多於 12 碼",
            },
          }}
        />
      </div>

      <div className="mb-3">
        <FormInput
          register={register}
          errors={errors}
          id="address"
          labelText="地址"
          type="text"
          rules={{
            required: {
              value: true,
              message: "地址為必填",
            },
          }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          留言
        </label>
        <textarea
          id="message"
          className="form-control"
          cols="30"
          rows="10"
          {...register("message")}
        ></textarea>
      </div>
      <div className="text-end">
        {cartList.length === 0 && (
          <p className="text-danger">請先加入商品到購物車</p>
        )}
        {!isValid && <p className="text-danger">請確認所有必填欄位已填寫</p>}
        <button
          type="submit"
          className="btn btn-danger"
          disabled={cartList.length === 0 || !isValid}
        >
          送出訂單
        </button>
      </div>
    </form>
  );
}

UserForm.propTypes = {
  cartList: PropTypes.array.isRequired,
  getCartListData: PropTypes.func.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};