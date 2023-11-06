import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { Button, Pagination, Select, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import Blog from "../LatestBlog/Blog";

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user.email;
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  console.log(pages);
  const { isLoading, error } = useQuery({
    queryKey: ["blogs", currentPage, itemsPerPage],

    queryFn: async () => {
      const [countRes, blogsRes] = await Promise.all([
        axios.get(`${BASE_URL}/blogsCount`),
        axios.get(
          `${BASE_URL}/all/blogs?email=${currentUser}&page=${currentPage}&size=${itemsPerPage}`,
          {
            withCredentials: true,
          }
        ),
      ]);

      setCount(countRes.data.count);
      setBlogs(blogsRes.data);
      console.log(blogsRes.data);
      return blogsRes.data;
    },
  });
  if (isLoading) {
    return <Spinner color="info" aria-label="Info spinner example" />;
  }
  if (error) {
    return toast.error(`Something went wrong with ${error.message}`);
  }
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl px-4 md:text-5xl font-bold  text-center">
        All Blogs
      </h1>
      <div className="flex justify-between mt-10 md:flex-row flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-[300px]">
            <Select id="category" required>
              <option>Select category</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="Travel">Travel</option>
            </Select>
          </div>
          <div>
            <Button className="bg-accent hover:bg-accentDark" size="sm">
              Search
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[300px]">
            <TextInput type="text" name="title" placeholder="Title" required />
          </div>
          <div>
            <Button className="bg-accent hover:bg-accentDark" size="sm">
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
      <div>
        <div className="flex overflow-x-auto justify-center mt-10 gap-4">
          <Button
            color="light"
            className=" font-bold"
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          {pages.map((page) => (
            <Button
              className={currentPage === page && "bg-accent"}
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </Button>
          ))}
          <Button color="light" className=" font-bold" onClick={handleNextPage}>
            Next
          </Button>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
