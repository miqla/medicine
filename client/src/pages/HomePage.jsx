import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    //   kalau pakai map jangan lupa tambahin .docs, kalau forEach gaperlu .docs
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setProducts(result);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function deleteProduct(id) {
    try {
      await deleteDoc(doc(db, "products", id));
      getProducts();
      const notify = () => toast(`data has been deleted`);
      notify();
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
      <main className="mx-auto max-w-6xl w-9/10 flex flex-col">
        <h1 className="font-bold text-3xl text-center mb-3">Product List</h1>
        <button
          onClick={() => navigate("/products/add")}
          className="btn self-end mb-2 w-max"
        >
          Add Data
        </button>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* looping rows */}
              {products?.map((product, index) => (
                <tr key={product.id}>
                  <th>{index + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    <img
                      width="150px"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.price}</td>
                  <td className="w-[180px]">
                    <button
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className="btn max-w-max"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn max-w-max ml-2"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
