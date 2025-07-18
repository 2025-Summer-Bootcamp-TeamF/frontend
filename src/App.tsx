import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OnBoardingPage from "./pages/OnBoardingPage";
//import Analysis from "./pages/ChannelAnalysisPage";
import LoginPage from "./pages/LoginPage";
import MainPage_Login from "./pages/MainPage_Login";
import Reply_Positive from "./pages/Reply_Positive";
import Reply_Negative from "./pages/Reply_Negative";
import Reply_Analysis from "./pages/Reply_Analysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/on" element={<OnBoardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainpage_login" element={<MainPage_Login />} />
        <Route path="/reply_positive" element={<Reply_Positive />} />
        <Route path="/reply_negative" element={<Reply_Negative />} />
        <Route path="/reply_analysis" element={<Reply_Analysis />} />
        <Route path="/mainpage" element={<MainPage />} />
        {/* <Route path="/analysis" element={<Analysis />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
