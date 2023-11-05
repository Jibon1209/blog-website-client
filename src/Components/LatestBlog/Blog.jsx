import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const { _id, title, image, shortDescription } = blog;
  return (
    <Card className="max-w-full mt-20" imgAlt="Blog Image" imgSrc={image}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {shortDescription}
      </p>
      <div className="flex justify-center items-center gap-6">
        <Link>
          <Button className="bg-accent hover:bg-accentDark font-bold">
            Details
          </Button>
        </Link>
        <Link>
          <Button className="bg-accent hover:bg-accentDark font-bold">
            Wishlist
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default Blog;
