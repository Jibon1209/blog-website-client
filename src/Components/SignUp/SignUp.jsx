import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const SignUp = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    console.log(name, photo, email, password);
    if (password.length < 6) {
      console.log(password.length);
      toast.error("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Contain at least one capital letter");
      return;
    } else if (!/[@#]/.test(password)) {
      toast.error("Contain one special character");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = auth.currentUser;
        if (user !== null) {
          updateProfile(user, {
            displayName: name,
            photoURL: photo,
          })
            .then(() => {})
            .catch(() => {});
        }
        const createAt = result.user.metadata?.creationTime;
        const userinfo = { name, email, password, photo, createdAt: createAt };
        axios.post(`${BASE_URL}/users`, userinfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("Sign Up successfully");
          }
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(`Something went wrong with ${error.message}`);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const name = result.user?.displayName;
        const email = result.user.email;
        const photo = result.user?.photoURL;
        const createAt = result.user.metadata?.creationTime;
        const lastLoggedAt = result.user.metadata?.lastSignInTime;
        const userinfo = {
          name,
          email,
          photo,
          createdAt: createAt,
          lastLoggedAt,
        };
        axios.patch(`${BASE_URL}/users`, userinfo).then((res) => {
          console.log(res.data);
          if (res.data.acknowledged) {
            toast.success("Sign In successfully");
          }
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(`Something went wrong with ${error.message}`);
      });
  };
  return (
    <div className="w-full bg-[#f4f8f7] min-h-screen flex justify-center items-center ">
      <div className="text-center">
        <h1 className="text-accent font-bold text-4xl">Sign Up</h1>
        <form
          onSubmit={handleSignUp}
          className="flex w-[300px] mx-auto flex-col pt-8 gap-2"
        >
          <input
            className="bg-white rounded-lg outline-accent px-4 py-2"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <input
            className="bg-white rounded-lg outline-accent px-4 py-2"
            type="text"
            name="photo"
            placeholder="Photo URL"
            required
          />
          <input
            className="bg-white rounded-lg outline-accent px-4 py-2"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="bg-white rounded-lg outline-accent px-4 py-2"
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="uppercase rounded-lg bg-accent px-4 py-2 text-white mt-4 hover:bg-accentDark"
          >
            Sign Up
          </button>
        </form>
        <div className="items-center pt-8 w-fit mx-auto">
          <div className="w-[50px] h-[50px] border-2 border-gray-300 rounded-full grid place-items-center text-[20px] cursor-pointer hover:border-accent">
            <FaGoogle onClick={handleGoogleSignIn} />
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p className="text-center mt-4">
            Have an account{" "}
            <Link
              className="text-accent hover:text-accentDark font-bold"
              to="/signin"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignUp;
