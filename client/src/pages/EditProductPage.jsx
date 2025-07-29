import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import UploadWidget from "../components/UploadWidget";

export default function EditProductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name: name,
        price: price,
        imageUrl: imageUrl,
      });
      const notify = () => toast(`data added succsessfully`);
      notify();
      navigate("/");
    } catch (error) {
      const notify = () => toast(`${error.code} - ${error.message}`);
      notify();
    }
  }

  async function getData() {
    try {
      // get a reference to the document
      const docRef = doc(db, "products", id);
      // fetch the document data
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setImageUrl(docSnap.data().imageUrl);
        setPrice(docSnap.data().price);
      } else {
        console.log("document not found!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <div className="card card-dash bg-base-200 mx-auto w-96">
        <div className="card-body">
          <h2 className="card-title mx-auto">Edit Data</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="name">Product name</label>
            <input
              className="border rounded-sm p-1"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="image">Image url</label>
            <input
              className="border rounded-sm p-1"
              type="text"
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              disabled
            />
            <UploadWidget setImage={setImageUrl} />
            <label htmlFor="price">Price</label>
            <input
              className="border rounded-sm p-1"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
              required
            />
            <button className="btn justify-end max-w-max self-end">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
