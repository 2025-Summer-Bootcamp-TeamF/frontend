import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OnBoardingPage from "./pages/OnBoardingPage";
// import ChatPage from "./pages/ChatPage";
// import AccountPage from "./pages/AccountPage";
// import InsightsPage from "./pages/InsightsPage";
// import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/on" element={<OnBoardingPage />} />
        {/* <Route path="/chat" element={<ChatPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
