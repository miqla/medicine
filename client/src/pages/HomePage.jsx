import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { rupiahFormat } from "../utils/rupiahFormatter";

const PAGE_LIMIT = 2; //SNAKE CASE, read only

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  //   ---- pagination start-----
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  // ------pagination end--------

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

  async function fetchFilter() {
    try {
      let q = query(collection(db, "products"));
      // Akan digunakan ketika state filter berisikan value
      if (filter) {
        q = query(q, where("category", "==", filter));
      }

      // Akan digunakan ketika state sort berisikan value
      if (sort == "price-asc") {
        q = query(q, orderBy("price", "asc"));
      } else if (sort == "price-desc") {
        q = query(q, orderBy("price", "desc"));
      }

      //   ---------- pagination start ------------
      const totalItems = (await getDocs(q)).size;
      const currentTotalPage = Math.ceil(totalItems / PAGE_LIMIT);
      setTotalPage(currentTotalPage); // 5 / 2 = pembulatanKeAtas(2.5) => Math.ceil()
      if (currentPage > currentTotalPage) {
        setCurrentPage(1);
      }
      q = query(q, limit(PAGE_LIMIT)); //current page = 1, limit = 2
      if (currentPage > 1) {
        // get total item showed to get last visible item
        q = query(q, limit((currentPage - 1) * PAGE_LIMIT));
        const documentSnapshots = await getDocs(q);
        const lastVisible = documentSnapshots.docs.at(-1); // equal to: documentSnapshots.docs[documentSnapshots.docs.length-1];
        console.log("last", lastVisible.data()); // pakai .data()
        q = query(q, limit(PAGE_LIMIT), startAfter(lastVisible));
      }
      // ------- pagination end -------------

      //   jalankan setProduct berdasarkan query
      const querySnapshot = await getDocs(q);
      //   kalau pakai map jangan lupa tambahin .docs, kalau forEach gaperlu .docs
      const result = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(), // =>  object { name, imageUrl, price }
        };
      });
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  }

  function clearFilter() {
    setFilter("");
    setSort("");
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    fetchFilter();
  }, [sort, filter, currentPage]);

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
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              defaultValue="All"
              className="select"
            >
              <option value="">All</option>
              <option value="tablet">Tablet</option>
              <option value="syrup">Syrup</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              defaultValue="Sort by"
              className="select"
            >
              <option hidden>Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <button onClick={clearFilter} className="btn">
              Clear filter
            </button>
          </div>
          <button
            onClick={() => navigate("/products/add")}
            className="btn self-end w-max"
          >
            Add Data
          </button>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* looping rows */}
              {/* akan berjalan ketika products ada isinya */}
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
                  <td>{rupiahFormat(product.price)}</td>
                  <td>{product.category}</td>
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
        <div className="join flex gap-2 my-2 justify-end">
          <button onClick={handlePrevPage} className="join-item btn">
            ◁ Prev
          </button>
          <button className="join-item">
            Page {currentPage} of {totalPage}
          </button>
          <button onClick={handleNextPage} className="join-item btn">
            Next ▷
          </button>
        </div>
      </main>
    </>
  );
}
