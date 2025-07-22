import { useNavigate } from "react-router-dom";
import youtubeLogo from "../assets/youtubelogo.png";
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
      <span>Channel Analysis</span>
    ),
    desc: (
      <span>다른 채널의 분석을 통해<br />내 채널 성장의 발판을 마련해보세요.</span>
    ),
  },
  {
    img: categoryIcon,
    title: (
      <span>Video Categorize</span>
    ),
    desc: (
      <span>영상을 분석하여 시청자의 눈길을<br />사로잡을 수 있도록 도와줍니다.</span>
    ),
  },
  {
    img: replyIcon,
    title: (
      <span>Reply Management</span>
    ),
    desc: (
      <span>편리한 댓글 관리를 통해<br />구독자들과 더 쉽게 소통하세요.</span>
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
      className="w-screen h-screen overflow-x-hidden relative text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundColor: '#111',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-36 mt-12 mb-6 w-full mx-auto">
        <div className="flex items-center cursor-pointer select-none" onClick={() => navigate("/")}> 
          <img src={youtubeLogo} alt="YouTube Logo" className="h-[3rem] w-[12rem]" />
        </div>
        {/* 오른쪽 상단 로그인/로그아웃 버튼 */}
        {isLoggedIn ? (
          <div className="flex items-center cursor-pointer select-none" onClick={handleLogout}>
            <img src={logoutIcon} alt="로그아웃" className="h-[2rem] w-[10rem]" />
          </div>
        ) : (
          <div className="flex items-center cursor-pointer select-none" onClick={() => navigate("/login")}> 
            <img src={loginIcon} alt="로그인" className="h-[2rem] w-[6rem]" />
          </div>
        )}
      </div>

      {/* Main Section */}
      <div className="flex flex-row justify-center items-center mt-8 mb-8 w-full mx-auto">
        <div className="flex flex-row justify-between items-center gap-8 mx-32 mt-8 w-full">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#111213] rounded-2xl border border-rgba(255,255,255,0.6) w-auto h-auto flex flex-col px-8 py-10"
              style={{boxShadow: '0 0 24px 2px #e52d27a0'}}
            >
              <img src={card.img} alt="card icon" className="w-[18vw] h-[14vw] object-contain m-8 select-none" />
              <div className="text-[2.4rem] text-[#ffffff] text-center font-bold mt-4 mb-4">{card.title}</div>
              <div className="text-[1.4rem] text-[rgba(255,255,255,0.9)] text-center font-regular">{card.desc}</div>
              <button
                className="bg-[#c90101] hover:bg-[#b31217] text-white text-[1.7rem] font-medium rounded-xl transition-colors w-full mt-20 mb-2"
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
