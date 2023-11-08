import { Button, Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Blog = ({ blog }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
  });
  const animation = useAnimation();
  const { user } = useContext(AuthContext);
  const currentUser = user?.email;
  const navigate = useNavigate();

  const { _id, title, image, category, shortDescription } = blog;

  const handleWishlist = () => {
    const blogId = _id;
    const userEmail = currentUser;
    const newWishlist = { blogId, userEmail };

    if (currentUser === undefined) {
      navigate("/signin");
    } else {
      axios.post(`${BASE_URL}/wishlists`, newWishlist).then((res) => {
        if (res.data.insertedId) {
          toast.success("Added wishlist successfully");
        }
      });
    }
  };
  useEffect(() => {
    console.log(inView);
    if (inView) {
      animation.start({
        rotate: 360,
        scale: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
          stiffness: 260,
          damping: 20,
        },
      });
    }
    if (!inView) {
      animation.start({ scale: 0 });
    }
  }, [inView]);
  return (
    <Card className="max-w-full  mt-20" imgAlt="Blog Image" imgSrc={image}>
      <div ref={ref}>
        <motion.div animate={animation}>
          <h1 className="text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            {category}
          </h1>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {shortDescription}
          </p>
          <div className="flex justify-center items-center mt-4 gap-6">
            <Link to={`/blogDetails/${_id}`}>
              <Button className="bg-accent hover:bg-accentDark font-bold">
                Details
              </Button>
            </Link>
            <Button
              onClick={handleWishlist}
              className="bg-accent hover:bg-accentDark font-bold"
            >
              Wishlist
            </Button>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
