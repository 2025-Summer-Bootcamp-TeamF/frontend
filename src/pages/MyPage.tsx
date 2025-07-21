import React, { useState } from "react";
import VideoPage from "../components/VideoPage";
import OverviewPage from "../components/OverviewPage";

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("video");

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

      {/* Main Container */}
      <div className="ml-[6vw] flex-1 pr-8 py-8">
        <div
          className="rounded-2xl overflow-hidden h-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Header */}
          <div
            style={{
              height: "300px",
              paddingTop: "32px",
              paddingBottom: "24px",
              paddingLeft: "89.76px",
              paddingRight: "89.76px",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="/mypagelogo.png" alt="My Page" className="w-6 h-6" />
              <span className="text-gray-200 text-[1.7rem]">My Account</span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-5xl">🐵</span>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold mb-2 text-4xl sm:text-5xl leading-[1.2]">
                    Estar el mono
                  </h1>
                  <p className="text-gray-400 text-xl sm:text-2xl">
                    hi welcome to my channel
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mr-8">
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">
                    구독자 수
                  </p>
                  <p className="text-xl sm:text-2xl">200만</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">
                    총 영상 수
                  </p>
                  <p className="text-xl sm:text-2xl">878개</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">
                    채널 가입일
                  </p>
                  <p className="text-xl sm:text-2xl">2023-07-19</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">국가</p>
                  <p className="text-xl sm:text-2xl">대한민국</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{ paddingLeft: "89.76px", paddingRight: "89.76px" }}
            className="flex gap-8"
          >
            <button
              className={`pb-3 hover:text-white transition-colors text-2xl ${
                activeTab === "overview"
                  ? "text-white border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-3 hover:text-white transition-colors text-2xl ${
                activeTab === "video"
                  ? "text-white border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("video")}
            >
              Video
            </button>
          </div>

          {/* Content */}
          <div
            className="rounded-[13px] overflow-x-auto"
            style={{
              backgroundColor: "#1C2023",
              marginLeft: "89.76px",
              marginRight: "89.76px",
            }}
          >
            {activeTab === "video" && <VideoPage />}
            {activeTab === "overview" && <OverviewPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
