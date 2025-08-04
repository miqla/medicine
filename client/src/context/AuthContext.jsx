import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../configs/firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext({
  user: null,
  email: null,
  role: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const value = { user, setUser, role, name };
  const [isLoadPage, setLoadPage] = useState(true);

  useEffect(() => {
    // karena onAuthStateChanged adalah callback, dy akan tetap jalan terus walupun didalam variabel
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setRole(docSnap.data().role);
        setName(docSnap.data().name);
      } else {
        setUser(null);
      }
      setLoadPage(false);
    });

    // di invoke untuk membersihkan/ menghentikan infinite callback
    return () => {
      subscribe();
    };
  }, []);

  if (isLoadPage) {
    return <div>Loading...</div>;
  }

  return <AuthContext value={value}>{children}</AuthContext>;
}
