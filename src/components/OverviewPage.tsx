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

const OverviewPage: React.FC = () => {
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
    <div className="p-6 md:p-8 lg:p-12 w-full">
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
        {/* 왼쪽: 통계 카드 + 차트 */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div
              className="rounded-2xl p-4 md:p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3 className="text-gray-400 text-base md:text-lg mb-2">
                일일 평균 조회수
              </h3>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-none">
                290만
              </p>
            </div>
            <div
              className="rounded-2xl p-4 md:p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3 className="text-gray-400 text-base md:text-lg mb-2">
                영상별 평균 조회수
              </h3>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-none">
                170만
              </p>
            </div>
          </div>

          {/* 차트 */}
          <div className="flex flex-col h-full">
            <h3 className="text-white text-lg md:text-xl mb-4">
              구독자 수 변화량
            </h3>
            <div
              className="relative rounded-xl w-full flex-1"
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
                className="absolute bg-black bg-opacity-80 px-2 md:px-3 py-1 md:py-2 rounded text-xs md:text-sm"
                style={{
                  right: "15%",
                  top: "15%",
                }}
              >
                <span className="text-gray-300">2025/03/28</span>
                <br />
                <span className="text-white font-bold">30,456명</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 최근 영상들 */}
        <div className="flex flex-col gap-4 md:gap-6 xl:max-w-2xl xl:w-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row gap-4 md:gap-6 p-4 md:p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
              }}
            >
              {/* 메달 이미지 */}
              <img
                src={`/${
                  index === 0 ? "first" : index === 1 ? "second" : "third"
                }.png`}
                alt={`${index + 1}st place medal`}
                className="absolute left-6 z-10"
                style={{
                  width: "40px",
                  height: "40px",
                  top: "0px",
                }}
              />

              <div className="relative">
                <img
                  src="/thumbnail.png"
                  alt="Video thumbnail"
                  className="w-full sm:w-48 md:w-56 h-40 md:h-44 rounded-xl object-cover flex-shrink-0"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-2 text-lg md:text-xl truncate">
                  {video.title}
                </h4>
                <p className="text-gray-500 mb-4 text-base md:text-lg">
                  {video.date}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500" style={{ fontSize: "20px" }}>
                      조회수
                    </p>
                    <p className="text-gray-300" style={{ fontSize: "20px" }}>
                      {video.views}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500" style={{ fontSize: "20px" }}>
                      댓글 참여율
                    </p>
                    <p className="text-gray-300" style={{ fontSize: "20px" }}>
                      {video.viewRate}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500" style={{ fontSize: "20px" }}>
                      좋아요 참여율
                    </p>
                    <p className="text-gray-300" style={{ fontSize: "20px" }}>
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
