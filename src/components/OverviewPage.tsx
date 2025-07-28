import React from "react";

interface VideoData {
  id: string;
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  viewRate: string;
  likeRate: string;
}

interface OverviewPageProps {
  dailyView?: number;
  averageView?: number;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ dailyView, averageView }) => {
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

          {/* 차트 */}
          <div className="flex flex-col flex-1">
            <h3
              className="text-white"
              style={{ fontSize: "1.1vw", marginBottom: "2%" }}
            >
              구독자 수 변화량
            </h3>
            <div
              className="relative rounded-xl flex-1"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}
            >
              <svg
                viewBox="0 0 840 402.51"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                  <line x1="0" y1="80" x2="840" y2="80" />
                  <line x1="0" y1="160" x2="840" y2="160" />
                  <line x1="0" y1="240" x2="840" y2="240" />
                  <line x1="0" y1="320" x2="840" y2="320" />
                </g>
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  points="80,320 240.83,280 401.66,200 562.49,140 723.32,100"
                />
                <g fill="#ef4444">
                  <circle cx="80" cy="320" r="5" />
                  <circle cx="240.83" cy="280" r="5" />
                  <circle cx="401.66" cy="200" r="5" />
                  <circle cx="562.49" cy="140" r="5" />
                  <circle cx="723.32" cy="100" r="5" />
                </g>
                <g
                  fill="rgba(255,255,255,0.6)"
                  fontSize="14"
                  textAnchor="middle"
                >
                  <text x="80" y="370">
                    3월 1주차
                  </text>
                  <text x="240.83" y="370">
                    3월 2주차
                  </text>
                  <text x="401.66" y="370">
                    3월 3주차
                  </text>
                  <text x="562.49" y="370">
                    3월 4주차
                  </text>
                  <text x="723.32" y="370">
                    3월 5주차
                  </text>
                </g>
              </svg>

              <div
                className="absolute bg-black bg-opacity-80 rounded"
                style={{
                  right: "15%",
                  top: "15%",
                  padding: "0.7vw",
                  fontSize: "0.75vw",
                }}
              >
                <span className="text-gray-300">2025/03/28</span>
                <br />
                <span className="text-white font-bold">30,456명</span>
              </div>
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
