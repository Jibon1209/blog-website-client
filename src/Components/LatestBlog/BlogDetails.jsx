import { Button, Label, Spinner, Textarea } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Comment from "../Comment/Comment";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user.email;
  const userPhoto = user?.photoURL;
  const userName = user?.displayName;

  const { _id, title, image, shortDescription, longDescription, author } =
    useLoaderData();

  const [commentText, setCommentText] = useState("");

  const resetForm = () => {
    document.getElementById("commentForm").reset();
  };
  const handleComment = (e) => {
    e.preventDefault();
    const blogId = _id;
    const newComment = { blogId, userName, userPhoto, comment: commentText };
    axios.post(`${BASE_URL}/comments`, newComment).then((res) => {
      if (res.data.insertedId) {
        toast.success("Comment successfully");
        resetForm();
      }
    });
  };
  const {
    isLoading,
    error,
    data: comments,
  } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/comments?blogId=${_id}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner color="info" aria-label="Info spinner example" />;
  }
  if (error) {
    return toast.error(`Something went wrong with ${error.message}`);
  }

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
                onChange={(e) => setCommentText(e.target.value)}
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
      <div className="mt-10 md:w-1/2 items-center mx-auto">
        <h1 className="text-3xl font-semibold ml-2">Comments:</h1>
        <div className="flex flex-col rounded-xl mt-4  p-4 gap-4">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment}></Comment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
