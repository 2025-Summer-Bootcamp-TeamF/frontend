import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import thumbnail from "../assets/thumbnail1.png";
import arrow from "../assets/arrow.png";
import VideoInfoBox from "../components/VideoInfoBox";
import CommentTable from "../components/CommentTable";

// 댓글 요약 데이터 타입 정의
interface CommentSummary {
  id: number;
  video_id: string;
  summary: string;
  summary_title: string;
  positive_ratio: number;
  is_deleted: boolean;
  created_at: string;
}

// API 응답 타입 정의
interface SummaryResponse {
  success: boolean;
  data: CommentSummary[];
}

// 영상 정보 타입 정의
interface VideoInfo {
  thumbnail: string;
  date: string;
  title: string;
  views: string;
  commentRate: string;
  likeRate: string;
}

// 댓글 관리 페이지 컴포넌트
export default function ReplyManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 페이지네이션 상태 - 1페이지로 시작
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 13;
  
  // API 데이터 상태
  const [summaryData, setSummaryData] = useState<CommentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 현재 페이지의 요약 데이터들
  const pagedSummaries = summaryData.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(summaryData.length / COMMENTS_PER_PAGE);

  // 체크박스 상태 관리
  const [checkedComments, setCheckedComments] = useState<Set<number>>(new Set());

  // API 데이터 로딩
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // video_id는 location.state에서 가져와야 함
        const videoId = location.state?.videoId;
        
        console.log('[DEBUG] location.state:', location.state);
        
        console.log('[DEBUG] 사용할 video_id:', videoId);
        
        if (!videoId) {
          setError('영상 정보가 없습니다.');
          setLoading(false);
          return;
        }
        
        const response = await fetch(`http://localhost:8000/api/videos/${videoId}/comments/summary`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        
        const result: SummaryResponse = await response.json();
        
        if (result.success) {
          console.log('[DEBUG] API 응답 데이터:', result.data);
          setSummaryData(result.data);
        } else {
          throw new Error('데이터 로딩 실패');
        }
      } catch (err) {
        console.error('요약 데이터 로딩 실패:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummaryData();
  }, [location.state?.videoId]);

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
    if (checkedComments.size === pagedSummaries.length) {
      setCheckedComments(new Set());
    } else {
      setCheckedComments(new Set(pagedSummaries.map(s => s.id)));
    }
  };

  // 전체 체크 상태 확인
  const allChecked = pagedSummaries.length > 0 && checkedComments.size === pagedSummaries.length;

  // 전달받은 영상 정보 또는 기본값 사용
  const videoInfo: VideoInfo = location.state?.videoInfo || {
    thumbnail: thumbnail,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%"
  };

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
          {/* 영상 썸네일 및 정보 - VideoInfoBox 컴포넌트로 대체 */}
          <div className="relative flex flex-col ">
            {/* 뒤로가기 버튼을 썸네일 위가 아닌 바깥쪽에 배치 */}
            <div>
              <button
                className="rounded-full items-center justify-center cursor-pointer"
                onClick={() => navigate("/my")}
                style={{ transform: "scaleX(-1)" }}
                aria-label="뒤로가기"
              >
                <img src={arrow} alt="뒤로가기" className="w-[36px] h-[28px]" />
              </button>
            </div>
            <VideoInfoBox
              thumbnail={videoInfo.thumbnail}
              date={videoInfo.date}
              title={videoInfo.title}
              views={videoInfo.views}
              commentRate={videoInfo.commentRate}
              likeRate={videoInfo.likeRate}
              className=""
            />
            {/* 댓글 분석하기 버튼 */}
            <div className="flex flex-1 items-end mt-auto">
              <button
                onClick={async () => {
                  try {
                    // AI 분석 요청
                    const videoId = location.state?.videoId;
                    console.log('[DEBUG] AI 분석 요청 video_id:', videoId);
                    
                    if (!videoId) {
                      alert('영상 정보가 없습니다.');
                      return;
                    }
                    
                    const response = await fetch(`http://localhost:8000/api/videos/${videoId}/comments/analysis`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
                    });
                    
                    if (!response.ok) {
                      throw new Error('AI 분석 요청 실패');
                    }
                    
                    const result = await response.json();
                    console.log('[DEBUG] AI 분석 요청 결과:', result);
                    
                    if (result.success) {
                      alert('댓글 분석이 시작되었습니다. 잠시 후 새로고침하여 결과를 확인하세요.');
                      // 페이지 새로고침
                      window.location.reload();
                    } else {
                      throw new Error('AI 분석 요청 실패');
                    }
                  } catch (err) {
                    console.error('AI 분석 요청 실패:', err);
                    alert('댓글 분석 요청 중 오류가 발생했습니다.');
                  }
                }}
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
                  댓글 분석 이력
                </div>
                <div className="text-[#d9d9d9] text-[15px] font-extralight">
                  해당 페이지에서는 이전에 분석한 댓글 요약들을 확인할 수 있으며,<br />
                  각 요약을 클릭하여 상세한 분석 결과를 볼 수 있습니다.<br />
                  분석 이력을 통해 댓글 트렌드 변화를 파악할 수 있습니다.
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

            {/* 로딩 상태 */}
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="text-[#d9d9d9] text-[18px]">데이터를 불러오는 중...</div>
              </div>
            )}

            {/* 에러 상태 */}
            {error && (
              <div className="flex justify-center items-center h-32">
                <div className="text-[#ff0000] text-[18px]">오류: {error}</div>
              </div>
            )}

            {/* 데이터가 있을 때만 테이블 표시 */}
            {!loading && !error && summaryData.length > 0 && (
              <CommentTable
                comments={pagedSummaries}
                checkedComments={checkedComments}
                onCheck={handleCheck}
                allChecked={allChecked}
                onCheckAll={handleCheckAll}
                avatar={thumbnail}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                renderHeader={() => (
                  <>
                    <div className="flex-1 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">
                      Reaction
                    </div>
                    <div className="flex-3 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">
                      Title
                    </div>
                    <div className="flex-1 text-[#a3a3a3] text-[17px] font-medium flex justify-center items-center">
                      Date
                    </div>
                  </>
                )}
                renderRow={(summary, checked, onCheck) => (
                  <div key={summary.id} className="flex flex-col border-b border-[#606265] min-w-0">
                    <div 
                      className="flex flex-row items-center py-2 hover:bg-[#232335] transition min-w-0 cursor-pointer"
                      onClick={() => navigate('/reply_analysis', { 
                        state: { 
                          videoInfo: videoInfo,
                          summaryData: summary
                        }
                      })}
                    >
                      <div className="w-[60px] flex-shrink-0 flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-[#ff0000]"
                          checked={checked}
                          onChange={(e) => {
                            e.stopPropagation();
                            onCheck(summary.id);
                          }}
                        />
                      </div>
                      <div className="flex-1 flex justify-center items-center gap-3">
                        <div className="text-[#3b82f6] text-[15px] font-regular truncate pl-1">
                          긍정
                        </div>
                        <div className="text-[#3b82f6] text-[15px] font-regular truncate">
                          {summary.positive_ratio}%
                        </div>
                      </div>
                      <div className="flex-3 flex justify-left items-center text-[#d9d9d9] text-[15px] font-regular truncate ml-12" title={summary.summary_title}>
                        {summary.summary_title}
                      </div>
                      <div className="flex-1 flex justify-center items-center text-[#d9d9d9] text-[15px] font-regular">
                        {new Date(summary.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              />
            )}

            {/* 데이터가 없을 때 */}
            {!loading && !error && summaryData.length === 0 && (
              <div className="flex justify-center items-center h-32">
                <div className="text-[#d9d9d9] text-[18px]">댓글 분석 목록이 존재하지 않습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
