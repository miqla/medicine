import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      navigate("/");
    } catch (error) {
      const notify = () => toast(`${error.code} - ${error.message}`);
      notify();
    }
  }

  async function handleLogIn(e) {
    e.preventDefault();
    try {
      // caranya sama persis kayak register, cuma beda di bagian signInWithEmailAndPassword
      const userLoggedIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userLoggedIn);
      Swal.fire({
        icon: "success",
        title: "You have been logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      const notify = () => toast(`${error.code} - ${error.message}`);
      notify();
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <div className="card bg-base-100 shadow-sm p-5 hover:shadow-xl/30 mx-auto sm:w-lg w-5/6">
        <h1 className="font-bold text-3xl mb-6 text-center">Login Page</h1>
        <form onSubmit={handleLogIn} className="flex flex-col items-center">
          <div className="w-4/6 mb-4">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-sm w-full p-1"
            />
          </div>
          <div className="w-4/6 mb-4">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-sm w-full p-1"
            />
          </div>
          <button className="btn mb-4">Login</button>
        </form>
        <button onClick={handleGoogleLogin} className="btn max-w-max mx-auto">
          <FcGoogle /> Login with Google
        </button>
      </div>
    </>
  );
}
