import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import thumbnail from "../assets/thumbnail1.png";
import arrow from "../assets/arrow.png";

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  reaction: string;
  reaction_percent: number;
  comment: string;
  date: string;
  checked: boolean;
}

// 댓글 관리 페이지 컴포넌트
export default function ReplyManagement() {
  const navigate = useNavigate();
  
  // 페이지네이션 상태 - 1페이지로 시작
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 13;
  
  // 댓글 데이터
  const currentComments: Comment[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    reaction: "긍정",
    reaction_percent: 84,
    comment: "와 영상 너무 멋져요 기대됩니다",
    date: "2019-08-21",
    checked: index % 2 === 0
  }));
  
  // 현재 페이지의 댓글들
  const pagedComments = currentComments.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(currentComments.length / COMMENTS_PER_PAGE);

  // 체크박스 상태 관리
  const [checkedComments, setCheckedComments] = useState<Set<number>>(new Set());

  // 개별 체크박스 토글
  const handleCheck = (commentId: number) => {
    const newChecked = new Set(checkedComments);
    if (newChecked.has(commentId)) {
      newChecked.delete(commentId);
    } else {
      newChecked.add(commentId);
    }
    setCheckedComments(newChecked);
  };

  // 전체 체크박스 토글
  const handleCheckAll = () => {
    if (checkedComments.size === pagedComments.length) {
      setCheckedComments(new Set());
    } else {
      setCheckedComments(new Set(pagedComments.map(c => c.id)));
    }
  };

  // 전체 체크 상태 확인
  const allChecked = pagedComments.length > 0 && checkedComments.size === pagedComments.length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white flex">
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

      {/* 메인 컨텐츠 영역 */}
      <div className="ml-[6vw] pr-8 py-8 flex gap-4 w-full">
        {/* 왼쪽 컨테이너 - 영상 정보 및 탭 */}
        <div
          className="
            flex flex-col flex-3 w-full rounded-2xl
            bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)]
            p-10
            "
        >
          <div>
            {/* 영상 썸네일 */}
            <div className="relative flex flex-col ">
              {/* 뒤로가기 버튼을 썸네일 위가 아닌 바깥쪽에 배치 */}
              <div>
                <button
                  className="rounded-full items-center justify-center cursor-pointer"
                  onClick={() => navigate("/mainpage_login")}
                  style={{ transform: "scaleX(-1)" }}
                  aria-label="뒤로가기"
                >
                  <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
                </button>
              </div>
              <div className="flex justify-center items-center w-full">
                <img
                  src={thumbnail}
                  alt="Video thumbnail"
                  className="rounded-xl mt-6"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* 영상 정보 */}
            <div className="text-white mt-2 mb-10 pt-3 justify-center items-center w-full">
              <div className="text-[#848485] text-[20px] font-regular">{/* 날짜 */}
                2025. 07. 10
              </div>
              <div className="text-[22px] font-regular mb-2">
                [Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE
              </div>
              <div className="text-[#848485] text-[20px] font-regular">
                조회수 38,665회
              </div>
              <div className="text-[#848485] text-[20px] font-regular">
                댓글 참여율 0.007%
              </div>
              <div className="text-[#848485] text-[20px] font-regular">
                좋아요 참여율 0.7%
              </div>
            </div>

            {/* 댓글 분석하기 버튼 */}
            <div className="flex flex-1 items-end mt-auto">
              <button
                className="w-full rounded-xl bg-[#ff0000] text-white text-[20px] font-semibold my-5 py-3 transition-colors hover:bg-[#b31217]"
                type="button"
              >
                댓글 분석하기
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 컨테이너 - 댓글 목록 */}
        <div
          className="
            flex flex-col flex-7 w-full rounded-2xl 
            bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)]
            h-full min-h-0
          "
        >
          <div className="p-8 flex flex-col">
            {/* 헤더 영역 */}
            <div className="flex flex-row justify-between items-center mb-6">
              <div>
                <div className="text-[22px] font-semibold text-[#ff0000] mb-2">
                  댓글 분석하기
                </div>
                <div className="text-[#d9d9d9] text-[15px] font-extralight">
                  해당 페이지에서는 긍정적인 댓글로 분류된 댓글들을 모아볼 수 있으며,<br />
                  잘못 분류된 악성 댓글은 긍정 댓글에서 제외할 수 있습니다.<br />
                  올바른 분류를 통해 더 정확한 분석이 가능해집니다.
                </div>
              </div>
              
              {/* 액션 버튼들 */}
              <div className="flex">
                <button className="w-[120px] h-[55px] px-6 py-3 bg-[#555] text-white rounded-[10px] text-[18px] font-semibold hover:bg-[#333] transition-colors flex justify-center items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  삭제
                </button>
              </div>
            </div>

            {/* 댓글 테이블 */}
            <div className="
              flex flex-col bg-[#1c2023] w-full h-full pt-4 pb-2 pr-2 pl-2 rounded-[10px] overflow-y-auto
            ">
              {/* 테이블 헤더 */}
              <div className="
                flex flex-row text-[#a3a3a3] text-[17px] font-medium border-b border-[#606265] pb-2 min-w-0
              ">
                <div className="w-[60px] flex justify-center items-center">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-[#ff0000] justify-center items-center" 
                    checked={allChecked} 
                    onChange={handleCheckAll} 
                  />
                </div>
                <div className="flex-1 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">Reaction</div>
                <div className="flex-3 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">Comment</div>
                <div className="flex-1 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">Date</div>
              </div>

              {/* 댓글 목록 */}
              <div className="w-full flex-1 overflow-y-auto">
                {pagedComments.map((comment) => (
                  <div key={comment.id} className="flex flex-col border-b border-[#606265] min-w-0">
                    <div className="flex flex-row items-center py-2 hover:bg-[#232335] transition min-w-0">
                      <div className="w-[60px] flex-shrink-0 flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 accent-[#ff0000]" 
                          checked={checkedComments.has(comment.id)} 
                          onChange={() => handleCheck(comment.id)} 
                        />
                      </div>
                      <div className="flex-1 flex justify-center items-center gap-3">
                        {(() => {
                          let color = "text-[#d9d9d9]";
                          if (comment.reaction === "긍정") color = "text-[#3b82f6]";
                          else if (comment.reaction === "부정") color = "text-[#ff0000]";
                          return (
                            <>
                              <div className={`justify-center items-center text-[15px] font-regular truncate pl-1 ${color}`}>
                                {comment.reaction}
                              </div>
                              <div className={`justify-center items-center text-[15px] font-regular truncate ${color}`}>
                                {comment.reaction_percent}%
                              </div>
                            </>
                          );
                        })()}
                      </div>
                      <div className="flex-3 flex justify-left items-center text-[#d9d9d9] text-[15px] font-regular truncate ml-12" title={comment.comment}>
                        {comment.comment}
                      </div>
                      <div className="flex-1 flex justify-center items-center text-[#d9d9d9] text-[15px] font-regular">
                        {comment.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center items-center mt-4 mb-3 gap-2.5">
                {/* 이전 페이지 버튼 */}
                <button
                  className="w-[24px] h-[24px] bg-none text-[#d9d9d9] rounded-full hover:text-[#a3a3a3] transition-colors flex items-center justify-center"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  aria-label="이전 페이지"
                >
                  <svg className="w-5 h-5 mx-auto rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* 페이지 번호 버튼 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`w-[24px] h-[24px] rounded-full font-regular text-[13.5px] transition-colors items-center justify-center
                      ${pageNum === currentPage
                        ? 'bg-[#ff0000] text-white'
                        : 'bg-[#d9d9d9] text-[#848485] hover:bg-[#a3a3a3]'
                      }
                    `}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
                {/* 다음 페이지 버튼 */}
                <button
                  className="w-[24px] h-[24px] bg-none text-[#d9d9d9] rounded-full hover:text-[#a3a3a3] transition-colors flex items-center justify-center"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="다음 페이지"
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
