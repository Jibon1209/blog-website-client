import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { toast } from "react-toastify";
import Blog from "./Blog";
import SkeletonCard from "../Skeleton/SkeletonCard";

const LatestBlogs = () => {
  const {
    isLoading,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      axios.get(`${BASE_URL}/blogs`).then((res) => {
        return res.data;
      }),
  });
  if (error) {
    return toast.error(`Something went wrong with ${error.message}`);
  }
  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center">
        Latest Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((d, i) => <SkeletonCard key={i} />)
          : blogs.map((blog) => <Blog key={blog._id} blog={blog}></Blog>)}
      </div>
    </div>
  );
};

export default LatestBlogs;
