import { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const googleAuth = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleAuth)
      .catch((err) => setError(err))
      .then(() => {
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  function logout() {
    setLoading(false);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const value = {
    currentUser,
    loading,
    error,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
