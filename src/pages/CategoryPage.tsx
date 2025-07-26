import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
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
    <div className="min-h-screen overflow-x-hidden bg-black text-white flex">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ::-webkit-scrollbar {
            display: none;
          }
          html, body {
            overflow-y: scroll;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `,
        }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="ml-[6vw] pr-8 py-8 flex gap-4 w-full">
        <div
          className="rounded-2xl overflow-hidden h-full px-8"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          
          {/* 상단 제목/설명 */}
          <div className="mt-4 mb-8 relative">
            {/* 뒤로가기 버튼 */}
            <div className="relative p-8 pb-4">
                <button
                    className="rounded-full items-center justify-center cursor-pointer"
                    onClick={() => navigate("/main")}
                    style={{ transform: "scaleX(-1)" }}
                    aria-label="뒤로가기"
                >
                <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
                </button>
            </div>

            <div className="text-[1.8rem] text-[#ff0000] font-semibold mb-2 ml-10">썸네일 유형별 인기 콘텐츠 분석</div>
            <div className="text-[1.3rem] text-[#d9d9d9] font-light ml-10">
              영상의 썸네일을 분류하고, 각 카테고리별로 조회수가 높은 콘텐츠를 순위별로 정리하여 보여주는 공간입니다.<br />
              썸네일 스타일과 조회수 간의 상관관계를 분석하거나, 어떤 유형이 더 효과적인지 파악할 수 있습니다.
            </div>
          </div>
          {/* 인기 썸네일 카드 리스트 */}
          <div className="flex flex-col gap-6 mb-10">
            {data.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-row items-center bg-[#1c2023] rounded-2xl mx-10 pl-10 pr-24 py-8 cursor-pointer hover:bg-[#2a2e31] transition-colors"
                onClick={() => navigate(`/category_segmentation?rank=${item.rank}`)}
              >
                {/* 순위 뱃지 */}
                <div className="flex flex-col items-center mr-8">
                  {item.rank <= 3 ? (
                    <>
                      {/* 3위 이내면 assets 폴더의 1st, 2nd, 3rd png 사용 */}
                      {item.rank === 1 && (
                        <img
                          src={medal1}
                          alt="1st medal"
                          className="w-[4vw] h-[6vh] -mb-4 z-10"
                        />
                      )}
                      {item.rank === 2 && (
                        <img
                          src={medal2}
                          alt="2nd medal"
                          className="w-[4vw] h-[6vh] -mb-4 z-10"
                        />
                      )}
                      {item.rank === 3 && (
                        <img
                          src={medal3}
                          alt="3rd medal"
                          className="w-[4vw] h-[6vh] -mb-4 z-10"
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-[3vw] h-[5vh] mx-3 rounded-full bg-[#e0e0e0] flex justify-center items-center text-[2rem] font-bold text-[#232325]">{item.rank}</div>
                  )}
                </div>
                {/* 썸네일 */}
                <img src={item.thumbnail} alt="썸네일" className="w-[24vw] min-w-[300px] h-[14vw] min-h-[200px] max-h-[250px] mr-4 object-cover rounded-2xl" />
                {/* 텍스트/설명 */}
                <div className="flex flex-col ml-4">
                  <div className="text-[1.8rem] text-white font-semibold mb-2">{item.title}</div>
                  <div className="text-[1.3rem] text-rgba(255,255,255,0.6) font-thin mb-4">{item.desc}</div>
                  <div className="flex flex-row justify-between text-[#ffffff] text-[1.5rem] font-medium pr-2 mt-18">
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