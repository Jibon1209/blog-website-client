import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Components/NavBar/NavBar";

export const Root = () => {
  return (
    <div className=" max-w-screen-2xl mx-auto font-manrope">
      <NavBar />
      <Outlet />
      <ToastContainer position="bottom-right" />
    </div>
  );
};
