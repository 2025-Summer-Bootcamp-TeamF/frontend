import React, { useState } from "react";
import ViewsPage from "../components/ViewsPage";
import UploadPage from "../components/Upload";
import LikesPage from "../components/Likes";
import InsightPage from "../components/Dislikes";

const CompetitorInsightPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("views");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([
    "https://www.youtube.com/@SilicaGel",
  ]);

  const handleChannelSelect = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
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
            className="w-7 h-7 opacity-100 group-hover:brightness-200 transition-all"
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

      {/* Main Container */}
      <div className="ml-[6vw] flex-1 pr-8 py-8 relative">
        <div className="flex flex-col gap-[21.68px] h-full">
          {/* 상단 박스 */}
          <div
            className="rounded-2xl overflow-visible relative z-10"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              height: "150px",
            }}
          >
            <div
              style={{
                paddingTop: "32px",
                paddingBottom: "24px",
                paddingLeft: "89.76px",
                paddingRight: "89.76px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="flex items-center gap-2">
                <img src="/insight.png" alt="Insight" className="w-6 h-6" />
                <span className="text-gray-200 text-[1.7rem]">
                  Competitor Insight
                </span>
              </div>

              {/* 드롭다운 컨테이너 */}
              <div
                className="relative flex-1"
                style={{ marginLeft: "62.07px" }}
              >
                <div
                  className="rounded-[10px] px-6 py-4 cursor-pointer flex items-center justify-between"
                  style={{
                    backgroundColor: "#1C2023",
                    width: "100%",
                    height: "87.38px",
                    minWidth: "600px",
                  }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: "110.69px" }}
                  >
                    <span
                      className="text-gray-400"
                      style={{ fontSize: "24.56px", color: "#858585" }}
                    >
                      채널
                    </span>
                    <span
                      className="text-white"
                      style={{ fontSize: "24.56px", color: "#A3A3A3" }}
                    >
                      비교하고 싶은 채널의 주소를 입력하세요
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* 드롭다운 메뉴 - 부모 div와 같은 너비 */}
                {isDropdownOpen && (
                  <div
                    className="absolute rounded-[10px] shadow-lg"
                    style={{
                      backgroundColor: "#1C2023",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      zIndex: 9999,
                      top: "calc(100% + 8px)",
                      left: 0,
                      width: "100%", // 부모와 같은 너비
                      minWidth: "600px", // 부모와 같은 최소 너비
                    }}
                  >
                    <div className="p-4">
                      <div
                        className="flex items-center gap-3 mb-3 py-3 hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() =>
                          handleChannelSelect(
                            "https://www.youtube.com/@SilicaGel"
                          )
                        }
                      >
                        <div
                          className={`rounded-sm flex-shrink-0 ${
                            selectedChannels.includes(
                              "https://www.youtube.com/@SilicaGel"
                            )
                              ? "bg-red-500"
                              : "border border-gray-500"
                          }`}
                          style={{ width: "35.67px", height: "35.67px" }}
                        >
                          {selectedChannels.includes(
                            "https://www.youtube.com/@SilicaGel"
                          ) && (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span
                          className="text-white flex-1"
                          style={{ fontSize: "24.56px", color: "#A3A3A3" }}
                        >
                          https://www.youtube.com/@SilicaGel
                        </span>
                        <button
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 삭제 로직
                          }}
                        >
                          <svg
                            className="w-5 h-5"
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
                      <div
                        className="flex items-center gap-3 py-3 hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() =>
                          handleChannelSelect(
                            "https://www.youtube.com/@SilicaGel2"
                          )
                        }
                      >
                        <div
                          className={`rounded-sm flex-shrink-0 ${
                            selectedChannels.includes(
                              "https://www.youtube.com/@SilicaGel2"
                            )
                              ? "bg-red-500"
                              : "border border-gray-500"
                          }`}
                          style={{ width: "35.67px", height: "35.67px" }}
                        >
                          {selectedChannels.includes(
                            "https://www.youtube.com/@SilicaGel2"
                          ) && (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span
                          className="text-gray-400 flex-1"
                          style={{ fontSize: "24.56px", color: "#A3A3A3" }}
                        >
                          https://www.youtube.com/@SilicaGel
                        </span>
                        <button
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 삭제 로직
                          }}
                        >
                          <svg
                            className="w-5 h-5"
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 하단 박스 */}
          <div
            className="rounded-2xl overflow-hidden flex-1"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* 설명 텍스트 */}
            <div
              style={{
                paddingLeft: "89.76px",
                paddingRight: "89.76px",
                paddingTop: "42px",
                fontSize: "24px",
                color: "#A3A3A3",
              }}
            >
              각 채널이 어떻게 운영되었는지 비교해보았어요!
            </div>

            {/* 탭 섹션 */}
            <div
              style={{
                paddingLeft: "89.76px",
                paddingRight: "89.76px",
                paddingTop: "34px",
              }}
              className="flex gap-8"
            >
              {[
                { key: "views", label: "조회수" },
                { key: "upload", label: "업로드 주기" },
                { key: "likes", label: "좋아요" },
                { key: "dislikes", label: "싫어요" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`pb-3 hover:text-white transition-colors text-2xl ${
                    activeTab === tab.key
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 콘텐츠 */}
            <div
              className="rounded-[13px] overflow-x-auto"
              style={{
                backgroundColor: "#1C2023",
                marginLeft: "89.76px",
                marginRight: "89.76px",
                marginTop: "0",
                height: "calc(100% - 154.87px)",
              }}
            >
              {activeTab === "views" && <ViewsPage />}
              {activeTab === "upload" && <UploadPage />}
              {activeTab === "likes" && <LikesPage />}
              {activeTab === "dislikes" && <InsightPage />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorInsightPage;
