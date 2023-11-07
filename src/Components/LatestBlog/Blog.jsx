import { Button, Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { toast } from "react-toastify";

const Blog = ({ blog }) => {
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
  return (
    <Card className="max-w-full mt-20" imgAlt="Blog Image" imgSrc={image}>
      <h1 className="text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {category}
      </h1>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {shortDescription}
      </p>
      <div className="flex justify-center items-center gap-6">
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
    </Card>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
