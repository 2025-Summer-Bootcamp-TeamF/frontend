import React from "react";

const UploadPage: React.FC = () => {
  const competitorData = [
    {
      name: "내 채널",
      subscribers: "65,600",
      change: "1주 전에 비해",
      changePercent: "0.01%",
      color: "#ef4444",
      data: [20, 35, 50, 60, 65.6],
    },
    {
      name: "A 채널",
      subscribers: "88,600",
      change: "1주 전에 비해",
      changePercent: "0.01%",
      color: "#22c55e",
      data: [70, 80, 75, 83, 88.6],
    },
    {
      name: "B 채널",
      subscribers: "98,600",
      change: "1주 전에 비해",
      changePercent: "0.01%",
      color: "#3b82f6",
      data: [50, 65, 80, 92, 98.6],
    },
  ];

  const xLabels = [
    "3월 1주차",
    "3월 2주차",
    "3월 3주차",
    "3월 4주차",
    "3월 5주차",
  ];

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#1C2023",
        minHeight: "600px",
        width: "100%",
      }}
    >
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
            viewBox="0 0 1200 350"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%" }}
          >
            {/* 그리드 라인 */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="100"
                y1={50 + i * 50}
                x2="1100"
                y2={50 + i * 50}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
            ))}

            {/* 데이터 라인 */}
            {competitorData.map((channel, idx) => {
              const points = channel.data
                .map((value, i) => {
                  const x = 100 + (i * 1000) / (channel.data.length - 1);
                  const y = 300 - (value / 120) * 250;
                  return `${x},${y}`;
                })
                .join(" ");

              return (
                <polyline
                  key={idx}
                  fill="none"
                  stroke={channel.color}
                  strokeWidth="3"
                  points={points}
                />
              );
            })}

            {/* 데이터 포인트 */}
            {competitorData.map((channel, idx) => (
              <g key={`points-${idx}`}>
                {channel.data.map((value, i) => {
                  const x = 100 + (i * 1000) / (channel.data.length - 1);
                  const y = 300 - (value / 120) * 250;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="8"
                      fill={channel.color}
                      stroke="#1C2023"
                      strokeWidth="3"
                    />
                  );
                })}
              </g>
            ))}

            {/* X축 레이블 - SVG 내부에 포함 */}
            {xLabels.map((label, i) => {
              const x = 100 + (i * 1000) / (xLabels.length - 1);
              return (
                <text
                  key={i}
                  x={x}
                  y={340}
                  textAnchor="middle"
                  fill="#666"
                  fontSize="18"
                  fontFamily="sans-serif"
                >
                  {label}
                </text>
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

export default UploadPage;
