import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FooterN from "../Components/Footer/FooterN";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const queryClient = new QueryClient();

export const Root = () => {
  return (
    <PhotoProvider
      speed={() => 800}
      easing={(type) =>
        type === 2
          ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
          : "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
    >
      <QueryClientProvider client={queryClient}>
        <div className=" max-w-screen-2xl mx-auto font-manrope">
          <NavBar />
          <Outlet />
          <FooterN />
          <ToastContainer position="bottom-right" />
        </div>
      </QueryClientProvider>
    </PhotoProvider>
  );
};
