import { Route, Routes } from "react-router-dom";
import "./App.css";
import TesseractExample from "./pages/TesseractExample";
import Home from "./pages/Home";
import TimesCounter from "./pages/times-counter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/times-counter" element={<TimesCounter />} />
        <Route path="/tesseractExample" element={<TesseractExample />} />
      </Routes>
    </>
  );
}

export default App;
