import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="max-w-screen-2xl mx-auto font-manrope">
      <Outlet />
    </div>
  );
};
