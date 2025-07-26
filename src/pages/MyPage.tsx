import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import VideoPage from "../components/VideoPage";
import OverviewPage from "../components/OverviewPage";
import ChannelSnapshotTest from "../components/ChannelSnapshotTest";

interface ChannelData {
  channel: {
    id: number;
    channel_name: string;
    profile_image_url: string;
    channel_intro: string;
    youtube_channel_id: string;
    created_at: string;
  };
  snapshot: {
    subscriber: number;
    total_videos: number;
    total_view: number;
    channel_created: string;
    nation: string;
  };
}

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("video");
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("http://localhost:8000/api/channel/my", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChannelData(data);
        } else {
          console.error("Failed to fetch channel data");
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

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
      <Sidebar />

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
                    {channelData?.channel.profile_image_url ? (
                      <img 
                        src={channelData.channel.profile_image_url} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">🐵</span>
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="font-bold mb-2 text-4xl sm:text-5xl leading-[1.2]">
                    {channelData?.channel.channel_name || "Channel Name"}
                  </h1>
                  <p className="text-gray-400 text-xl sm:text-2xl">
                    {channelData?.channel.channel_intro || ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mr-8">
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">
                    구독자 수
                  </p>
                  <p className="text-xl sm:text-2xl">
                    {channelData?.snapshot.subscriber ? 
                      `${(channelData.snapshot.subscriber / 10000).toFixed(1)}만` : 
                      "N/A"
                    }
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">
                    총 영상 수
                  </p>
                  <p className="text-xl sm:text-2xl">
                    {channelData?.snapshot.total_videos || "N/A"}개
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">
                    채널 가입일
                  </p>
                  <p className="text-xl sm:text-2xl">
                    {channelData?.snapshot.channel_created ? 
                      new Date(channelData.snapshot.channel_created).toLocaleDateString() : 
                      "N/A"
                    }
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500 mb-1 text-xl sm:text-2xl">국가</p>
                  <p className="text-xl sm:text-2xl">
                    {channelData?.snapshot.nation || "N/A"}
                  </p>
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

          {/* Channel Snapshot Test */}
          {channelData && (
            <div className="mt-8" style={{ marginLeft: "89.76px", marginRight: "89.76px" }}>
              <ChannelSnapshotTest channelId={channelData.channel.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
