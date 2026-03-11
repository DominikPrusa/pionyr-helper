import { Route, Routes } from "react-router-dom";
import "./App.css";
import TesseractExample from "./pages/TesseractExample";
import Home from "./pages/Home";
import TimesCounter from "./pages/times-counter";
import WaitingTimeTimer from "./pages/waiting-time-timer";
import Ciphers from "./pages/Ciphers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/times-counter" element={<TimesCounter />} />
        <Route path="/waiting-time-timer" element={<WaitingTimeTimer />} />
        <Route path="/ciphers" element={<Ciphers />} />
        <Route path="/tesseractExample" element={<TesseractExample />} />
      </Routes>
    </>
  );
}

export default App;
