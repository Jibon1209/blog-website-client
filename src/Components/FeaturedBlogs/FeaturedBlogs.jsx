import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/utils";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import TopPostsTable from "./TopPostsTable";

const FeaturedBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const { isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/all/blogs`);
      setBlogPosts(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner color="info" aria-label="Info spinner example" />;
  }
  if (error) {
    return toast.error(`Something went wrong with ${error.message}`);
  }
  const sortedBlogPosts = blogPosts.sort((a, b) => {
    const wordCountA = a.longDescription.split(" ").length;
    const wordCountB = b.longDescription.split(" ").length;
    return wordCountB - wordCountA;
  });
  const topPosts = sortedBlogPosts.slice(0, 10);

  return (
    <div className="px-4 mt-20 mb-40">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center mb-10">
        Top 10 Posts
      </h1>
      <TopPostsTable data={topPosts} />
    </div>
  );
};

export default FeaturedBlogs;
