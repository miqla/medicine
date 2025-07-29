import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      // panggil API firebase dgn 3 params: auth, email & pass untuk meregistrasi user
      //   isinya user credential, bentuknya promise, jadi masukin kedalam const variabel
      const userRegistered = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userRegistered);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const notify = () => toast(`${errorCode} - ${errorMessage}`);
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
        <h1 className="font-bold text-3xl mb-6 text-center">Register Page</h1>
        <form onSubmit={handleRegister} className="flex flex-col items-center">
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
          <button className="btn">Register</button>
        </form>
      </div>
    </>
  );
}
