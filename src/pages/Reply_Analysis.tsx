import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import thumbnail from "../assets/thumbnail1.png";
import arrow from "../assets/arrow.png";
import VideoInfoBox from "../components/VideoInfoBox";

export default function ReplyAnalysis() {
  const navigate = useNavigate();
  
  // 감정 분석 결과 (긍정 84%, 부정 16%)
  const positivePercentage = 84;
  const negativePercentage = 16;
  const isPositiveDominant = positivePercentage > negativePercentage;
  
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

      {/* 메인 컨텐츠 영역 */}
      <div className="ml-[6vw] pr-8 py-8 flex gap-4 w-full">
        {/* 왼쪽 컨테이너 - 영상 정보 및 탭 */}
        <div
          className="
            flex flex-col flex-3 w-full rounded-2xl
            bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)]
            p-10
            "
        >
          <div>
            {/* 영상 썸네일 및 정보 - VideoInfoBox 컴포넌트로 대체 */}
            <div className="relative flex flex-col ">
              {/* 뒤로가기 버튼을 썸네일 위가 아닌 바깥쪽에 배치 */}
              <div>
                <button
                  className="rounded-full items-center justify-center cursor-pointer"
                  onClick={() => navigate("/mainpage_login")}
                  style={{ transform: "scaleX(-1)" }}
                  aria-label="뒤로가기"
                >
                  <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
                </button>
              </div>
              <VideoInfoBox
                thumbnail={thumbnail}
                date="2025. 07. 10"
                title="[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE"
                views="38,665회"
                commentRate="0.007%"
                likeRate="0.7%"
                className=""
              />
            </div>

            {/* 감정 분석 도넛 차트 */}
            <div className="flex flex-col justify-center items-center w-full h-[370px]">
              <div className="z-0 w-full h-full rounded-2xl bg-[#1c2023]"></div>
            </div>
          </div>
        </div>

        {/* 오른쪽 컨테이너 - 댓글 분석 */}
        <div
          className="
            flex flex-col flex-7 w-full rounded-2xl 
            bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)]
            h-full min-h-0
          "
        >
          <div className="p-8 flex flex-col">
            {/* 헤더 영역 */}
            <div>
              <div className="mt-14 text-[24px] font-bold text-[#ffffff]">
                해당 영상 댓글에 대한 분석
              </div>
              <div className={`text-[20px] px-3 py-3 font-semibold ${
                isPositiveDominant 
                  ? 'text-[#278eff]' 
                  : 'text-[#ff0000]'
              }`}>
                → {isPositiveDominant 
                  ? '자극적 연출이라는 지적과 함께 언론 신뢰도 하락 우려가 있음.'
                  : '부정적인 반응이 우세하여 즉시 대응이 필요한 상황입니다.'
                }
              </div>
            </div>

            {/* Positive Reactions Section */}
            <div className="bg-[#23242A] rounded-2xl p-8 pt-4 pb-6 border-l-8 border-blue-500 mt-6 w-full">
              <div className="flex items-center text-[28px] font-thin text-[#d9d9d9] mb-6">
                <span className="w-[15px] h-[15px] rounded-full bg-[#278eff] mr-4"></span>
                긍정적인 반응
              </div>
              
              {/* First Point */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-2 items-center text-right">
                  기존 뉴스 형식에서 벗어난 새로운 보도 방식이라는 평가
                </span>
                {/* '미학적 연출' 태그와 연결된 듯한 원 장식 */}
                <div className="relative flex items-center w-[12vw] h-[5vh]">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4">
                  <span className="bg-[#278eff] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 미학적 연출</span>
                  <span className="bg-[#278eff] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 감정적 몰입</span>
                </div>
                <div className="relative flex items-center w-[12vw] h-[5vh]" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-2 items-center text-left">
                  시청자가 보도 내용에 감정적으로 이입하거나 몰입함을 느낌
                </span>
              </div>
              
              {/* Second Point */}
              <div className="flex items-center mb-6">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-2 items-center text-right">
                  단순한 사실 전달이 아닌 이야기 구조로 사건을 전달함
                </span>
                <div className="relative flex items-center w-[12vw] h-[5vh]">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4">
                  <span className="bg-[#278eff] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 창의적 보도</span>
                  <span className="bg-[#278eff] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 스토리텔링</span>
                </div>
                <div className="relative flex items-center w-[12vw] h-[5vh]" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-2 items-center text-left">
                  시각적, 음악적 연출이 예술적으로 구성되어 있다는 반응
                </span>
              </div>
              
              {/* Summary */}
              <div className="text-[#d9d9d9] text-[23px] font-medium mt-8 text-right">
                캐릭터 중심의 보도 방식을 감정 몰입과 창의적 접근으로 긍정적으로 평가함.<br />
                기존 뉴스보다 전달력이 뛰어났다는 반응도 있음.
              </div>
            </div>

            {/* Negative Reactions Section */}
            <div className="bg-[#23242A] rounded-2xl p-8 pt-4 border-l-8 border-red-500 mt-6 w-full">
              <div className="flex items-center text-[28px] font-thin text-[#d9d9d9] mb-6">
                <span className="w-[15px] h-[15px] rounded-full bg-[#ff0000] mr-4"></span>
                부정적인 반응
              </div>
              
              {/* First Point */}
              <div className="flex items-center mb-6">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-2 items-center text-right">
                  기존 뉴스 형식에서 벗어난 새로운 보도 방식이라는 평가
                </span>
                <div className="relative flex items-center w-[12vw] h-[5vh]">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4">
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 미학적 연출</span>
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 감정적 몰입</span>
                </div>
                <div className="relative flex items-center w-[12vw] h-[5vh]" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-2 items-center text-left">
                  시청자가 보도 내용에 감정적으로 이입하거나 몰입함을 느낌
                </span>
              </div>
              
              {/* Second Point */}
              <div className="flex items-center mb-6">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-2 items-center text-right">
                  단순한 사실 전달이 아닌 이야기 구조로 사건을 전달함
                </span>
                <div className="relative flex items-center w-[12vw] h-[5vh]">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4">
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 창의적 보도</span>
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-xl w-[8vw] text-[20px] p-1 font-regular text-center"># 스토리텔링</span>
                </div>
                <div className="relative flex items-center w-[12vw] h-[5vh]" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-2 items-center text-left">
                  시각적, 음악적 연출이 예술적으로 구성되어 있다는 반응
                </span>
              </div>
              
              {/* Summary */}
              <div className="text-[#d9d9d9] text-[23px] font-medium mt-8 text-right">
                캐릭터 중심의 보도 방식을 감정 몰입과 창의적 접근으로 긍정적으로 평가함.<br />
                기존 뉴스보다 전달력이 뛰어났다는 반응도 있음.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 