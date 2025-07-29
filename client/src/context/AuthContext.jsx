import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../configs/firebase";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState("ada");
  const value = { user, setUser };
  const [isLoadPage, setLoadPage] = useState(true);

  useEffect(() => {
    // karena onAuthStateChanged adalah callback, dy akan tetap jalan terus walupun didalam variabel
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
