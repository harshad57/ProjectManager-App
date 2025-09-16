import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import Menu from "./menu";

export const Navbar = () => {
  const { authuser, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setopen] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/publicprojects" || location.pathname === "/privateprojects" || location.pathname === "/addproject" || location.pathname === "/profile" || location.pathname === "*") {
    return null;
  }

  const btn = async () => {
    if (authuser) {
      await logout();
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [open]);

  return (
    <nav className="flex z-60 justify-between items-center gap-10 lg:px-8 lg:py-3 py-4 px-4 rounded-xl shadow-md backdrop-blur-md border border-gray-200 fixed w-full">
      <div>
        <a href="/" className="inline-flex items-center gap-3 lg:text-2xl text-xl font-bold text-indigo-600" aria-label="logo">
          <img src={logo} alt="Project Flow Logo" className="h-7 w-auto" />
          ProjectFlow
        </a>
      </div>
      <div className="lg:hidden flex">
        <Menu setopen={setopen} open={open} />
      </div>
      <div className={`flex lg:flex-row flex-col absolute lg:relative right-0 top-0 gap-6 items-center bg-white lg:px-6 px-15 w-3/4 lg:w-auto lg:py-3 pt-10 lg:rounded-xl lg:translate-x-0 rounded-l-lg min-h-screen lg:min-h-auto shadow-md ${open ? "translate-x-0" : "translate-x-full"} transition duration-200`}>
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-all sm:w-1/2 w-full text-center duration-300 ${location.pathname === "/"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
            }`}
            onClick={() => setopen(false)}
        >
          Home
        </Link>

        <Link
          to="/projects"
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-all w-full sm:w-1/2 text-center duration-300 ${location.pathname === "/projects"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
            }`}
            onClick={() => setopen(false)}
        >
          Workspace
        </Link>

        <Link
          to="/publicprojects"
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-all w-full sm:w-1/2 text-center duration-300 ${location.pathname === "/publicprojects"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
            }`}
            onClick={() => setopen(false)}
        >
          Discover
        </Link>

        <Link
          to="/profile"
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-all w-full sm:w-1/2 text-center duration-300 ${location.pathname === "/profile"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
            }`}
            onClick={() => setopen(false)}
        >
          Profile
        </Link>
        <button onClick={btn} className="text-center rounded-lg absolute bottom-7 flex lg:hidden bg-indigo-600 mx-auto sm:w-34 px-6 py-2 text-md font-semibold text-white shadow-md transition hover:bg-indigo-700 cursor-pointer">
          {authuser ? "Logout" : "Login"}
        </button>
      </div>

      <div className="hidden lg:flex">
        <button onClick={btn} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-md font-semibold text-white shadow-md transition hover:bg-indigo-700 cursor-pointer">
          {authuser ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  )
}