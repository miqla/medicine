import { Outlet, useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  async function handleLogOut() {
    try {
      signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.log(error);
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
            <a onClick={() => navigate("/")} className="btn btn-ghost text-xl">
              Health & Medicine
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a onClick={() => navigate("/")}>Products</a>
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
            <a className="btn" onClick={handleLogOut}>
              Logout
            </a>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
