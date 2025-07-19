import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login_background.png";
import youtubeLogo from "../assets/logo.png";
import arrow from "../assets/arrow.png";

export default function LoginPage() {
  const navigate = useNavigate();

  // 로그인 성공 시 예시 (실제 OAuth 연동 시에는 콜백에서 처리)
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div className="w-screen h-screen flex flex-row bg-[#0a0708] min-h-screen min-w-screen overflow-hidden">
      {/* 왼쪽: 배경+텍스트 */}
      <div className="relative w-1/2 h-full flex flex-col justify-between bg-cover bg-center" style={{backgroundImage: `url(${loginBg})`}}>
        {/* ← 버튼 (arrow.png) */}
        <button
          className="absolute top-10 left-10 z-10 hover:opacity-80 p-0 m-0 bg-transparent border-none"
          onClick={() => navigate("/")}
          aria-label="뒤로가기"
        >
          <img
            src={arrow}
            alt="뒤로가기"
            className="w-[65px] h-[55px] object-contain"
            style={{ transform: "scaleX(-1)" }}
          />
        </button>
        {/* 텍스트 */}
        <div className="flex flex-col h-full pl-14 pt-[120px]">
          <div className="text-[#ffffff] text-[33px] font-regular mb-2">You can easily</div>
          <div className="text-white text-[70px] font-regular">Speed up your work<br/>with our service</div>
        </div>
        {/* YouTube 로고 */}
        <div className="absolute bottom-10 right-14 flex items-center gap-3 select-none">
          <img src={youtubeLogo} alt="YouTube Logo" className="h-[60px] w-[270px]" />
        </div>
      </div>
      {/* 오른쪽: 로그인 폼 */}
      <div className="w-1/2 h-full flex flex-col justify-center items-start px-16 bg-transparent">
        <div className="text-white text-[70px] font-regular">Get Started Now</div>
        <div className="text-[#a3a3a3] text-[23px] mb-12">Please log in to your account to continue.</div>
        <div className="text-white text-[23px] font-regular mb-1">YouTube Account</div>
        <button
          className="w-full max-w-[670px] h-[70px] bg-[#ff0000] hover:bg-[#e52d27] text-white text-[22px] font-semibold rounded-[13px] mt-2 transition-colors shadow-lg"
          onClick={handleLogin}
        >
          Continue with YouTube
        </button>
      </div>
    </div>
  );
}
