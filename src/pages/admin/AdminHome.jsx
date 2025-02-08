import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginCheck } from "../../slice/authSlice";

export default function AdminHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginCheck());
  }, [dispatch]);

  return (
    <>
      <div className="pt-8">
        <h1>這是後台首頁</h1>
      </div>
    </>
  );
}
