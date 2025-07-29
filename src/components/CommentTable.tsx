import React from "react";
// import type { Comment } from "../pages/ReplyManagement";

interface CommentTableProps {
  comments: any[];
  checkedComments: Set<number>;
  onCheck: (commentId: number) => void;
  allChecked: boolean;
  onCheckAll: () => void;
  avatar: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  renderRow?: (comment: any, checked: boolean, onCheck: (id: number) => void) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

const CommentTable: React.FC<CommentTableProps> = ({
  comments,
  checkedComments,
  onCheck,
  allChecked,
  onCheckAll,
  avatar,
  currentPage,
  totalPages,
  onPageChange,
  renderRow,
  renderHeader
}) => (
  <div
    className="flex flex-col bg-[#1c2023] w-full h-full pt-4 pb-2 pr-2 pl-2 rounded-[10px] overflow-y-auto"
  >
    {/* 테이블 헤더 */}
    <div
      className="flex flex-row text-[#a3a3a3] text-[17px] font-medium border-b border-[#606265] pb-2 min-w-0"
    >
      <div className="w-[60px] flex justify-center items-center">
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#ff0000] justify-center items-center"
          checked={allChecked}
          onChange={onCheckAll}
        />
      </div>
      {renderHeader ? renderHeader() : (
        <>
          <div className="flex-1 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">
            Account
          </div>
          <div className="flex-3 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">
            Comment
          </div>
          <div className="flex-1 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">
            Date
          </div>
        </>
      )}
    </div>

    {/* 댓글 목록 */}
    <div className="w-full flex-1 overflow-y-auto">
      {comments.map((comment) => (
        renderRow
          ? renderRow(comment, checkedComments.has(comment.id), onCheck)
          : (
            <div
              key={comment.id}
              className="flex flex-col border-b border-[#606265] min-w-0"
            >
              <div className="flex flex-row items-center py-2 hover:bg-[#232335] transition min-w-0">
                <div className="w-[60px] flex-shrink-0 flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#ff0000]"
                    checked={checkedComments.has(comment.id)}
                    onChange={() => onCheck(comment.id)}
                  />
                </div>
                <div className="flex-1 flex justify-center items-center gap-3">
                  <img
                    src={avatar}
                    alt="profile"
                    className="w-6 h-6 rounded-full object-cover select-none justify-center items-center ml-2"
                    draggable={false}
                  />
                  <span className="justify-center items-center text-[#d9d9d9] text-[15px] font-regular truncate">
                    {comment.account}
                  </span>
                </div>
                <div
                  className="flex-3 flex justify-left items-center text-[#d9d9d9] text-[15px] font-regular truncate ml-16"
                  title={comment.comment}
                >
                  {comment.comment}
                </div>
                <div className="flex-1 flex justify-center items-center text-[#d9d9d9] text-[15px] font-regular">
                  {comment.date}
                </div>
              </div>
            </div>
          )
      ))}
    </div>

    {/* 페이지네이션 */}
    <div className="flex justify-center items-center mt-4 mb-3 gap-2.5">
      {/* 이전 페이지 버튼 */}
      <button
        className="w-[24px] h-[24px] bg-none text-[#d9d9d9] rounded-full hover:text-[#a3a3a3] transition-colors flex items-center justify-center"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <svg
          className="w-5 h-5 mx-auto rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {/* 페이지 번호 버튼 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          className={`w-[24px] h-[24px] rounded-full font-regular text-[13.5px] transition-colors items-center justify-center
            ${
              pageNum === currentPage
                ? "bg-[#ff0000] text-white"
                : "bg-[#d9d9d9] text-[#848485] hover:bg-[#a3a3a3]"
            }
          `}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      {/* 다음 페이지 버튼 */}
      <button
        className="w-[24px] h-[24px] bg-none text-[#d9d9d9] rounded-full hover:text-[#a3a3a3] transition-colors flex items-center justify-center"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        <svg
          className="w-5 h-5 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default CommentTable; 