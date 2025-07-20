import { useNavigate } from "react-router-dom";
import youtubeLogo from "../assets/logo.png";
import analysisIcon from "../assets/video_analysis.png";
import categoryIcon from "../assets/category.png";
import replyIcon from "../assets/reply.png";
import loginIcon from "../assets/login.png";
import logoutIcon from "../assets/logout.png";
import background from "../assets/background.png";

const cardData = [
  {
    img: analysisIcon,
    title: (
      <span className="font-bold text-[#ffffff] text-[42px]">Channel Analysis</span>
    ),
    desc: (
      <span className="text-[28px] text-[rgba(255,255,255,0.9)] font-regular mt-2">다른 채널의 분석을 통해<br />내 채널 성장의 발판을 마련해보세요.</span>
    ),
  },
  {
    img: categoryIcon,
    title: (
      <span className="font-bold text-[#ffffff] text-[42px] font-['Inter']">Video Category</span>
    ),
    desc: (
      <span className="text-[28px] text-[rgba(255,255,255,0.9)] font-regular mt-2">영상을 분석하여 시청자의 눈길을<br />사로잡을 수 있도록 도와줍니다.</span>
    ),
  },
  {
    img: replyIcon,
    title: (
      <span className="font-bold text-[#ffffff] text-[42px] font-['Inter']">Reply Management</span>
    ),
    desc: (
      <span className="text-[28px] text-[rgba(255,255,255,0.9)] font-regular mt-2">편리한 댓글 관리를 통해<br />구독자들과 더 쉽게 소통하세요.</span>
    ),
  },
];

const loggedInButtonLabels = [
  '바로 비교하기',
  '인사이트 확인하기',
  '댓글 분석하기',
];

export default function MainPage() {
  const navigate = useNavigate();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen w-full text-white font-['Roboto','sans-serif'] relative overflow-x-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundColor: '#111',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-16 pt-12 w-full max-w-[1920px] mx-auto">
        <div className="flex items-center gap-6 cursor-pointer select-none" onClick={() => navigate("/")}> 
          <img src={youtubeLogo} alt="YouTube Logo" className="h-[60px] w-[270px]" />
        </div>
        {/* 오른쪽 상단 로그인/로그아웃 버튼 */}
        {isLoggedIn ? (
          <div className="flex items-center gap-6 cursor-pointer select-none" onClick={handleLogout}>
            <img src={logoutIcon} alt="로그아웃" className="h-[40px] w-[190px]" />
          </div>
        ) : (
          <div className="flex items-center gap-6 cursor-pointer select-none" onClick={() => navigate("/login")}> 
            <img src={loginIcon} alt="로그인" className="h-[45px] w-[120px]" />
          </div>
        )}
      </div>

      {/* Main Section */}
      <div className="flex flex-row items-center justify-center w-full min-h-[calc(100vh-120px)] pt-8 pb-8">
        <div className="flex flex-row justify-center items-stretch gap-12 w-full max-w-[1600px] mt-8">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#111213] rounded-[14px] border border-rgba(255,255,255,0.6) w-[530px] h-[780px] flex flex-col items-center justify-between px-8 py-10 relative"
              style={{boxShadow: '0 0 24px 2px #e52d27a0'}}
            >
              <img src={card.img} alt="card icon" className="w-[230px] h-[205px] object-contain pt-10 mb-2 mt-2 select-none" />
              <div className="mt-4 mb-2 text-center">{card.title}</div>
              <div className="mb-6 text-center">{card.desc}</div>
              <button
                className="bg-[#c90101] hover:bg-[#b31217] text-white text-[32.5px] font-medium rounded-[14px] px-8 py-3 mt-6 shadow-md transition-colors w-full max-w-[360px]"
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate('/login');
                  } else {
                    // 로그인 상태에서 각 카드별로 원하는 동작을 추가할 수 있음
                  }
                }}
              >
                {isLoggedIn ? loggedInButtonLabels[idx] : '로그인 후 이용가능'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
