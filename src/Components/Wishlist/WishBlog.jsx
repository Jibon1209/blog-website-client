import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PhotoView } from "react-photo-view";

const WishBlog = ({ blog, blogInfo, handleDelete }) => {
  const { _id: blogId } = blog;
  const { _id, title, image, category, shortDescription } = blogInfo;
  return (
    <PhotoView src={image}>
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
            onClick={() => handleDelete(blogId)}
            className="bg-accent hover:bg-accentDark font-bold"
          >
            Wishlist
          </Button>
        </div>
      </Card>
    </PhotoView>
  );
};
WishBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogInfo: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default WishBlog;
