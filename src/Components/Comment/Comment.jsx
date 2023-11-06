import { Avatar } from "flowbite-react";
import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  const { userName, userPhoto, comment: message } = comment;

  return (
    <div className="flex gap-2">
      <div>
        <Avatar img={userPhoto} rounded bordered />
      </div>
      <div className="w-full rounded-xl p-2 shadow">
        <p className="text-xl font-semibold">{userName}</p>
        <h1>{message}</h1>
      </div>
    </div>
  );
};
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default Comment;
