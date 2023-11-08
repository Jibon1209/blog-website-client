import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { toast } from "react-toastify";
import WishBlog from "./WishBlog";
import { useState } from "react";
import SkeletonCard from "../Skeleton/SkeletonCard";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user.email;
  const [blogs, setBlogs] = useState([]);

  const { isLoading, error } = useQuery({
    queryKey: ["wishlist", currentUser],
    queryFn: () =>
      axios.get(`${BASE_URL}/wishlists?email=${currentUser}`).then((res) => {
        setBlogs(res.data);
        return res.data;
      }),
  });

  if (error) {
    return toast.error(`Something went wrong with ${error.message}`);
  }
  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/wishlists/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Sign In successfully");
        const remaining = blogs.filter((book) => book._id !== id);
        setBlogs(remaining);
      }
    });
  };
  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center">
        Wishlist
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((d, i) => <SkeletonCard key={i} />)
          : blogs.map((blog) => (
              <WishBlog
                key={blog._id}
                blog={blog}
                blogInfo={blog.blogsInfo[0]}
                handleDelete={handleDelete}
              ></WishBlog>
            ))}
      </div>
    </div>
  );
};

export default Wishlist;
