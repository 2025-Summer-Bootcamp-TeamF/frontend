import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import thumbnail from "../assets/thumbnail1.png";
import arrow from "../assets/arrow.png";
import VideoInfoBox from "../components/VideoInfoBox";

// 영상 정보 타입 정의
interface VideoInfo {
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  commentRate: string;
  likeRate: string;
}

// AI 분석 결과 타입 정의
interface AnalysisResult {
  summary_title: string;
  overall_summary_one_line: string;
  positive_summary_one_line: string;
  positive_keywords: Array<{
    keyword: string;
    description: string;
  }>;
  negative_summary_one_line: string;
  negative_keywords: Array<{
    keyword: string;
    description: string;
  }>;
}

export default function ReplyAnalysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 전달받은 영상 정보 또는 기본값 사용
  const videoInfo: VideoInfo = location.state?.videoInfo || {
    thumbnail: thumbnail,
    date: location.state?.videoInfo?.upload_date || location.state?.summaryData?.upload_date || "",
    title: "",
    views: "",
    commentRate: "",
    likeRate: ""
  };

  // 분석 데이터 로딩
  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // summaryData에서 분석 결과 추출
        const summaryData = location.state?.summaryData;
        if (summaryData && summaryData.summary) {
          const parsedResult = JSON.parse(summaryData.summary);
          setAnalysisData(parsedResult);
        } else {
          setError('분석 데이터가 없습니다.');
        }
      } catch (err) {
        console.error('분석 데이터 로딩 실패:', err);
        setError('분석 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [location.state?.summaryData]);

  // 긍정/부정 비율 계산 (기본값 또는 분석 데이터에서 계산)
  const getSentimentPercentages = () => {
    if (!analysisData) {
      return { positive: 84, negative: 16 };
    }
    
    // summaryData에서 positive_ratio 사용
    const summaryData = location.state?.summaryData;
    if (summaryData && summaryData.positive_ratio !== undefined) {
      const positive = summaryData.positive_ratio;
      const negative = 100 - positive;
      return { positive, negative };
    }
    
    // fallback: positive_keywords와 negative_keywords의 개수로 비율 계산
    const positiveCount = analysisData.positive_keywords.length;
    const negativeCount = analysisData.negative_keywords.length;
    const total = positiveCount + negativeCount;
    
    if (total === 0) return { positive: 50, negative: 50 };
    
    const positive = Math.round((positiveCount / total) * 100);
    const negative = 100 - positive;
    
    return { positive, negative };
  };

  const { positive: positivePercentage, negative: negativePercentage } = getSentimentPercentages();
  const isPositiveDominant = positivePercentage > negativePercentage;

  // 도넛 차트 렌더링
  const renderDonutChart = () => {
    const radius = 80;
    const strokeWidth = 20;
    const circumference = 2 * Math.PI * radius;
    
    const positiveOffset = circumference - (positivePercentage / 100) * circumference;
    
    return (
      <div className="flex flex-col justify-center items-center w-full h-[370px]">
        <div className="z-0 w-full h-full rounded-2xl bg-[#1c2023] p-8 flex flex-col items-center justify-center">
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              {/* 배경 원 */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#ff0000"
                strokeWidth={strokeWidth}
              />
              {/* 긍정적 반응 */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#278eff"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={positiveOffset}
                strokeLinecap="round"
              />
            </svg>
            {/* 중앙 텍스트 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[32px] font-bold text-white">{positivePercentage}%</div>
              <div className="text-[16px] text-gray-400">긍정</div>
            </div>
          </div>
          {/* 범례 */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#278eff] rounded-full mr-1"></div>
              <span className="text-white">긍정 ({Math.round(positivePercentage * 100) / 100}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#ff0000] rounded-full mr-1"></div>
              <span className="text-white">부정 ({Math.round(negativePercentage * 100) / 100}%)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-black text-white flex">
        <Sidebar />
        <div className="ml-[6vw] pr-8 py-8 flex gap-4 w-full">
          <div className="flex items-center justify-center w-full">
            <div className="text-[24px] text-white">분석 데이터를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-black text-white flex">
        <Sidebar />
        <div className="ml-[6vw] pr-8 py-8 flex gap-4 w-full">
          <div className="flex items-center justify-center w-full">
            <div className="text-[24px] text-red-500">오류: {error}</div>
          </div>
        </div>
      </div>
    );
  }

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
                  onClick={() => {
                    // 현재 영상 정보를 Reply_AnalysisList로 전달
                    const currentVideoInfo = location.state?.videoInfo || videoInfo;
                    const videoId = location.state?.videoId || location.state?.summaryData?.video_id;
                    
                    navigate("/reply_analysis_list", {
                      state: {
                        videoId: videoId,
                        videoInfo: currentVideoInfo
                      }
                    });
                  }}
                  style={{ transform: "scaleX(-1)" }}
                  aria-label="뒤로가기"
                >
                  <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
                </button>
              </div>
              <VideoInfoBox
                thumbnail={videoInfo.thumbnail}
                date={videoInfo.date}
                title={videoInfo.title}
                views={videoInfo.views}
                commentRate={videoInfo.commentRate}
                likeRate={videoInfo.likeRate}
                className=""
              />
            </div>

            {/* 감정 분석 도넛 차트 */}
            {renderDonutChart()}
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
                → {analysisData?.overall_summary_one_line || '분석 데이터가 없습니다.'}
              </div>
            </div>

            {/* Positive Reactions Section */}
            <div className="bg-[#23242A] rounded-2xl p-8 pt-4 pb-6 border-l-8 border-blue-500 mt-6 w-full">
              <div className="flex items-center text-[28px] font-thin text-[#d9d9d9] mb-6">
                <span className="w-[15px] h-[15px] rounded-full bg-[#278eff] mr-4"></span>
                긍정적인 반응
              </div>
              
              {/* Positive Keywords */}
              <div className="flex flex-row">
              <div className="grid gap-4 mb-6">
                {analysisData?.positive_keywords.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-[#d9d9d9] text-[12px] font-thin mr-2 items-center text-right">
                      {item.description}
                    </span>
                    <div className="relative flex items-center w-[4vw] h-[4vh]">
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#278eff] rounded-full shadow-lg"></span>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#60a5fa] rounded-full opacity-80"></span>
                      <span className="absolute left-7 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#93c5fd] rounded-full opacity-60"></span>
                      <span className="absolute left-10 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#bae6fd] rounded-full opacity-40"></span>
                    </div>
                    <span className="bg-[#278eff] text-[#ffffff] rounded-xl w-[6vw] text-[14px] p-1 font-regular text-center"># {item.keyword}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 mb-6">
                {analysisData?.positive_keywords.slice(2, 4).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="bg-[#278eff] text-[#ffffff] rounded-xl w-[6vw] text-[14px] p-1 font-regular text-center"># {item.keyword}</span>
                    <div className="relative flex items-center w-[4vw] h-[4vh]" style={{scale: "-1"}}>
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#278eff] rounded-full shadow-lg"></span>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#60a5fa] rounded-full opacity-80"></span>
                      <span className="absolute left-7 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#93c5fd] rounded-full opacity-60"></span>
                      <span className="absolute left-10 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#bae6fd] rounded-full opacity-40"></span>
                    </div>
                    <span className="text-[#d9d9d9] text-[12px] font-thin mr-2 items-center text-left">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
              </div>
              
              {/* Summary */}
              <div className="text-[#d9d9d9] text-[23px] font-medium mt-8 text-right">
                {analysisData?.positive_summary_one_line || '긍정적 반응에 대한 요약이 없습니다.'}
              </div>
            </div>

            {/* Negative Reactions Section */}
            <div className="bg-[#23242A] rounded-2xl p-8 pt-4 border-l-8 border-red-500 mt-6 w-full">
              <div className="flex items-center text-[28px] font-thin text-[#d9d9d9] mb-6">
                <span className="w-[15px] h-[15px] rounded-full bg-[#ff0000] mr-4"></span>
                부정적인 반응
              </div>
              
              {/* Negative Keywords */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {analysisData?.negative_keywords.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-[#d9d9d9] text-[12px] font-thin mr-2 items-center text-right">
                      {item.description}
                    </span>
                    <div className="relative flex items-center w-[8vw] h-[4vh]">
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff0000] rounded-full shadow-lg"></span>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff4d4f] rounded-full opacity-80"></span>
                      <span className="absolute left-7 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff7a7a] rounded-full opacity-60"></span>
                      <span className="absolute left-10 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ffb3b3] rounded-full opacity-40"></span>
                    </div>
                    <span className="bg-[#ff0000] text-[#ffffff] rounded-xl w-[6vw] text-[14px] p-1 font-regular text-center"># {item.keyword}</span>
                    <div className="relative flex items-center w-[8vw] h-[4vh]" style={{scale: "-1"}}>
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff0000] rounded-full shadow-lg"></span>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff4d4f] rounded-full opacity-80"></span>
                      <span className="absolute left-7 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff7a7a] rounded-full opacity-60"></span>
                      <span className="absolute left-10 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ffb3b3] rounded-full opacity-40"></span>
                    </div>
                    <span className="text-[#d9d9d9] text-[12px] font-thin ml-2 items-center text-left">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="text-[#d9d9d9] text-[23px] font-medium mt-8 text-right">
                {analysisData?.negative_summary_one_line || '부정적 반응에 대한 요약이 없습니다.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 