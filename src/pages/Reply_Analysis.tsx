import React from "react";
import { useNavigate } from "react-router-dom";
import youtubeLogo from "../assets/youtube.png";
import image1 from "../assets/image1.png";
import channelAnalysisIcon from "../assets/channel_analysis.png";
import mypageIcon from "../assets/mypage.png";
import videoCategorizeIcon from "../assets/video_categorize.png";

export default function ReplyAnalysis() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#18191b] flex font-['Roboto','sans-serif'] overflow-hidden">
      {/* 사이드바 */}
      <div className="w-[90px] bg-[#111] flex flex-col items-center pt-6 rounded-tl-[18px] rounded-bl-[18px] h-screen">
        <img src={youtubeLogo} alt="YouTube Logo" className="mb-9 cursor-pointer w-[60px] h-[40px] object-contain" onClick={() => navigate("/")} />
        <img src={mypageIcon} alt="My Page" className="w-8 h-8 my-[18px] opacity-80 cursor-pointer select-none" onClick={() => navigate("/mypage")} />
        <img src={channelAnalysisIcon} alt="Channel Analysis" className="w-8 h-8 my-[18px] opacity-80 cursor-pointer select-none" onClick={() => navigate("/channel-analysis")} />
        <img src={videoCategorizeIcon} alt="Video Categorize" className="w-8 h-8 my-[18px] opacity-80 cursor-pointer select-none" onClick={() => navigate("/video-categorize")} />
      </div>
      {/* 메인 */}
      <div className="flex-1 flex gap-6 pl-0 pr-6 py-6 h-screen box-border">
        {/* 왼쪽 카드 */}
        <div className="w-[400px] bg-[#232325] rounded-[18px] shadow-lg px-4 pt-12 pb-4 flex flex-col items-center min-w-0 h-full box-border relative">
          <div className="absolute top-4 left-4 text-[1.5rem] text-white opacity-70 mb-2 cursor-pointer select-none" onClick={() => navigate(-1)}>&#8592;</div>
          <img src={image1} alt="썸네일" className="w-full max-w-[360px] h-[240px] rounded-[12px] object-cover mb-3 select-none" draggable={false} style={{ marginTop: 32 }} />
          <div className="w-full text-white mb-2 ml-3 mt-5">
            <div className="text-[#aaa] text-[0.95rem] mb-1">2025. 07. 10</div>
            <div className="text-[1rem] font-medium mb-2">[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE</div>
            <div className="text-[0.95rem] text-[#ccc] mb-1">조회수 <span className="ml-2">38,665회</span></div>
            <div className="text-[0.95rem] text-[#ccc] mb-1">댓글 참여율 <span className="ml-2">0.007%</span></div>
            <div className="text-[0.95rem] text-[#ccc] mb-1">좋아요 참여율 <span className="ml-2">0.7%</span></div>
          </div>
          {/* 도넛 파이 그래프 - FIGMA 스타일, 넓은 영역 */}
          <div className="w-full flex flex-row items-center justify-center mt-10 mb-10 relative h-[260px]">
            <svg width="160" height="160" viewBox="0 0 320 320" className="block mr-8 relative z-[1]">
              {/* 파랑(긍정) - 84% (시작 각도 12시) */}
              <circle r="120" cx="160" cy="160" fill="none" stroke="#3B82F6" strokeWidth="68" strokeDasharray="816.81 155.52" strokeDashoffset="-160" />
              {/* 빨강(부정) - 16% */}
              <circle r="120" cx="160" cy="160" fill="none" stroke="#EF4444" strokeWidth="68" strokeDasharray="155.52 816.81" strokeDashoffset="656.81" />
              {/* 가운데 구멍(더 크게) */}
              <circle r="35" cx="160" cy="160" fill="#23242A" />
            </svg>
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center mb-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-2"></span>
                <span className="text-blue-500 font-medium text-[14px]">긍정적인 반응 84%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>
                <span className="text-red-500 font-medium text-[14px]">부정적인 반응 16%</span>
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽 분석 카드 - Tailwind CSS 적용, 오류 없는 구조 */}
        <div className="flex-1 bg-[#232325] rounded-[18px] shadow-lg px-12 py-10 flex flex-col gap-8 min-w-0">
          <div className="text-[22px] font-bold text-[#F4F4F5] mt-7 mb-1">해당 영상 댓글에 대한 분석</div>
          <div className="inline-block bg-[#23242A] text-blue-300 text-[16px] px-4 py-2 rounded mb-5">
            → 자극적 연출이라는 지적과 함께 언론 신뢰도 하락 우려가 있음.
          </div>
          {/* 긍정적 반응 */}
          <div className="bg-[#23242A] rounded-xl shadow p-8 border-l-8 border-blue-500 mb-5">
            <div className="flex items-center text-[18px] font-bold text-[#F4F4F5] mb-5">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-3 inline-block"></span>
              긍정적인 반응
            </div>
            <div className="flex items-center mb-2">
              <span className="text-[#ccc] text-[15px] mr-4">기존 뉴스 형식에서 벗어난 새로운 보도 방식이라는 평가</span>
              <div className="flex gap-2 w-40">
                <span className="bg-[#1E293B] text-blue-400 rounded px-3 py-1 text-[14px] font-medium"># 미학적 연출</span>
                <span className="bg-[#1E293B] text-blue-400 rounded px-3 py-1 text-[14px] font-medium"># 감정적 몰입</span>
              </div>
              <span className="text-[#ccc] text-[15px] ml-4">시청자가 보도 내용에 감정적으로 이입하거나 몰입함을 느낌</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-[#ccc] text-[15px] mr-4">단순한 사실 전달이 아닌 이야기 구조로 사건을 전달함</span>
              <div className="flex gap-2 w-40">
                <span className="bg-[#1E293B] text-blue-400 rounded px-3 py-1 text-[14px] font-medium"># 창의적 보도</span>
                <span className="bg-[#1E293B] text-blue-400 rounded px-3 py-1 text-[14px] font-medium"># 스토리텔링</span>
              </div>
              <span className="text-[#ccc] text-[15px] ml-4">시각적, 음악적 연출이 예술적으로 구성되어 있다는 반응</span>
            </div>
            <div className="text-white text-[16px] font-semibold mt-5">
              캐릭터 중심의 보도 방식을 감정 몰입과 창의적 접근으로 긍정적으로 평가함.<br />
              기존 뉴스보다 전달력이 뛰어났다는 반응도 있음.
            </div>
          </div>
          {/* 부정적 반응 */}
          <div className="bg-[#23242A] rounded-xl shadow p-8 border-l-8 border-red-500 mb-9">
            <div className="flex items-center text-[18px] font-bold text-[#F4F4F5] mb-5">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-3 inline-block"></span>
              부정적인 반응
            </div>
            <div className="flex items-center mb-2">
              <span className="text-[#ccc] text-[15px] mr-4">기존 뉴스 형식에서 벗어난 새로운 보도 방식이라는 평가</span>
              <div className="flex gap-2 w-40">
                <span className="bg-[#1E1B1B] text-red-400 rounded px-3 py-1 text-[14px] font-medium"># 미학적 연출</span>
                <span className="bg-[#1E1B1B] text-red-400 rounded px-3 py-1 text-[14px] font-medium"># 감정적 몰입</span>
              </div>
              <span className="text-[#ccc] text-[15px] ml-4">시청자가 보도 내용에 감정적으로 이입하거나 몰입함을 느낌</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-[#ccc] text-[15px] mr-4">단순한 사실 전달이 아닌 이야기 구조로 사건을 전달함</span>
              <div className="flex gap-2 w-40">
                <span className="bg-[#1E1B1B] text-red-400 rounded px-3 py-1 text-[14px] font-medium"># 창의적 보도</span>
                <span className="bg-[#1E1B1B] text-red-400 rounded px-3 py-1 text-[14px] font-medium"># 스토리텔링</span>
              </div>
              <span className="text-[#ccc] text-[15px] ml-4">시각적, 음악적 연출이 예술적으로 구성되어 있다는 반응</span>
            </div>
            <div className="text-white text-[16px] font-semibold mt-5">
              캐릭터 중심의 보도 방식을 감정 몰입과 창의적 접근으로 긍정적으로 평가함.<br />
              기존 뉴스보다 전달력이 뛰어났다는 반응도 있음.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

