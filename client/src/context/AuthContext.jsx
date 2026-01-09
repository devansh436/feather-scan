import { auth } from '../lib/firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged runs on login, logout, page refresh
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
