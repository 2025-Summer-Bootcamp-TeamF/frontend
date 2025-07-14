import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OnBoardingPage from "./pages/OnBoardingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/on" element={<OnBoardingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
