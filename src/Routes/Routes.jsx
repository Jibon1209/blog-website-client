import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Layout/Root";
import NotFound from "../Components/NotFound";
import Home from "../Components/Home/Home";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import AddBlog from "../Components/Add Blog/AddBlog";
import PrivetRoute from "./PrivetRoute";
import AllBlogs from "../Components/AllBlogs/AllBlogs";
import BlogDetails from "../Components/LatestBlog/BlogDetails";
import { BASE_URL } from "../Components/utils/utils";
import UpdateBlogs from "../Components/Add Blog/UpdateBlogs";
import FeaturedBlogs from "../Components/FeaturedBlogs/FeaturedBlogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    //errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addBlog",
        element: (
          <PrivetRoute>
            <AddBlog />
          </PrivetRoute>
        ),
      },
      {
        path: "/allBlogs",
        element: (
          <PrivetRoute>
            <AllBlogs />
          </PrivetRoute>
        ),
      },
      {
        path: "/blogDetails/:id",
        element: (
          <PrivetRoute>
            <BlogDetails />
          </PrivetRoute>
        ),
        loader: ({ params }) => fetch(`${BASE_URL}/blogs/${params.id}`),
      },
      {
        path: "/blogsEdit/:id",
        element: (
          <PrivetRoute>
            <UpdateBlogs />
          </PrivetRoute>
        ),
        loader: ({ params }) => fetch(`${BASE_URL}/blogs/${params.id}`),
      },
      {
        path: "/featuredBlogs",
        element: (
          <PrivetRoute>
            <FeaturedBlogs />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
export default router;
