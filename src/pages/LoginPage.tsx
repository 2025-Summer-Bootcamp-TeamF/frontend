import React from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login_background.png";
import youtubeLogo from "../assets/youtubelogo.png";
import arrow from "../assets/arrow.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black pl-6 overflow-hidden">
      {/* 왼쪽: 카드형 배경+텍스트 */}
      <div
        className="w-[50vw] h-full rounded-2xl flex flex-col justify-between relative"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ← 버튼 (arrow.png) */}
        <div className="absolute top-14 left-8 z-10">
          <button
            className="rounded-full items-center justify-center cursor-pointer"
            onClick={() => navigate("/")}
            style={{ transform: "scaleX(-1)" }}
            aria-label="뒤로가기"
          >
          <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
          </button>
        </div>
        <div className="flex-1 flex flex-col mt-28 ml-12">
          <div className="text-white text-[33px] font-regular">You can easily</div>
          <div className="text-white text-[70px] font-regular">Speed up your work<br/>with our service</div>
        </div>
        <div className="flex w-full justify-end pr-14 pb-10">
          <img src={youtubeLogo} alt="YouTube" className="w-[270px] h-[60px] object-contain" />
        </div>
      </div>
      {/* 오른쪽: 로그인 폼 */}
      <div className="flex-1 flex flex-col justify-center ml-10 mr-10 bg-black">
        <div className="text-white text-[70px] font-regular">Get Started Now</div>
        <div className="text-[#a3a3a3] text-[23px] font-regular mb-10">Please log in to your account to continue.</div>
        <div className="w-full">
          <div className="text-white text-[22px] font-regular mb-3">YouTube Account</div>
          <button className="w-[40vw] min-h-[70px] bg-[#ff0000] text-white text-[22px] font-semibold rounded-[13px] mt-2 mb-2 hover:bg-[#d90000] transition-all" onClick={handleLogin}>Continue with YouTube</button>
        </div>
      </div>
    </div>
  );
}
