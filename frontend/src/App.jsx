import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Latest from "./pages/Latest.jsx";
import AIStudio from "./pages/AIStudio.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/ai-studio" element={<AIStudio />} />
      </Routes>
    </>
  );
}
