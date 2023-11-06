import { Button, Label, Textarea } from "flowbite-react";
import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user.email;
  const userPhoto = user?.photoURL;
  const userName = user?.displayName;

  const { _id, title, image, shortDescription, longDescription, author } =
    useLoaderData();
  const resetForm = () => {
    document.getElementById("commentForm").reset();
  };
  const handleComment = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const blogId = _id;
    const comment = form.get("comment");
    const newComment = { blogId, userName, userPhoto, comment };
    console.log(newComment);
    axios.post(`${BASE_URL}/comments`, newComment).then((res) => {
      if (res.data.insertedId) {
        toast.success("Comment successfully");
        resetForm();
      }
    });
  };
  return (
    <div className="mt-20 px-4">
      <h1 className="text-base px-4 md:text-3xl lg:text-4xl font-bold  text-center">
        {title}
      </h1>
      <img
        className="md:w-1/2 rounded-xl items-center mx-auto mt-10"
        src={image}
        alt=""
      />
      <div className="space-y-4 mt-10">
        <p className="lg:w-1/2 items-center mx-auto text-center">
          {shortDescription}
        </p>
        <p className="lg:w-1/2 items-center mx-auto text-center lg:text-start">
          {longDescription}
        </p>
      </div>
      <div className="mt-10">
        {currentUser === author ? (
          <>
            <p className="text-center text-3xl font-semibold mb-4">
              You can not comment on own blog
            </p>
            <Link to={`/blogsEdit/${_id}`}>
              <Button
                size="sm"
                className="items-center mx-auto bg-accent hover:bg-accentDark font-bold"
              >
                Update
              </Button>
            </Link>
          </>
        ) : (
          <form id="commentForm" onSubmit={handleComment}>
            <div className="max-w-md items-center mx-auto mt-10">
              <div className="mb-2 block">
                <Label className="font-bold" value="Your message" />
              </div>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
            <div className="mt-2">
              <Button
                className="uppercase items-center mx-auto rounded-lg bg-accent  text-white hover:bg-accentDark"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
