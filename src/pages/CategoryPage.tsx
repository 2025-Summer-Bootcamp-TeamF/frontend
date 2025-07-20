import { useNavigate } from "react-router-dom";
import sidebarMypage from "../assets/mypagelogo.png";
import sidebarInsight from "../assets/insight.png";
import sidebarAnalysis from "../assets/analysis.png";
import medal1 from "../assets/1st.png";
import medal2 from "../assets/2nd.png";
import medal3 from "../assets/3rd.png";
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";
import arrow from "../assets/arrow.png";

const data = [
  {
    rank: 1,
    medal: medal1,
    thumbnail: thumbnail1,
    title: "얼굴 클로즈업 + 감정 과장",
    desc: "인물의 얼굴을 화면 대부분에 배치하고, 놀람·분노·충격 등의 과장된 표정으로 시선을 끄는 형태입니다.",
    videoCount: 10,
    viewCount: "10.6만 회",
    likeCount: 50,
  },
  {
    rank: 2,
    medal: medal2,
    thumbnail: thumbnail2,
    title: "얼굴 클로즈업 + 감정 과장",
    desc: "인물의 얼굴을 화면 대부분에 배치하고, 놀람·분노·충격 등의 과장된 표정으로 시선을 끄는 형태입니다.",
    videoCount: 10,
    viewCount: "10.6만 회",
    likeCount: 50,
  },
  {
    rank: 3,
    medal: medal3,
    thumbnail: thumbnail3,
    title: "다양한 인물 구도",
    desc: "여러 인물이 함께 등장하거나, 다양한 구도로 시선을 분산시키는 썸네일 유형입니다.",
    videoCount: 8,
    viewCount: "8.2만 회",
    likeCount: 32,
  },
  {
    rank: 4,
    thumbnail: thumbnail3,
    title: "다양한 인물 구도",
    desc: "여러 인물이 함께 등장하거나, 다양한 구도로 시선을 분산시키는 썸네일 유형입니다.",
    videoCount: 8,
    viewCount: "8.2만 회",
    likeCount: 32,
  },
  {
    rank: 5,
    thumbnail: thumbnail3,
    title: "다양한 인물 구도",
    desc: "여러 인물이 함께 등장하거나, 다양한 구도로 시선을 분산시키는 썸네일 유형입니다.",
    videoCount: 8,
    viewCount: "8.2만 회",
    likeCount: 32,
  }
];

export default function CategoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full flex flex-col items-center z-50 bg-black" style={{ width: "6vw" }}>
        <div style={{ marginTop: "2.94vh", marginBottom: "24px" }}>
          <img src={"/logo.png"} alt="Logo" className="w-auto h-auto" />
        </div>
        <button className="p-3 rounded-lg transition-all mb-4 group">
          <img src={sidebarMypage} alt="My Page" className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all" />
        </button>
        <button className="p-3 rounded-lg transition-all mb-4 group">
          <img src={sidebarInsight} alt="Insight" className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all" />
        </button>
        <button className="p-3 rounded-lg transition-all group">
          <img src={sidebarAnalysis} alt="Analysis" className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all" />
        </button>
      </div>
      {/* Main Container */}
      <div className="flex-1 min-h-screen flex flex-col items-center justify-start bg-black ml-[6vw] py-10 px-4">
        <div className="w-full max-w-[1770px] rounded-[15px] bg-[#2c2c2c] border border-rgba(255, 255, 255, 0.6) p-12 mt-2">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6 flex">
            <button
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10"
              onClick={() => navigate("/mainpage_login")}
              style={{ marginRight: "8px", transform: "scaleX(-1)" }}
              aria-label="뒤로가기"
            >
              <img src={arrow} alt="뒤로가기" className="w-6 h-4" />
            </button>
          </div>
          
          {/* 상단 제목/설명 */}
          <div className="mb-10">
            <div className="text-[25px] font-semibold text-[#ff0000] mb-2">썸네일 유형별 인기 콘텐츠 분석</div>
            <div className="text-[#d9d9d9] text-[20px] font-light">
              영상의 썸네일을 분류하고, 각 카테고리별로 조회수가 높은 콘텐츠를 순위별로 정리하여 보여주는 공간입니다.<br />
              썸네일 스타일과 조회수 간의 상관관계를 분석하거나, 어떤 유형이 더 효과적인지 파악할 수 있습니다.
            </div>
          </div>
          {/* 인기 썸네일 카드 리스트 */}
          <div className="flex flex-col gap-6">
            {data.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-row items-center bg-[#1c2023] rounded-[16px] px-10 py-8 gap-4 cursor-pointer hover:bg-[#2a2e31] transition-colors"
                onClick={() => navigate(`/category_segmentation?rank=${item.rank}`)}
              >
                {/* 순위 뱃지 */}
                <div className="flex flex-col items-center mr-2">
                  {item.rank <= 3 ? (
                    <>
                      <img src={item.medal} alt={`medal${item.rank}`} className="w-[54px] h-[54px] -mb-4 z-10" />
                      <div className="w-[44px] h-[44px] rounded-full bg-[#e0e0e0] flex items-center justify-center text-[28px] font-bold text-[#232325] border-4 border-[#2c2c2c] z-20 relative -mt-6">{item.rank}</div>
                    </>
                  ) : (
                    <div className="w-[44px] h-[44px] rounded-full bg-[#e0e0e0] flex items-center justify-center text-[28px] font-bold text-[#232325] border-4 border-[#2c2c2c]">{item.rank}</div>
                  )}
                </div>
                {/* 썸네일 */}
                <img src={item.thumbnail} alt="썸네일" className="w-[450px] h-[250px] object-cover rounded-[11px]" />
                {/* 텍스트/설명 */}
                <div className="flex flex-col flex-1 ml-4">
                  <div className="text-[30px] font-semibold text-white mb-2">{item.title}</div>
                  <div className="text-rgba(255,255,255,0.6) text-[24px] font-thin mb-4">{item.desc}</div>
                  <div className="flex flex-row gap-10 text-[#ffffff] text-[25px] font-medium">
                    <div>전체 영상 수 : <span>{item.videoCount}개</span></div>
                    <div>평균 조회수 : <span>{item.viewCount}</span></div>
                    <div>평균 좋아요 수 : <span>{item.likeCount}개</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 