import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const { user } = useContext(AuthContext);
  const basicURL = "http://localhost:5173";

  const currentURL = window.location.href;

  function setPageOnLoad() {
    if (currentURL == basicURL + "/auth") {
      setPage("login");
      //   console.log(basicURL + "/auth");
    } else if (currentURL == basicURL + "/auth/register") {
      setPage("register");
    }
  }

  useEffect(() => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid;
      navigate("/");
    }
    setPageOnLoad();
  }, []);

  function handleClick() {
    if (page == "login") {
      navigate("/auth/register");
      setPage("register");
    } else if (page == "register") {
      navigate("/auth");
      setPage("login");
    }
  }

  return (
    <>
      <nav className="bg-base-100 shadow-sm mb-5">
        <div className="navbar m-auto max-w-7xl">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">Health & Medicine</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn" onClick={handleClick}>
              {page == "login" ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
