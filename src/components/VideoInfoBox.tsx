import React from "react";

interface VideoInfoBoxProps {
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  commentRate: string;
  likeRate: string;
  className?: string;
}

const VideoInfoBox: React.FC<VideoInfoBoxProps> = ({
  thumbnail,
  date,
  title,
  views,
  commentRate,
  likeRate,
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
      <div className="text-[#848485] text-[20px] font-regular">{date}</div>
      <div className="text-[22px] font-regular mb-2">{title}</div>
      <div className="text-[#848485] text-[20px] font-regular">조회수 {views}</div>
      <div className="text-[#848485] text-[20px] font-regular">댓글 참여율 {commentRate}</div>
      <div className="text-[#848485] text-[20px] font-regular">좋아요 참여율 {likeRate}</div>
    </div>
  </div>
);

export default VideoInfoBox; 