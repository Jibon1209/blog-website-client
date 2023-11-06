import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { Spinner } from "flowbite-react";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Spinner color="info" aria-label="Info spinner example" />;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/signin"></Navigate>;
};
PrivetRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivetRoute;
