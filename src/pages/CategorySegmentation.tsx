import { useNavigate, useSearchParams } from "react-router-dom";
import sidebarMypage from "../assets/mypagelogo.png";
import sidebarInsight from "../assets/insight.png";
import sidebarAnalysis from "../assets/analysis.png";
import arrow from "../assets/arrow.png";
import medal1 from "../assets/1st.png";
import medal2 from "../assets/2nd.png";
import medal3 from "../assets/3rd.png";
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";

// CategoryPage.tsx와 동일한 데이터 구조
const categoryData = [
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

// 하단 작은 카드 데이터
const categoryCards = [
  {
    thumbnail: thumbnail1,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%",
  },
  {
    thumbnail: thumbnail2,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%",
  },
  {
    thumbnail: thumbnail3,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%",
  },
  {
    thumbnail: thumbnail1,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%",
  },
  {
    thumbnail: thumbnail2,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%",
  },
];

export default function CategorySegmentation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rank = parseInt(searchParams.get('rank') || '1');

  // rank에 따른 메달 결정
  const getMedal = (rank: number) => {
    if (rank === 1) return medal1;
    if (rank === 2) return medal2;
    if (rank === 3) return medal3;
    return null;
  };

  const medal = getMedal(rank);
  
  // rank에 따른 카테고리 데이터 가져오기
  const selectedCategory = categoryData.find(item => item.rank === rank) || categoryData[0];

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
        <div className="w-full max-w-[1770px] rounded-[15px] bg-[#2c2c2c] border-[1px] border-rgba(255,255,255,0.6) p-12 mt-2">
          {/* 상단 큰 썸네일 섹션 */}
          <div className="mb-12 bg-[#1c2023] rounded-[16px] p-10 flex flex-row">
            {/* 뒤로가기 버튼 */}
            <div className="mb-6 flex">
              <button
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10"
                onClick={() => navigate("/category")}
                style={{ marginRight: "8px", transform: "scaleX(-1)" }}
                aria-label="뒤로가기"
              >
                <img src={arrow} alt="뒤로가기" className="w-6 h-4" />
              </button>
            </div>
            <div className="relative flex flex-col ml-6 mr-8">
              {/* 메달 */}
              <div className="absolute top-4 left-4 z-20">
                {rank <= 3 ? (
                  <>
                    {medal && <img src={medal} alt={`medal${rank}`} className="w-[80px] h-[80px] z-10" />}
                  </>
                ) : (
                  <div className="w-[60px] h-[60px] rounded-full bg-[#e0e0e0] flex items-center justify-center text-[28px] font-bold text-[#232325] border-4 border-[#2c2c2c]">{rank}</div>
                )} {/* 메달 없을 때 글자 크기, 색, 두께 조절해야함 */}
              </div>
              {/* 썸네일 */}
              <img 
                src={selectedCategory.thumbnail} 
                alt="Featured thumbnail" 
                className="w-[450px] h-[250px] object-cover rounded-[11px]"
              />
            </div>
            
            {/* 제목과 설명 */}
            <div>
              <div className="text-[30px] font-semibold text-white mb-2">{selectedCategory.title}</div>
              <div className="text-rgba(255, 255, 255, 0.6) text-[24px] font-thin">{selectedCategory.desc}</div>
              <div className="flex flex-row gap-10 text-[#ffffff] text-[25px] font-medium">
                <div>전체 영상 수 : <span>{selectedCategory.videoCount}개</span></div>
                <div>평균 조회수 : <span>{selectedCategory.viewCount}</span></div>
                <div>평균 좋아요 수 : <span>{selectedCategory.likeCount}개</span></div>
              </div> {/* 컨테이너 아래쪽으로 정렬해야함 */}
            </div>
          </div>

          {/* 하단 카테고리 카드 섹션 */}
          <div className="bg-[#1c2023] rounded-[16px] p-8">
            {/* 가로 스크롤 컨테이너 */}
            <div className="relative w-full">
              {/* 카드 컨테이너 */}
              <div 
                className="flex gap-6 overflow-x-auto"
                style={{
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {categoryCards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[485px] h-[505px] bg-[#1c2023] rounded-[16px] p-6 hover:bg-[#2a2e31] transition-colors cursor-pointer border-[1px] border-rgba(255, 255, 255, 0.3)">
                    {/* 썸네일 */}
                    <img 
                      src={card.thumbnail} 
                      alt="Category thumbnail" 
                      className="w-[450px] h-[250px] object-cover rounded-[11px] mb-4"
                    />
                    
                    {/* 정보 */}
                    <div className="space-y-2">
                      <div className="text-[#848485] text-[20px] font-regular">{card.date}</div>
                      <div 
                        className="text-[22px] font-regular text-white"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {card.title}
                      </div>
                      <div className="space-y-1 text-[#848485] text-[20px] font-regular">
                        <div>조회수 {card.views}</div>
                        <div>댓글 참여율 {card.commentRate}</div>
                        <div>좋아요 참여율 {card.likeRate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 