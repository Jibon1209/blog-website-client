import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import Blog from "../LatestBlog/Blog";

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user.email;
  const {
    isLoading,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/all/blogs?email=${currentUser}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  if (isLoading) {
    return <Spinner color="info" aria-label="Info spinner example" />;
  }
  if (error) {
    return toast.error(`Something went wrong with ${error.message}`);
  }

  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center">
        All Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
