import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/utils";

const SignIn = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = {
          email,
          lastLoggedAt: result.user.metadata?.lastSignInTime,
        };
        axios.patch(`${BASE_URL}/users`, user).then((res) => {
          console.log(res.data);
          if (res.data.acknowledged) {
            toast.success("Sign In successfully");
          }
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code !== "auth/invalid-login-credential") {
          toast.error("The password or email you entered does not match.");
        } else {
          toast.error(`Something went wrong with ${error.message}`);
        }
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const name = result.user?.displayName;
        const email = result.user.email;
        const photo = result.user?.photoURL;
        const createAt = result.user.metadata?.creationTime;
        const userinfo = { name, email, photo, createdAt: createAt };
        axios.post(`${BASE_URL}/users`, userinfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
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
        <h1 className="text-accent font-bold text-4xl">Sign In</h1>
        <form
          onSubmit={handleSignIn}
          className="flex w-[300px] mx-auto flex-col pt-8 gap-2"
        >
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
            Sign In
          </button>
        </form>
        <div className="items-center pt-8 w-fit mx-auto">
          <div className="w-[50px] h-[50px] border-2 border-gray-300 rounded-full grid place-items-center text-[20px] cursor-pointer hover:border-accent">
            <FaGoogle onClick={handleGoogleSignIn} />
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p className="text-center mt-4">
            Do not have an account{" "}
            <Link
              className="text-accent hover:text-accentDark font-bold"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
