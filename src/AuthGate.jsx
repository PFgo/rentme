
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProfileSetupModal from "./ProfileSetupModal";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthGate({ children }) {
  const [user, setUser] = useState(undefined); // undefined=loading, null=logged out, obj=logged in
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const creationTime = new Date(currentUser.metadata.creationTime).getTime();
        const lastSignInTime = new Date(currentUser.metadata.lastSignInTime).getTime();
        // If times are within 10 seconds, assume new user (handles slight discrepancies)
        if (Math.abs(lastSignInTime - creationTime) < 10000) {
          setShowProfileSetup(true);
        }
      }
    });
    return () => unsub();
  }, []);

  if (user === undefined) return <div style={{padding:16}}>Loading…</div>;
  return (
    <AuthCtx.Provider value={{ user, setUser }}>
      {children}
      {showProfileSetup && <ProfileSetupModal onClose={() => setShowProfileSetup(false)} />}
    </AuthCtx.Provider>
  );
}
