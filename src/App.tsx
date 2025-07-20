import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import Reply_Analysis from "./pages/Reply_Analysis";
import CategoryPage from "./pages/CategoryPage";
import CategorySegmentation from "./pages/CategorySegmentation";
import ReplyManagement from "./pages/ReplyManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/on" element={<OnBoardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/reply_analysis" element={<Reply_Analysis />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category_segmentation" element={<CategorySegmentation />} />
        <Route path="/reply_management" element={<ReplyManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
