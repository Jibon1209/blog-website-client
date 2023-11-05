import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" max-w-screen-2xl mx-auto font-manrope">
        <NavBar />
        <Outlet />
        <ToastContainer position="bottom-right" />
      </div>
    </QueryClientProvider>
  );
};
