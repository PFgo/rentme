import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, pw);
      } else {
        await signInWithEmailAndPassword(auth, email, pw);
      }
      onClose();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleGoogle() {
    setErr("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (e) {
      setErr(e.message);
    }
  }

  const toggleMode = (e) => {
    e.preventDefault();
    setMode(mode === "signup" ? "signin" : "signup");
    setEmail("");
    setPw("");
    setErr("");
  };

  const backdrop = {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "grid",
    placeItems: "center",
    zIndex: 2000,
    animation: "fadeIn 0.2s ease-out",
  };

  const card = {
    width: "100%",
    maxWidth: 400,
    background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
    color: "#fff",
    padding: 32,
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    border: "1px solid #333",
    borderRadius: 8,
    background: "#1a1a1a",
    color: "#fff",
    fontSize: 16,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
    boxSizing: "border-box",
  };

  const buttonPrimaryStyle = {
    width: "100%",
    padding: 14,
    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
  };

  const buttonSecondaryStyle = {
    width: "100%",
    padding: 14,
    background: "#fff",
    color: "#333",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
  };

  const buttonCloseStyle = {
    width: "100%",
    padding: 12,
    background: "transparent",
    color: "#888",
    border: "1px solid #333",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    transition: "color 0.2s ease, border-color 0.2s ease",
    marginTop: 8,
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#333";
    e.target.style.boxShadow = "none";
  };

  const handleButtonHover = (e, hovered) => {
    e.target.style.transform = hovered ? "translateY(-1px)" : "translateY(0)";
    e.target.style.boxShadow = hovered
      ? "0 6px 20px rgba(59, 130, 246, 0.4)"
      : "0 4px 14px rgba(59, 130, 246, 0.3)";
  };

  return (
    <div style={backdrop}>
      <div style={card}>
        <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 28, fontWeight: 600 }}>
          {mode === "signup" ? "Create account" : "Sign in"}
        </h2>

        <form onSubmit={handleEmailSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#ccc" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              aria-describedby={err ? "email-error" : undefined}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#ccc" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password (min 6 chars)"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              minLength={6}
              style={inputStyle}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              aria-describedby={err ? "password-error" : undefined}
            />
          </div>
          <button
            type="submit"
            style={buttonPrimaryStyle}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            {mode === "signup" ? "Sign up with Email" : "Sign in with Email"}
          </button>
        </form>

        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <span style={{ color: "#888", fontSize: 14 }}>Or</span>
        </div>

        <button
          onClick={handleGoogle}
          style={buttonSecondaryStyle}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </span>
        </button>

        {err && (
          <p id="email-error" role="alert" style={{ color: "#ef4444", fontSize: 14, marginTop: 16, textAlign: "center" }}>
            {err}
          </p>
        )}

        <p style={{ marginTop: 24, fontSize: 14, textAlign: "center", color: "#888" }}>
          {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 14, textDecoration: "underline" }}
          >
            {mode === "signup" ? "Sign in" : "Create one"}
          </button>
        </p>

        <button
          onClick={onClose}
          style={buttonCloseStyle}
          onMouseEnter={(e) => {
            e.target.style.color = "#ccc";
            e.target.style.borderColor = "#555";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#888";
            e.target.style.borderColor = "#333";
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}