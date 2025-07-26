import React from "react";

const LikesPage: React.FC = () => {
  const data = [
    { period: "최신-2", my: 65, a: 88, b: 55 },
    { period: "최신-1", my: 82, a: 75, b: 95 },
    { period: "최신", my: 70, a: 92, b: 85 },
  ];

  const competitorData = [
    {
      name: "내 채널",
      subscribers: "65,600",
      change: "1주 전에 비해",
      changePercent: "0.01%",
      color: "#ef4444",
    },
    {
      name: "A 채널",
      subscribers: "88,600",
      change: "1주 전에 비해",
      changePercent: "0.01%",
      color: "#22c55e",
    },
    {
      name: "B 채널",
      subscribers: "98,600",
      change: "1주 전에 비해",
      changePercent: "0.01%",
      color: "#3b82f6",
    },
  ];

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
            {/* 그리드 라인 */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="100"
                y1={50 + i * 60}
                x2="1100"
                y2={50 + i * 60}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
            ))}

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

                  {/* A 채널 막대 */}
                  <rect
                    x={groupX}
                    y={350 - (item.a / maxValue) * 300}
                    width={barWidth}
                    height={(item.a / maxValue) * 300}
                    fill="#22c55e"
                  />

                  {/* B 채널 막대 */}
                  <rect
                    x={groupX + barWidth + gap}
                    y={350 - (item.b / maxValue) * 300}
                    width={barWidth}
                    height={(item.b / maxValue) * 300}
                    fill="#3b82f6"
                  />

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
      <div className="flex justify-center" style={{ gap: "100px" }}>
        {competitorData.map((channel, idx) => (
          <div key={idx} className="flex items-center gap-6">
            {/* 동그라미와 채널명 */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-full"
                style={{
                  backgroundColor: channel.color,
                  width: "14px",
                  height: "14px",
                }}
              />
              <span className="text-white" style={{ fontSize: "20px" }}>
                {channel.name}
              </span>
            </div>

            {/* 큰 숫자와 변화율 정보 */}
            <div>
              <div
                className="text-white font-bold"
                style={{ fontSize: "32px", lineHeight: "32px" }}
              >
                {channel.subscribers}
              </div>
              <div
                className="text-gray-400"
                style={{ fontSize: "15px", marginTop: "4px" }}
              >
                {channel.change}
              </div>
              <div
                className="flex items-center gap-1"
                style={{ marginTop: "2px" }}
              >
                <span style={{ color: channel.color, fontSize: "16px" }}>
                  {channel.changePercent}
                </span>
                <span style={{ color: channel.color, fontSize: "12px" }}>
                  ▲
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikesPage;
