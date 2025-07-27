import React, { useState, useEffect } from "react";

interface CompetitorChannel {
  id: number; // other_channel 테이블의 id
  channel_id: number; // channel 테이블의 id
  channel_name: string;
  youtube_channel_id: string;
}

interface IndividualView {
  views: number;
  rate: number;
}

interface ChartDataItem {
  period: string;
  my: number;
  competitor1: number;
  competitor2: number;
  myViews: number;
  competitor1Views: number;
  competitor2Views: number;
  myRate: number;
  competitor1Rate: number;
  competitor2Rate: number;
}

interface ChannelViews {
  channel_id: number;
  channel_name: string;
  totalViews: number;
  individualViews?: IndividualView[];
}

interface ViewsPageProps {
  onDataRefresh?: () => void;
}

const ViewsPage: React.FC<ViewsPageProps> = ({ onDataRefresh }) => {
  const [competitors, setCompetitors] = useState<CompetitorChannel[]>([]);
  const [channelViews, setChannelViews] = useState<{
    myChannel: ChannelViews;
    competitors: ChannelViews[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 경쟁 채널 목록 가져오기
  const fetchCompetitors = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      console.log("Fetching competitors...");
      const response = await fetch("http://localhost:8000/api/others", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Competitors data:", data);
        setCompetitors(data.data || []);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError("경쟁 채널 목록을 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching competitors:", error);
      setError("네트워크 오류가 발생했습니다.");
    }
  };

  // 채널별 조회수 합계 가져오기
  const fetchChannelViews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      console.log("Fetching channel views...");
      const response = await fetch("http://localhost:8000/api/others/videos/views", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Channel views data:", data);
        setChannelViews(data.data);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError("조회수 데이터를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching channel views:", error);
      setError("네트워크 오류가 발생했습니다.");
    }
  };

  // 경쟁 채널 삭제
  const handleDeleteCompetitor = async (otherChannelId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      console.log("Deleting competitor with other_channel id:", otherChannelId);

      const response = await fetch(`http://localhost:8000/api/others/${otherChannelId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Competitor deleted successfully");
        // 삭제 성공 시 목록 새로고침
        await fetchCompetitors();
        await fetchChannelViews();
        // 부모 컴포넌트에 새로고침 알림
        if (onDataRefresh) {
          onDataRefresh();
        }
      } else {
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        setError("채널 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting competitor:", error);
      setError("네트워크 오류가 발생했습니다.");
    }
  };

  // 데이터 새로고침 함수 (외부에서 호출 가능)
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchCompetitors(), fetchChannelViews()]);
    setLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCompetitors(), fetchChannelViews()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // refreshData 함수를 window 객체에 등록 (외부에서 호출 가능하도록)
  useEffect(() => {
    (window as any).refreshViewsPageData = refreshData;
    return () => {
      delete (window as any).refreshViewsPageData;
    };
  }, []);

  // 차트 데이터 (개별 영상 조회수 기반)
  const getChartData = (): ChartDataItem[] => {
    if (!channelViews) {
      return [
        { period: "최신-2", my: 0, competitor1: 0, competitor2: 0, myViews: 0, competitor1Views: 0, competitor2Views: 0, myRate: 0, competitor1Rate: 0, competitor2Rate: 0 },
        { period: "최신-1", my: 0, competitor1: 0, competitor2: 0, myViews: 0, competitor1Views: 0, competitor2Views: 0, myRate: 0, competitor1Rate: 0, competitor2Rate: 0 },
        { period: "최신", my: 0, competitor1: 0, competitor2: 0, myViews: 0, competitor1Views: 0, competitor2Views: 0, myRate: 0, competitor1Rate: 0, competitor2Rate: 0 },
      ];
    }

    // 내 채널 개별 영상 조회수 (최신순: 0=최신, 1=최신-1, 2=최신-2)
    const myViews = channelViews.myChannel.individualViews || [
      { views: 0, rate: 0 },
      { views: 0, rate: 0 },
      { views: 0, rate: 0 }
    ];

    // 경쟁 채널 개별 영상 조회수
    const competitor1Views = channelViews.competitors[0]?.individualViews || [
      { views: 0, rate: 0 },
      { views: 0, rate: 0 },
      { views: 0, rate: 0 }
    ];
    const competitor2Views = channelViews.competitors[1]?.individualViews || [
      { views: 0, rate: 0 },
      { views: 0, rate: 0 },
      { views: 0, rate: 0 }
    ];

    // 최대 조회수 찾기 (스케일링용)
    const allViews = [
      ...myViews.map(v => v.views),
      ...competitor1Views.map(v => v.views),
      ...competitor2Views.map(v => v.views)
    ];
    const maxViews = Math.max(...allViews);
    const scale = maxViews > 0 ? 100 / maxViews : 1;

    return [
      { 
        period: "최신-2", 
        my: Math.round(myViews[0]?.views * scale || 0), 
        competitor1: Math.round(competitor1Views[0]?.views * scale || 0), 
        competitor2: Math.round(competitor2Views[0]?.views * scale || 0),
        myViews: myViews[0]?.views || 0,
        competitor1Views: competitor1Views[0]?.views || 0,
        competitor2Views: competitor2Views[0]?.views || 0,
        myRate: myViews[0]?.rate || 0,
        competitor1Rate: competitor1Views[0]?.rate || 0,
        competitor2Rate: competitor2Views[0]?.rate || 0
      },
      { 
        period: "최신-1", 
        my: Math.round(myViews[1]?.views * scale || 0), 
        competitor1: Math.round(competitor1Views[1]?.views * scale || 0), 
        competitor2: Math.round(competitor2Views[1]?.views * scale || 0),
        myViews: myViews[1]?.views || 0,
        competitor1Views: competitor1Views[1]?.views || 0,
        competitor2Views: competitor2Views[1]?.views || 0,
        myRate: myViews[1]?.rate || 0,
        competitor1Rate: competitor1Views[1]?.rate || 0,
        competitor2Rate: competitor2Views[1]?.rate || 0
      },
      { 
        period: "최신", 
        my: Math.round(myViews[2]?.views * scale || 0), 
        competitor1: Math.round(competitor1Views[2]?.views * scale || 0), 
        competitor2: Math.round(competitor2Views[2]?.views * scale || 0),
        myViews: myViews[2]?.views || 0,
        competitor1Views: competitor1Views[2]?.views || 0,
        competitor2Views: competitor2Views[2]?.views || 0,
        myRate: myViews[2]?.rate || 0,
        competitor1Rate: competitor1Views[2]?.rate || 0,
        competitor2Rate: competitor2Views[2]?.rate || 0
      },
    ];
  };

  const data = getChartData();
  const colors = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

  // 디버깅용 로그
  console.log("Chart data:", data);
  console.log("Channel views:", channelViews);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          backgroundColor: "#1C2023",
          minHeight: "600px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
          backgroundColor: "#1C2023",
          minHeight: "600px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  const maxValue = 100;

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#1C2023",
        minHeight: "600px",
        width: "100%",
      }}
    >
      <h2 className="text-gray-400 mb-8" style={{ fontSize: "20px" }}>
        최신 영상 3개 기준
      </h2>

      {/* 차트 영역 */}
      <div
        style={{
          position: "relative",
          marginBottom: "80px",
          width: "100%",
          paddingTop: "35%",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <svg
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Y축 눈금과 라벨 */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const y = 50 + i * 60;
              const percentage = (5 - i) * 20; // 100%, 80%, 60%, 40%, 20%, 0%
              
              // 개별 영상 조회수 중 최대값 찾기
              const allIndividualViews = [];
              if (channelViews?.myChannel?.individualViews) {
                allIndividualViews.push(...channelViews.myChannel.individualViews.map(v => v.views));
              }
              if (channelViews?.competitors) {
                channelViews.competitors.forEach(comp => {
                  if (comp.individualViews) {
                    allIndividualViews.push(...comp.individualViews.map(v => v.views));
                  }
                });
              }
              const maxViews = allIndividualViews.length > 0 ? Math.max(...allIndividualViews) : 0;
              const viewCount = Math.round((percentage / 100) * maxViews);
              
              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1={y}
                    x2="1100"
                    y2={y}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                  {/* Y축 라벨 */}
                  <text
                    x="90"
                    y={y + 5}
                    textAnchor="end"
                    fill="#666"
                    fontSize="12"
                    fontFamily="sans-serif"
                  >
                    {formatNumber(viewCount)}
                  </text>
                </g>
              );
            })}

            {/* 막대 그래프 */}
            {data.map((item, idx) => {
              const groupX = 300 + idx * 300;
              const barWidth = 60;
              const gap = 20;

              return (
                <g key={idx}>
                  {/* 내 채널 막대 */}
                  <rect
                    x={groupX - barWidth - gap}
                    y={350 - (item.my / maxValue) * 300}
                    width={barWidth}
                    height={(item.my / maxValue) * 300}
                    fill="#ef4444"
                  />
                  
                  {/* 내 채널 조회수 텍스트 */}
                  <text
                    x={groupX - barWidth - gap + barWidth / 2}
                    y={350 - (item.my / maxValue) * 300 - 10}
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="14"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {formatNumber(item.myViews)}
                  </text>
                  
                  {/* 내 채널 변화율 텍스트 */}
                  <text
                    x={groupX - barWidth - gap + barWidth / 2}
                    y={350 - (item.my / maxValue) * 300 - 25}
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="12"
                    fontFamily="sans-serif"
                  >
                    {item.myRate > 0 ? '+' : ''}{item.myRate.toFixed(1)}%
                  </text>

                  {/* 경쟁 채널 막대들 */}
                  {competitors.map((competitor, channelIdx) => {
                    const competitorKey = `competitor${channelIdx + 1}` as keyof typeof item;
                    const competitorValue = item[competitorKey] as number;
                    const competitorViews = channelViews?.competitors.find(
                      c => c.channel_id === competitor.channel_id
                    );
                    
                    return (
                      <g key={channelIdx}>
                        <rect
                          x={groupX + (channelIdx * (barWidth + gap))}
                          y={350 - (competitorValue / maxValue) * 300}
                          width={barWidth}
                          height={(competitorValue / maxValue) * 300}
                          fill={colors[channelIdx + 1] || colors[0]}
                        />
                        
                        {/* 경쟁 채널 조회수 텍스트 */}
                        <text
                          x={groupX + (channelIdx * (barWidth + gap)) + barWidth / 2}
                          y={350 - (competitorValue / maxValue) * 300 - 10}
                          textAnchor="middle"
                          fill={colors[channelIdx + 1] || colors[0]}
                          fontSize="14"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                        >
                          {channelIdx === 0 
                            ? formatNumber(item.competitor1Views)
                            : formatNumber(item.competitor2Views)
                          }
                        </text>
                        
                        {/* 경쟁 채널 변화율 텍스트 */}
                        <text
                          x={groupX + (channelIdx * (barWidth + gap)) + barWidth / 2}
                          y={350 - (competitorValue / maxValue) * 300 - 25}
                          textAnchor="middle"
                          fill={colors[channelIdx + 1] || colors[0]}
                          fontSize="12"
                          fontFamily="sans-serif"
                        >
                          {channelIdx === 0 
                            ? (item.competitor1Rate > 0 ? '+' : '') + item.competitor1Rate.toFixed(1) + '%'
                            : (item.competitor2Rate > 0 ? '+' : '') + item.competitor2Rate.toFixed(1) + '%'
                          }
                        </text>
                      </g>
                    );
                  })}

                  {/* X축 레이블 */}
                  <text
                    x={groupX + barWidth / 2}
                    y={380}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="18"
                    fontFamily="sans-serif"
                  >
                    {item.period}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 범례 */}
      <div className="flex justify-center flex-wrap" style={{ gap: "100px" }}>
        {/* 내 채널 */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div
              className="rounded-full"
              style={{
                backgroundColor: colors[0],
                width: "14px",
                height: "14px",
              }}
            />
            <span className="text-white" style={{ fontSize: "20px" }}>
              내 채널
            </span>
          </div>
          <div>
            <div
              className="text-white font-bold"
              style={{ fontSize: "32px", lineHeight: "32px" }}
            >
              {channelViews?.myChannel?.individualViews && channelViews.myChannel.individualViews.length > 0 
                ? formatNumber(channelViews.myChannel.individualViews[0].views) 
                : "0"}
            </div>
            <div
              className="text-gray-400"
              style={{ fontSize: "15px", marginTop: "4px" }}
            >
              최신 영상 조회수
            </div>
            <div
              className="flex items-center gap-1"
              style={{ marginTop: "2px" }}
            >
              <span style={{ color: colors[0], fontSize: "16px" }}>
                {channelViews?.myChannel?.individualViews && channelViews.myChannel.individualViews.length > 0 
                  ? `${channelViews.myChannel.individualViews[0].rate.toFixed(2)}%` 
                  : "0.00%"}
              </span>
              <span style={{ color: colors[0], fontSize: "12px" }}>
                {channelViews?.myChannel?.individualViews && channelViews.myChannel.individualViews.length > 0 && channelViews.myChannel.individualViews[0].rate > 0 ? "▲" : "▼"}
              </span>
            </div>
          </div>
        </div>

                {/* 경쟁 채널들 */}
        {competitors.map((competitor, idx) => {
          // 해당 경쟁 채널의 조회수 데이터 찾기
          const competitorViews = channelViews?.competitors.find(
            c => c.channel_id === competitor.channel_id
          );
          
          return (
            <div key={competitor.id} className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full"
                  style={{
                    backgroundColor: colors[idx + 1] || colors[0],
                    width: "14px",
                    height: "14px",
                  }}
                />
                <span className="text-white" style={{ fontSize: "20px" }}>
                  {competitor.channel_name}
                </span>
                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleDeleteCompetitor(competitor.id)}
                  className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="경쟁 채널에서 제거"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <div
                  className="text-white font-bold"
                  style={{ fontSize: "32px", lineHeight: "32px" }}
                >
                  {competitorViews?.individualViews && competitorViews.individualViews.length > 0 
                    ? formatNumber(competitorViews.individualViews[0].views) 
                    : "0"}
                </div>
                <div
                  className="text-gray-400"
                  style={{ fontSize: "15px", marginTop: "4px" }}
                >
                  최신 영상 조회수
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{ marginTop: "2px" }}
                >
                  <span style={{ color: colors[idx + 1] || colors[0], fontSize: "16px" }}>
                    {competitorViews?.individualViews && competitorViews.individualViews.length > 0 
                      ? `${competitorViews.individualViews[0].rate.toFixed(2)}%` 
                      : "0.00%"}
                  </span>
                  <span style={{ color: colors[idx + 1] || colors[0], fontSize: "12px" }}>
                    {competitorViews?.individualViews && competitorViews.individualViews.length > 0 && competitorViews.individualViews[0].rate > 0 ? "▲" : "▼"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewsPage;
