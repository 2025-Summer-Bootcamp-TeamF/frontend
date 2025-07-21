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

const VideoPage: React.FC = () => {
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
    {
      id: "7",
      thumbnail: "[Live] 실리카겔 (Silica Gel) - 하이라이트",
      date: "2025. 07. 10",
      title: "[Live] 실리카겔 (Silica Gel) - 하이라이트",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
    {
      id: "8",
      thumbnail: "[Live] 실리카겔 (Silica Gel) - NO PAIN",
      date: "2025. 07. 10",
      title: "[Live] 실리카겔 (Silica Gel) - NO PAIN",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
    {
      id: "9",
      thumbnail: "[Behind] 실리카겔 뮤직비디오 - 촬영 비하인드",
      date: "2025. 07. 10",
      title: "[Behind] 실리카겔 뮤직비디오 - 촬영 비하인드",
      views: "38,665회",
      viewRate: "0.007%",
      likeRate: "0.7%",
    },
  ];

  const VideoCard = ({ video }: { video: VideoData }) => (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        minHeight: "500px",
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
          <p className="text-gray-400 mb-2" style={{ fontSize: "20px" }}>
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
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                조회수
              </span>
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                {video.views}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                댓글 참여율
              </span>
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                {video.viewRate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                좋아요 참여율
              </span>
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
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
  );

  return (
    <div className="p-6">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
        }}
      >
        {videos.slice(0, 6).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Bottom Video Row */}
      <div
        className="grid gap-3 mt-5 pb-6"
        style={{
          gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
        }}
      >
        {videos.slice(6, 9).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
