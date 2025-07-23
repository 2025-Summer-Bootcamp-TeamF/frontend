import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
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
  },
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
  const rank = parseInt(searchParams.get("rank") || "1");

  // rank에 따른 메달 결정
  const getMedal = (rank: number) => {
    if (rank === 1) return medal1;
    if (rank === 2) return medal2;
    if (rank === 3) return medal3;
    return null;
  };

  const medal = getMedal(rank);

  // rank에 따른 카테고리 데이터 가져오기
  const selectedCategory =
    categoryData.find((item) => item.rank === rank) || categoryData[0];

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
      <div className="ml-[6vw] pr-8 py-8 flex gap-4 w-full overflow-x-hidden">
        <div
          className="rounded-2xl overflow-hidden h-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* 상단 큰 썸네일 섹션 */}
          <div className="m-10 bg-[#1c2023] rounded-2xl pl-6 pr-10 py-8 flex flex-row">
            {/* 뒤로가기 버튼 */}
            <div className="relative pr-8 pl-4">
              <button
                className="rounded-full items-center justify-center cursor-pointer"
                onClick={() => navigate("/category")}
                style={{ transform: "scaleX(-1)" }}
                aria-label="뒤로가기"
              >
                <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
              </button>
            </div>

            <div className="relative flex flex-col ml-2 mr-10 min-w-0">
              {/* 메달 */}
              <div className="absolute left-4 z-20">
                {rank <= 3 ? (
                  <>
                    {medal && (
                      <img
                        src={medal}
                        alt={`medal${rank}`}
                        className="w-[5vw] h-[8vh] z-10"
                      />
                    )}
                  </>
                ) : (
                  <div className="w-[3vw] h-[5vh] rounded-full bg-[#e0e0e0] flex items-center justify-center text-[2rem] font-bold text-[#232325] border-3 border-[#2c2c2c]">
                    {rank}
                  </div>
                )}
              </div>
              {/* 썸네일 */}
              <img
                src={selectedCategory.thumbnail}
                alt="Featured thumbnail"
                className="w-[24vw] min-w-[300px] h-[14vw] min-h-[200px] object-cover rounded-2xl"
                style={{ maxWidth: "100%" }}
              />
            </div>

            {/* 제목과 설명 */}
            <div className="min-w-0 flex flex-col pr-10">
              <div className="text-[1.8rem] font-semibold text-white mt-1 mb-1 break-words">
                {selectedCategory.title}
              </div>
              <div className="text-[1.5rem] font-thin text-white/60 break-words">
                {selectedCategory.desc}
              </div>
              <div className="flex flex-row gap-10 text-[#ffffff] text-[1.5rem] font-medium justify-between pr-8 mt-18">
                <div>
                  전체 영상 수 : <span>{selectedCategory.videoCount}개</span>
                </div>
                <div>
                  평균 조회수 : <span>{selectedCategory.viewCount}</span>
                </div>
                <div>
                  평균 좋아요 수 : <span>{selectedCategory.likeCount}개</span>
                </div>
              </div>{" "}
              {/* 아래로 정렬해야함 */}
            </div>
          </div>

          {/* 하단 카테고리 카드 섹션 */}
          <div className="mx-10 my-8 bg-[#1c2023] rounded-2xl p-8">
            {/* 가로 스크롤 컨테이너 */}

            <div
              className="relative overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
              onWheel={(e) => {
                // shift키를 누르지 않아도 휠로 좌우 스크롤
                const container = e.currentTarget;
                if (e.deltaY !== 0) {
                  e.preventDefault();
                  container.scrollLeft += e.deltaY;
                }
              }}
            >
              {/* 카드 컨테이너 */}
              <div className="flex gap-4">
                {categoryCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-[#1c2023] rounded-2xl p-5 border-2 border-[rgba(255,255,255,0.3)]"
                  >
                    {/* 썸네일 */}
                    <img
                      src={card.thumbnail}
                      alt="Category thumbnail"
                      className="w-[25vw] min-w-[300px] h-[12vw] min-h-[200px] object-cover rounded-2xl"
                    />

                    {/* 정보 */}
                    <div className="flex flex-col">
                      <div className="text-[#848485] text-[1rem] font-regular mt-2">
                        {card.date}
                      </div>
                      <div className="text-[1.3rem] font-regular text-white mb-2">
                        {card.title}
                      </div>
                      <div className="text-[#848485] text-[1rem] font-regular">
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
