import axios from "axios";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/utils";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user.email;
  const resetForm = () => {
    document.getElementById("blogForm").reset();
  };
  const handleAddBlog = (e) => {
    e.preventDefault();
    const selectCategory = document.getElementById("category");
    const form = new FormData(e.currentTarget);
    const title = form.get("title");
    const image = form.get("image");
    const category = selectCategory.value;
    const shortDescription = form.get("short");
    const longDescription = form.get("long");
    const author = currentUser;
    const newBlogs = {
      title,
      image,
      category,
      shortDescription,
      longDescription,
      author,
    };
    axios.post(`${BASE_URL}/blogs`, newBlogs).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Blog added successfully");
        resetForm();
      }
    });
  };
  return (
    <form
      id="blogForm"
      onSubmit={handleAddBlog}
      className="flex max-w-xl justify-center items-center mx-auto flex-col px-4 gap-4 mt-20"
    >
      <h2 className="text-4xl text-accent text-center font-bold mb-10">
        Add Blog
      </h2>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Title" />
        </div>
        <TextInput type="text" name="title" placeholder="Title" required />
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Image url" />
        </div>
        <TextInput type="text" name="image" placeholder="Image url" required />
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="category" />
        </div>
        <Select id="category" required>
          <option>----</option>
          <option value="Fashion">Fashion</option>
          <option value="Fitness">Fitness</option>
          <option value="Food">Food</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Travel">Travel</option>
        </Select>
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Short description" />
        </div>
        <Textarea name="short" placeholder="Short description..." required />
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Long description" />
        </div>
        <Textarea name="long" placeholder="Long description..." required />
      </div>
      <Button
        className="w-full uppercase rounded-lg bg-accent  text-white mb-20 hover:bg-accentDark"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default AddBlog;
