// src/App.jsx
import "./App.css";
import MyMap from "./Maps";
import Footer from "./Footer";
import Header from "./Header.jsx"; // Import the new Header component


export default function App() {
  

  return (
    <>
      <Header /> {/* Use the extracted Header component */}

      <main>
        <MyMap />
      </main>

      <Footer />
    </>
  );
}