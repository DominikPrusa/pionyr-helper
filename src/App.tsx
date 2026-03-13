import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TimesCounter from "./pages/times-counter";
import WaitingTimeTimer from "./pages/waiting-time-timer";
import Ciphers from "./pages/Ciphers";
import Morse from "./pages/Morse";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/times-counter" element={<TimesCounter />} />
        <Route path="/waiting-time-timer" element={<WaitingTimeTimer />} />
        <Route path="/ciphers" element={<Ciphers />} />
        <Route path="/morse-code" element={<Morse />} />
      </Routes>
    </>
  );
}

export default App;
