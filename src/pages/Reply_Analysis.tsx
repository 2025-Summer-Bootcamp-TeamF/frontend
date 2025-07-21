import { useNavigate } from "react-router-dom";
import thumbnail from "../assets/thumbnail1.png";
import arrow from "../assets/arrow.png";
import mypageIcon from "../assets/mypagelogo.png";
import insightIcon from "../assets/insight.png";
import analysisIcon from "../assets/analysis.png";

export default function ReplyAnalysis() {
  const navigate = useNavigate();
  
  // 감정 분석 결과 (긍정 84%, 부정 16%)
  const positivePercentage = 84;
  const negativePercentage = 16;
  const isPositiveDominant = positivePercentage > negativePercentage;
  
  return (
    <div className="w-[1920px] h-[1080px] bg-black text-white flex">
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

      {/* Sidebar (mypage.tsx와 동일) */}
      <div
        className="fixed left-0 top-0 h-full flex flex-col items-center z-50"
        style={{ width: "6vw" }}
      >
        <div style={{ marginTop: "2.94vh", marginBottom: "24px" }}>
          <img src="/logo.png" alt="Logo" className="w-auto h-auto" />
        </div>
        <button className="p-3 rounded-lg transition-all mb-4 group">
          <img
            src="/mypagelogo.png"
            alt="My Page"
            className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all"
          />
        </button>
        <button className="p-3 rounded-lg transition-all mb-4 group">
          <img
            src="/insight.png"
            alt="Insight"
            className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all"
          />
        </button>
        <button className="p-3 rounded-lg transition-all group">
          <img
            src="/analysis.png"
            alt="Analysis"
            className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all"
          />
        </button>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="ml-[6vw] flex-1 pr-8 py-8 flex gap-6">
        {/* 왼쪽 컨테이너 - 영상 정보 및 탭 */}
        <div 
          className="w-[560px] h-[1025px] flex flex-col gap-6 rounded-[15px] overflow-hidden"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="p-6">
            {/* 영상 썸네일 */}
            <div className="relative mb-6 flex flex-col">
              {/* 뒤로가기 버튼을 썸네일 위가 아닌 바깥쪽에 배치 */}
              <div className="mb-2 flex">
                <button
                  className="mb-3 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10"
                  onClick={() => navigate("/mainpage_login")}
                  style={{ marginRight: "8px", marginTop: "8px", transform: "scaleX(-1)" }}
                  aria-label="뒤로가기"
                >
                  <img src={arrow} alt="뒤로가기" className="w-6 h-4" />
                </button>
              </div>
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className="w-[450px] h-[250px] object-cover rounded-[11px] mt-6"
              />
            </div>

            {/* 영상 정보 */}
            <div className="text-white mb-6 p-3 justify-center items-center w-full">
              <div className="text-[#848485] text-[20px] font-normal mb-2">2025. 07. 10</div>
              <div className="text-[22px] font-regular mb-2">[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE</div>
              <div className="text-[#848485] text-[20px] font-normal mb-1">조회수 38,665회</div>
              <div className="text-[#848485] text-[20px] font-normal mb-1">댓글 참여율 0.007%</div>
              <div className="text-[#848485] text-[20px] font-regular">좋아요 참여율 0.7%</div>
            </div>

            {/* 감정 분석 도넛 차트 */}
            <div className="w-full flex flex-col items-center justify-center mt-8 mb-2 relative h-[300px] p-3">
              {/* 도넛 차트 뒤쪽 배경 */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full h-full rounded-[15px] bg-[#1c2023]"></div>
              <svg width="400" height="200" viewBox="0 0 320 320" className="block relative z-[1]">
                {/* 빨강(부정) - 16% */}
                <circle
                  r="120"
                  cx="160"
                  cy="160"
                  fill="none"
                  stroke="#ff0000"
                  strokeWidth="80"
                  strokeDashoffset="633.44"
                  style={{ transition: "stroke-dasharray 0.5s" }}
                />
                {/* 파랑(긍정) - 84% */}
                <circle
                  r="120"
                  cx="160"
                  cy="160"
                  fill="none"
                  stroke="#278eff"
                  strokeWidth="80"
                  strokeDasharray="633.44 193.28"
                  strokeDashoffset="0"
                  style={{ transition: "stroke-dasharray 0.5s" }}
                />
                {/* 부정 텍스트/점/선 */}
                <circle cx="300" cy="80" r="7" fill="#EF4444" />
                <line x1="190" y1="110" x2="300" y2="80" stroke="#ff0000" strokeWidth="3" />
                <text x="295" y="80" fill="#EF4444" fontSize="20" fontWeight="semibold" alignmentBaseline="middle">부정적인 반응</text>
                <text x="295" y="105" fill="#EF4444" fontSize="22" fontWeight="semibold" alignmentBaseline="middle">16%</text>
                {/* 긍정 텍스트/점/선 */}
                <circle cx="60" cy="270" r="7" fill="#3B82F6" />
                <line x1="120" y1="220" x2="60" y2="270" stroke="#278eff" strokeWidth="3" />
                <text x="10" y="275" fill="#3B82F6" fontSize="20" fontWeight="semibold" alignmentBaseline="middle">긍정적인 반응</text>
                <text x="10" y="300" fill="#3B82F6" fontSize="22" fontWeight="semibold" alignmentBaseline="middle">84%</text>
              </svg>
            </div>
          </div>
        </div>

        {/* 오른쪽 컨테이너 - 댓글 분석 */}
        <div 
          className="flex-1 w-[1190px] h-[1025px] rounded-[15px] overflow-hidden flex flex-col"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="px-14 py-10 flex flex-col flex-1">
            {/* 헤더 영역 */}
            <div className="mb-4">
              <div className="text-[24px] font-bold text-[#ffffff] mt-4">
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
            <div className="bg-[#23242A] rounded-[15px] shadow p-8 border-l-8 border-blue-500 mb-6">
              <div className="flex items-center text-[28px] font-thin text-[#d9d9d9] mb-6">
                <span className="w-[15px] h-[15px] rounded-full bg-[#278eff] mr-4"></span>
                긍정적인 반응
              </div>
              
              {/* First Point */}
              <div className="flex items-center mb-4">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-6 flex-1 justify-center items-center text-right">
                  기존 뉴스 형식에서 벗어난 새로운 보도 방식이라는 평가
                </span>
                {/* '미학적 연출' 태그와 연결된 듯한 원 장식 */}
                <div className="relative flext items-center w-40 h-12">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4 w-80">
                  <span className="bg-[#278eff] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 미학적 연출</span>
                  <span className="bg-[#278eff] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 감정적 몰입</span>
                </div>
                <div className="relative flext items-center w-40 h-12" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-6 flex-1 justify-center items-center text-left">
                  시청자가 보도 내용에 감정적으로 이입하거나 몰입함을 느낌
                </span>
              </div>
              
              {/* Second Point */}
              <div className="flex items-center mb-4">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-6 flex-1 justify-center items-center text-right">
                  단순한 사실 전달이 아닌 이야기 구조로 사건을 전달함
                </span>
                <div className="relative flext items-center w-40 h-12">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4 w-80">
                  <span className="bg-[#278eff] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 창의적 보도</span>
                  <span className="bg-[#278eff] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 스토리텔링</span>
                </div>
                <div className="relative flext items-center w-40 h-12" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#278eff] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60a5fa] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#93c5fd] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#bae6fd] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-6 flex-1 justify-center items-center text-left">
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
            <div className="bg-[#23242A] rounded-[15px] shadow p-8 border-l-8 border-red-500">
              <div className="flex items-center text-[28px] font-thin text-[#d9d9d9] mb-6">
                <span className="w-[15px] h-[15px] rounded-full bg-[#ff0000] mr-4"></span>
                부정적인 반응
              </div>
              
              {/* First Point */}
              <div className="flex items-center mb-4">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-6 flex-1 justify-center items-center text-right">
                  기존 뉴스 형식에서 벗어난 새로운 보도 방식이라는 평가
                </span>
                <div className="relative flext items-center w-40 h-12">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4 w-80">
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 미학적 연출</span>
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 감정적 몰입</span>
                </div>
                <div className="relative flext items-center w-40 h-12" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-6 flex-1 justify-center items-center text-left">
                  시청자가 보도 내용에 감정적으로 이입하거나 몰입함을 느낌
                </span>
              </div>
              
              {/* Second Point */}
              <div className="flex items-center mb-4">
                <span className="text-[#d9d9d9] text-[15px] font-thin mr-6 flex-1 justify-center items-center text-right">
                  단순한 사실 전달이 아닌 이야기 구조로 사건을 전달함
                </span>
                <div className="relative flext items-center w-40 h-12">
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <div className="flex gap-4 w-80">
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 창의적 보도</span>
                  <span className="bg-[#ff0000] text-[#ffffff] rounded-[15px] px-4 py-2 text-[20px] font-regular"># 스토리텔링</span>
                </div>
                <div className="relative flext items-center w-40 h-12" style={{scale: "-1"}}>
                  {/* 메인 태그(미학적 연출) 위치 기준으로 원 배치 */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0000] rounded-full shadow-lg"></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4d4f] rounded-full opacity-80"></span>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff7a7a] rounded-full opacity-60"></span>
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb3b3] rounded-full opacity-40"></span>
                </div>
                <span className="text-[#d9d9d9] text-[15px] font-thin ml-6 flex-1 justify-center items-center text-left">
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