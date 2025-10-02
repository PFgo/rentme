// src/Header.jsx
import { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "./AuthGate.jsx";
import AuthModal from "./AuthModal.jsx";

export default function Header() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
        <header
  className="header"
  style={{
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "16px 24px",
    background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  }}
>
  <div style={{ flex: 1 }}></div>
  <h1
    style={{
      flex: 1,
      textAlign: "center",
      margin: 0,
      fontSize: 50,
      fontWeight: 700,
      letterSpacing: "0.5px",
    }}
  >
    UO
  </h1>
  <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
    {user ? (
      <>
        <span style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #333",
              }}
            />
          ) : (
            "👤"
          )}
          {user.displayName || user.email}
        </span>
        <button
          onClick={() => signOut(auth)}
          style={{
            padding: "8px 16px",
            background: "transparent",
            color: "#888",
            border: "1px solid #333",
            borderRadius: 6,
            fontSize: 14,
            cursor: "pointer",
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#ccc";
            e.target.style.borderColor = "#555";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#888";
            e.target.style.borderColor = "#333";
          }}
        >
          Sign out
        </button>
      </>
    ) : (
      <button
        onClick={() => setShowAuth(true)}
        style={{
          padding: "12px 22px",
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 20,
          fontWeight: 600,
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-1px)";
          e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 2px 8px rgba(59, 130, 246, 0.3)";
        }}
      >
        Sign in / Sign up
      </button>
    )}
  </div>
  <div style={{ flex: 0.1 }}></div>
</header>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}