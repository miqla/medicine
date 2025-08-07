import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../configs/firebase";
import { rupiahFormat } from "../../utils/rupiahFormatter";
import { GoTrash } from "react-icons/go";

export default function HomePublicPage() {
  const [products, setProducts] = useState([]);
  const [modalCard, setModalCard] = useState([null]);
  const [cartProducts, setCartProducts] = useState([]);

  async function getCartProducts() {
    const querySnapshot = await getDocs(collection(db, "carts"));
    //   kalau pakai map jangan lupa tambahin .docs, kalau forEach gaperlu .docs
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setCartProducts(result);
  }

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
    getCartProducts();
  }, []);

  async function addToCart(prod) {
    try {
      await addDoc(collection(db, "carts"), {
        name: prod.name,
        price: prod.price,
        imageUrl: prod.imageUrl,
        category: prod.category,
      });
      getCartProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await deleteDoc(doc(db, "carts", id));
      getCartProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* modal box */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        {modalCard && modalCard.imageUrl && (
          <div className="modal-box w-full lg:max-w-[300px]">
            <h3 className="font-bold text-lg">{modalCard.name}</h3>
            <hr className="my-4" />
            <img
              src={modalCard.imageUrl}
              alt="{modalCard.name}"
              className="w-full lg:max-w-[200px] cursor-pointer mx-auto"
            />
            <p className="py-3">Price: {rupiahFormat(modalCard.price)}</p>
            <p>Category: {modalCard.category}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* end modal box */}
      {/* <!-- Main Content --> */}
      <h1 className="font-bold text-3xl text-center mb-3">Product List</h1>
      <div className="container mx-auto px-4 py-8">
        {/* drawer */}
        <div className="drawer drawer-end flex justify-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-primary mb-px"
            >
              Open cart
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              {cartProducts?.map((product) => (
                <li key={product.id}>
                  <div className="card flex flex-row justify-between bg-base-100 shadow-sm mb-2">
                    <p className="w-1/2">{product.name}</p>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      <GoTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* end-drawer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* <!-- Card 1 --> */}
          {products?.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-2">
                {rupiahFormat(product.price)}
              </p>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <button
                onClick={() => {
                  document.getElementById("my_modal_2").showModal(),
                    setModalCard(product);
                }}
                className="bg-green-500 text-white px-4 mb-2 w-full py-2 rounded hover:bg-green-700"
              >
                Detail
              </button>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
              >
                Add to cart
              </button>
            </div>
          ))}
          {/* <!-- Repeat above card for other products (5 more) --> */}
        </div>
      </div>
    </>
  );
}
