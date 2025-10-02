
import { useState } from "react";
import { useAuth } from "./AuthGate";
import { auth, storage } from "./firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfileSetupModal({ onClose }) {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.displayName || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(user.photoURL || null);
  const [err, setErr] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  async function handleSave(e) {
    e.preventDefault();
    setErr("");
    try {
      let photoURL = user.photoURL;
      if (selectedFile) {
        const storageRef = ref(storage, `profile_photos/${user.uid}.jpg`);
        await uploadBytes(storageRef, selectedFile);
        photoURL = await getDownloadURL(storageRef);
      }
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      setUser({ ...auth.currentUser }); // Update local state to reflect changes
      onClose();
    } catch (e) {
      setErr(e.message);
    }
  }

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
          Set up your profile
        </h2>

        <form onSubmit={handleSave}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            {previewURL ? (
              <img
                src={previewURL}
                alt="Profile preview"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #333",
                }}
              />
            ) : (
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "#333",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 40,
                }}
              >
                👤
              </div>
            )}
            <label
              htmlFor="photo"
              style={{
                display: "block",
                marginTop: 12,
                fontSize: 14,
                color: "#3b82f6",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Upload photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#ccc" }}>
              Display Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <button
            type="submit"
            style={buttonPrimaryStyle}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Save Profile
          </button>
        </form>

        {err && (
          <p role="alert" style={{ color: "#ef4444", fontSize: 14, marginTop: 16, textAlign: "center" }}>
            {err}
          </p>
        )}

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
          Skip for now
        </button>
      </div>
    </div>
  );
}