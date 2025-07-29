import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="font-bold text-3xl mb-5">Page Not Found!</h1>
        <button className="btn" onClick={() => navigate("/")}>
          Back to Home Page
        </button>
      </div>
    </>
  );
}
