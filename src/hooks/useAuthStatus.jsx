import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState();
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setLoadingStatus(false);
    });
  }, []);
  return { loggedIn, loadingStatus };
}
