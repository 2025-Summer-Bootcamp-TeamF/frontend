import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface VideoData {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  commentRate: string;
  likeRate: string;
}

const VideoPage: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9; // 한 페이지당 9개 영상 (3x3 그리드)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        console.log("Fetching videos from:", "http://localhost:8000/api/channel/videos");

        const response = await fetch("http://localhost:8000/api/channel/videos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Videos data received:", data);
          setVideos(data.data || []);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch videos. Status:", response.status);
          console.error("Error response:", errorText);
          setError("비디오 데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
          setError("네트워크 오류 - 백엔드 서버가 실행 중인지 확인하세요");
        } else {
          setError("비디오 데이터를 불러오는데 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '. ').replace(/\.$/, '');
  };

  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = videos.slice(startIndex, endIndex);

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
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/thumbnail.png"; // 기본 이미지로 대체
              }}
            />
          ) : (
            <img
              src="/thumbnail.png"
              alt="Default thumbnail"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 flex flex-col px-3 pb-3 min-h-0">
        <div className="flex-shrink-0">
          <p className="text-gray-400 mb-2" style={{ fontSize: "20px" }}>
            {formatDate(video.publishedAt)}
          </p>
          <h3
            className="text-white mb-3 truncate"
            style={{ fontSize: "22px", lineHeight: "1.3" }}
          >
            {video.title || "제목 없음"}
          </h3>

          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                조회수
              </span>
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                {formatNumber(video.viewCount)}회
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                댓글 참여율
              </span>
              <span className="text-gray-500" style={{ fontSize: "20px" }}>
                {video.commentRate}
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
              onClick={() => navigate('/reply_analysis_list')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
              style={{ fontSize: "16px" }}
            >
              댓글 분석
            </button>
            <button
              onClick={() => navigate('/reply_management')}
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

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-96">
        <div className="text-white text-2xl">비디오 데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-96">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center min-h-96">
        <div className="text-gray-400 text-xl">등록된 비디오가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 비디오 그리드 */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
        }}
      >
        {currentVideos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
            >
              이전
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
            >
              다음
            </button>
          </div>
        </div>
      )}

      {/* 전체 영상 수 표시 */}
      <div className="text-center text-gray-400 text-lg">
        총 {videos.length}개의 영상 중 {startIndex + 1}-{Math.min(endIndex, videos.length)}번째 영상
      </div>
    </div>
  );
};

export default VideoPage;
