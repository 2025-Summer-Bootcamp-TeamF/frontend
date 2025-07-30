import React from "react";

interface VideoInfoBoxProps {
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  commentRate: string;
  likeRate: string;
  commentCount?: number; // 댓글 수 추가
  className?: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    const [y, m, d] = dateStr.split("T")[0].split("-");
    return `${y}. ${m}. ${d}`;
  }
  return dateStr;
};

const VideoInfoBox: React.FC<VideoInfoBoxProps> = ({
  thumbnail,
  date,
  title,
  views,
  commentRate,
  likeRate,
  commentCount,
  className = ""
}) => (
  <div className={className}>
    <div className="flex justify-center items-center w-full">
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="rounded-xl mt-6 w-full object-contain"
        style={{ maxHeight: 250, minHeight: 200 }}
      />
    </div>
    <div className="text-white mt-2 mb-10 pt-3 w-full">
      <div className="text-[#848485] text-[20px] font-regular">
        <span className="font-bold">{formatDate(date)}</span>
      </div>
      <div className="text-[26px] font-bold mb-2">{title}</div>
            <div className="text-[#848485] text-[20px] font-regular">
        조회수 {views}
      </div>
      {commentCount !== undefined && (
        <div className="text-[#848485] text-[20px] font-regular">
          댓글 {commentCount.toLocaleString()}개
        </div>
      )}
      {/* 댓글 참여율과 좋아요 참여율 임시 숨김 - 나중에 복구 가능 */}
      {/* <div className="text-[#848485] text-[20px] font-regular">댓글 참여율 {commentRate}</div> */}
      {/* <div className="text-[#848485] text-[20px] font-regular">좋아요 참여율 {likeRate}</div> */}
    </div>
  </div>
);

export default VideoInfoBox; 