import React, { useEffect, useState } from "react";

interface VideoData {
  id: string;
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  viewRate: string;
  likeRate: string;
}

interface SubscriberChange {
  date: string;
  subscriber: number;
}

interface OverviewPageProps {
  dailyView?: number;
  averageView?: number;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ dailyView, averageView }) => {
  const [subscriberData, setSubscriberData] = useState<SubscriberChange[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubscriberChange = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // 디버깅용 로그 추가
        const response = await fetch("http://localhost:8000/api/channel/subscriber-change", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Subscriber data:", data); // 디버깅용 로그 추가
          setSubscriberData(data.data || []);
        } else {
          console.error("API response not ok:", response.status, response.statusText);
        }
      } catch (e) {
        console.error("Failed to fetch subscriber change", e);
      }
    };
    fetchSubscriberChange();
  }, []);

  const videos: VideoData[] = [
    {
      id: "1",
      thumbnail: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
      date: "2025. 07. 10",
      title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
    {
      id: "2",
      thumbnail: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
      date: "2025. 07. 10",
      title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
    {
      id: "3",
      thumbnail: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
      date: "2025. 07. 10",
      title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
  ];

  // 그래프 영역 계산
  const chartWidth = 500;
  const chartHeight = 220;
  const margin = 40;

  let points: { x: number; y: number }[] = [];
  let min = 0, max = 0;
  if (subscriberData.length > 0) {
    min = Math.min(...subscriberData.map(d => d.subscriber));
    max = Math.max(...subscriberData.map(d => d.subscriber));
    // 모두 0일 때는 min=0, max=1로 고정
    if (min === 0 && max === 0) {
      max = 1;
    } else if (min === max) {
      min = min - 1;
      max = max + 1;
    }
    points = subscriberData.map((d, i) => {
      const x = margin + (i * (chartWidth - 2 * margin)) / Math.max(1, subscriberData.length - 1);
      const y = chartHeight - margin - ((d.subscriber - min) / (max - min)) * (chartHeight - 2 * margin);
      return { x, y };
    });
  }

  return (
    <div className="w-full h-full" style={{ padding: "2.5%" }}>
      <div className="flex w-full h-full" style={{ gap: "2.5%" }}>
        {/* 왼쪽: 통계 카드 + 차트 - 50% */}
        <div className="flex flex-col" style={{ width: "48%" }}>
          {/* 통계 카드 */}
          <div
            className="grid grid-cols-2"
            style={{ gap: "3%", marginBottom: "3%" }}
          >
            <div
              className="rounded-xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "8%",
              }}
            >
              <h3
                className="text-gray-400"
                style={{ fontSize: "0.9vw", marginBottom: "8%" }}
              >
                일일 평균 조회수
              </h3>
              <p
                className="text-white font-bold leading-none"
                style={{ fontSize: "2vw" }}
              >
                {dailyView !== undefined && dailyView !== null ? dailyView.toLocaleString() : "-"}
              </p>
            </div>
            <div
              className="rounded-xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "8%",
              }}
            >
              <h3
                className="text-gray-400"
                style={{ fontSize: "0.9vw", marginBottom: "8%" }}
              >
                영상별 평균 조회수
              </h3>
              <p
                className="text-white font-bold leading-none"
                style={{ fontSize: "2vw" }}
              >
                {averageView !== undefined && averageView !== null ? averageView.toLocaleString() : "-"}
              </p>
            </div>
          </div>

          {/* 구독자 수 변화량 꺾은선 그래프 */}
          <div className="flex flex-col flex-1">
            <h3 className="text-white" style={{ fontSize: "1.1vw", marginBottom: "2%" }}>
              구독자 수 변화량
            </h3>
            <div className="relative rounded-xl flex-1"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", height: chartHeight, minHeight: chartHeight }}
            >
              {subscriberData.length > 1 ? (
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  {/* X축 라벨 */}
                  {subscriberData.map((d, i) => (
                    <text
                      key={i}
                      x={points[i]?.x}
                      y={chartHeight - margin + 20}
                      textAnchor="middle"
                      fill="#aaa"
                      fontSize="12"
                    >
                      {d.date.slice(5)}
                    </text>
                  ))}
                  {/* Y축 라벨 (최소/최대) */}
                  <text x={10} y={margin} fill="#aaa" fontSize="12">
                    {max.toLocaleString()}
                  </text>
                  <text x={10} y={chartHeight - margin} fill="#aaa" fontSize="12">
                    {min.toLocaleString()}
                  </text>
                  {/* 꺾은선 */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    points={points.map(p => `${p.x},${p.y}`).join(" ")}
                  />
                  {/* 점 */}
                  {points.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={6}
                      fill="#ef4444"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                  ))}
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  구독자 변화 데이터가 없습니다.
                </div>
              )}
              {/* 툴팁 */}
              {hoverIndex !== null && points[hoverIndex] && (
                <div
                  className="absolute bg-black bg-opacity-80 rounded px-3 py-2 text-white text-sm"
                  style={{
                    left: points[hoverIndex].x,
                    top: points[hoverIndex].y - 40,
                    transform: "translate(-50%, 0)",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                  }}
                >
                  {subscriberData[hoverIndex].date} <br />
                  <span className="font-bold">{subscriberData[hoverIndex].subscriber.toLocaleString()}명</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽: 최근 영상들 - 50% */}
        <div className="flex flex-col" style={{ width: "48%", gap: "2%" }}>
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative flex rounded-2xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "2%",
                gap: "3%",
                height: "32%",
              }}
            >
              {/* 메달 이미지 */}
              <img
                src={`/${
                  index === 0 ? "first" : index === 1 ? "second" : "third"
                }.png`}
                alt={`${index + 1}st place medal`}
                className="absolute z-10"
                style={{
                  width: "2vw",
                  height: "2vw",
                  top: "0vw",
                  left: "2%",
                }}
              />

              <img
                src="/thumbnail.png"
                alt="Video thumbnail"
                className="rounded-xl object-cover"
                style={{
                  width: "25%",
                  height: "100%",
                }}
              />
              <div
                className="flex-1 flex flex-col justify-between"
                style={{ paddingTop: "1%", paddingBottom: "1%" }}
              >
                <div>
                  <h4
                    className="text-white font-medium truncate"
                    style={{ fontSize: "1vw", marginBottom: "3%" }}
                  >
                    {video.title}
                  </h4>
                  <p className="text-gray-500" style={{ fontSize: "0.85vw" }}>
                    {video.date}
                  </p>
                </div>
                <div className="flex flex-col" style={{ gap: "5%" }}>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500" style={{ fontSize: "0.95vw" }}>
                      조회수
                    </p>
                    <p className="text-gray-300" style={{ fontSize: "0.95vw" }}>
                      {video.views}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500" style={{ fontSize: "0.95vw" }}>
                      댓글 참여율
                    </p>
                    <p className="text-gray-300" style={{ fontSize: "0.95vw" }}>
                      {video.viewRate}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500" style={{ fontSize: "0.95vw" }}>
                      좋아요 참여율
                    </p>
                    <p className="text-gray-300" style={{ fontSize: "0.95vw" }}>
                      {video.likeRate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
