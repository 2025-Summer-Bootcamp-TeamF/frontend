import React, { useState } from "react";

interface VideoData {
  id: string;
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  viewRate: string;
  likeRate: string;
}

const YouTubeAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("video");

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
    {
      id: "4",
      thumbnail: "[Live] 실리카겔 (Silica Gel) - NO PAIN",
      date: "2025. 07. 10",
      title: "[Live] 실리카겔 (Silica Gel) - NO PAIN",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
    {
      id: "5",
      thumbnail: "[Behind] 실리카겔 뮤직비디오 - 촬영 비하인드",
      date: "2025. 07. 10",
      title: "[Behind] 실리카겔 뮤직비디오 - 촬영 비하인드",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
    {
      id: "6",
      thumbnail: "[Live] 실리카겔 단독콘서트 - 하이라이트",
      date: "2025. 07. 10",
      title: "[Live] 실리카겔 단독콘서트 - 하이라이트",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
  ];

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
              <span className="text-gray-200" style={{ fontSize: "27.73px" }}>
                My Account
              </span>
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
                  <h1
                    className="font-bold mb-2"
                    style={{ fontSize: "41.79px", lineHeight: "1.2" }}
                  >
                    Estar el mono
                  </h1>
                  <p className="text-gray-400" style={{ fontSize: "24.56px" }}>
                    hi welcome to my channel
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mr-8">
                <div className="text-left">
                  <p
                    className="text-gray-500 mb-1"
                    style={{ fontSize: "24.56px" }}
                  >
                    구독자 수
                  </p>
                  <p style={{ fontSize: "24.56px" }}>200만</p>
                </div>
                <div className="text-left">
                  <p
                    className="text-gray-500 mb-1"
                    style={{ fontSize: "24.56px" }}
                  >
                    총 영상 수
                  </p>
                  <p style={{ fontSize: "24.56px" }}>878개</p>
                </div>
                <div className="text-left">
                  <p
                    className="text-gray-500 mb-1"
                    style={{ fontSize: "24.56px" }}
                  >
                    채널 가입일
                  </p>
                  <p style={{ fontSize: "24.56px" }}>2023-07-19</p>
                </div>
                <div className="text-left">
                  <p
                    className="text-gray-500 mb-1"
                    style={{ fontSize: "24.56px" }}
                  >
                    국가
                  </p>
                  <p style={{ fontSize: "24.56px" }}>대한민국</p>
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
              className={`pb-3 hover:text-white transition-colors ${
                activeTab === "overview"
                  ? "text-white border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              style={{ fontSize: "28.69px" }}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-3 hover:text-white transition-colors ${
                activeTab === "video"
                  ? "text-white border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              style={{ fontSize: "28.69px" }}
              onClick={() => setActiveTab("video")}
            >
              Video
            </button>
          </div>

          {/* Content */}
          <div
            className="rounded-[13px]"
            style={{
              backgroundColor: "#1C2023",
              marginLeft: "89.76px",
              marginRight: "89.76px",
            }}
          >
            {/* Video Content */}
            {activeTab === "video" && (
              <div className="p-6">
                <div className="grid grid-cols-3" style={{ gap: "12px" }}>
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-2xl overflow-hidden flex flex-col"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backgroundColor: "transparent",
                        width: "484.18px",
                        height: "553.23px",
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 p-3">
                        <div className="aspect-video rounded-xl overflow-hidden">
                          <img
                            src="/thumbnail.png"
                            alt={video.thumbnail}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 flex flex-col px-3 pb-3 min-h-0">
                        <div className="flex-shrink-0">
                          <p
                            className="text-gray-400 mb-2"
                            style={{ fontSize: "20px" }}
                          >
                            {video.date}
                          </p>
                          <h3
                            className="text-white mb-3 truncate"
                            style={{ fontSize: "22px", lineHeight: "1.3" }}
                          >
                            {video.title}
                          </h3>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between">
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                조회수
                              </span>
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                {video.views}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                댓글 참여율
                              </span>
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                {video.viewRate}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                좋아요 참여율
                              </span>
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                {video.likeRate}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-auto pt-2">
                          <div className="flex gap-2">
                            <button
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
                              style={{ fontSize: "16px" }}
                            >
                              댓글 분석
                            </button>
                            <button
                              className="flex-1 bg-white hover:bg-red-50 text-red-500 py-2 rounded-lg font-medium transition-colors border border-red-500 hover:border-red-600"
                              style={{ fontSize: "16px" }}
                            >
                              댓글 관리
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Video Row */}
                <div
                  className="grid grid-cols-3 mt-5 pb-6"
                  style={{ gap: "12px" }}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={`bottom-${i}`}
                      className="rounded-2xl overflow-hidden flex flex-col"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backgroundColor: "transparent",
                        width: "484.18px",
                        height: "553.23px",
                      }}
                    >
                      <div className="flex-shrink-0 p-3">
                        <div className="aspect-video rounded-xl overflow-hidden">
                          <img
                            src="/thumbnail.png"
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col px-3 pb-3 min-h-0">
                        <div className="flex-shrink-0">
                          <p
                            className="text-gray-400 mb-2"
                            style={{ fontSize: "20px" }}
                          >
                            2025. 07. 10
                          </p>
                          <h3
                            className="text-white mb-3 truncate"
                            style={{ fontSize: "22px", lineHeight: "1.3" }}
                          >
                            {i === 1 &&
                              "[Live] 실리카겔 (Silica Gel) - 하이라이트"}
                            {i === 2 &&
                              "[Live] 실리카겔 (Silica Gel) - NO PAIN"}
                            {i === 3 &&
                              "[Behind] 실리카겔 뮤직비디오 - 촬영 비하인드"}
                          </h3>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between">
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                조회수
                              </span>
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                38,665회
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                댓글 참여율
                              </span>
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                0.007%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                좋아요 참여율
                              </span>
                              <span
                                className="text-gray-500"
                                style={{ fontSize: "20px" }}
                              >
                                0.7%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto pt-2">
                          <div className="flex gap-2">
                            <button
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
                              style={{ fontSize: "16px" }}
                            >
                              댓글 분석
                            </button>
                            <button
                              className="flex-1 bg-white hover:bg-red-50 text-red-500 py-2 rounded-lg font-medium transition-colors border border-red-500 hover:border-red-600"
                              style={{ fontSize: "16px" }}
                            >
                              댓글 관리
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Content */}
            {activeTab === "overview" && (
              <div className="text-white" style={{ padding: "48px" }}>
                <h2 className="text-2xl font-bold mb-4">
                  📊 Overview 페이지입니다
                </h2>
                <p className="text-gray-300 mb-2">
                  이곳에 통계, 분석 요약 등을 추가할 수 있어요.
                </p>
                <p className="text-gray-400 text-sm">
                  예: 전체 댓글 수, 좋아요 수, 조회수 추이, 인사이트 요약 등등
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeAccountPage;
