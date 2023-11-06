import { Card } from "flowbite-react";
import avatarPic from "../../assets/avatar.jpg";

const Writer = ({ writer }) => {
  const { name } = writer;
  return (
    <Card className="max-w-sm ">
      <div className="flex flex-col items-center">
        <img
          className="mb-3 rounded-full shadow-lg h-96 w-96"
          src={avatarPic}
          alt=""
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>
      </div>
    </Card>
  );
};

export default Writer;
