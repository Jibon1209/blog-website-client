import { Avatar, Button, Navbar } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [active, setActive] = useState("Home");
  const navLinks = [
    {
      id: "/",
      title: "Home",
    },
    {
      id: "/addBlog",
      title: "Add Blog",
    },
    {
      id: "/allBlogs",
      title: "All Blogs",
    },
    {
      id: "/featuredBlogs",
      title: "Featured Blogs",
    },
    {
      id: "/wishlist",
      title: "Wishlist",
    },
  ];
  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign out successfully.");
      })
      .catch((error) => {
        toast.error(`Something went wrong with ${error.message}`);
      });
  };
  return (
    <Navbar fluid rounded className="px-4 bg-[#f4f8f7]">
      <Navbar.Brand>
        <span className="self-center text-accent whitespace-nowrap text-xl font-extrabold dark:text-white">
          BLOGTREKKER
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user && (
          <Avatar
            className="mr-2 hidden md:block"
            alt="User Photo"
            img={user?.photoURL}
            rounded
          />
        )}
        {user ? (
          <Button
            onClick={handleSignOut}
            size="sm"
            className="bg-accent  hover:bg-accentDark"
          >
            Sign Out
          </Button>
        ) : (
          <div className="flex gap-4">
            <Link to="/signin">
              <Button size="sm" className="bg-accent  hover:bg-accentDark">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="bg-accent hover:bg-accentDark hidden lg:block"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        {navLinks.map((link) => (
          <Link
            className={`${active === link.title ? "text-accent" : "text-black"}
            hover:text-accentDark  font-bold cursor-pointer`}
            onClick={() => setActive(link.title)}
            key={link.id}
            to={link.id}
          >
            {link.title}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
