import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import avatar from "../assets/avatar.png";
import thumbnail from "../assets/thumbnail1.png";
import arrow from "../assets/arrow.png";
import VideoInfoBox from "../components/VideoInfoBox";
import CommentTable from "../components/CommentTable";

// 댓글 데이터 타입 정의
export interface Comment {
  id: number;
  account: string;
  comment: string;
  date: string;
  checked: boolean;
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
  const { videoId } = useParams<{ videoId: string }>();

  // 전달받은 영상 정보 또는 기본값 사용
  const videoInfo: VideoInfo = location.state?.videoInfo || {
    thumbnail: thumbnail,
    date: "2025. 07. 10",
    title: "[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE",
    views: "38,665회",
    commentRate: "0.007%",
    likeRate: "0.7%",
  };

  // 현재 활성화된 탭 상태
  const [activeTab, setActiveTab] = useState<"positive" | "negative">(
    "positive"
  );

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 13;

  // 댓글 데이터 상태
  const [positiveComments, setPositiveComments] = useState<Comment[]>([]);
  const [negativeComments, setNegativeComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드 상태 추적
  const hasInitialLoadRef = useRef(false);
  const isClassifyingRef = useRef(false);
  const classifyJobIdRef = useRef<string | null>(null);

  // 페이지 변경 시 상태 유지
  useEffect(() => {
    // 페이지가 변경되어도 검색어와 탭 상태는 유지
    // 체크박스 상태도 유지 (필요한 경우에만 초기화)
  }, [currentPage]);

  // 체크박스 상태 관리
  const [checkedComments, setCheckedComments] = useState<Set<number>>(
    new Set()
  );

  // API에서 긍정 댓글 데이터 가져오기
  const fetchPositiveComments = async (shouldClassify = false) => {
    console.log("=== fetchPositiveComments 호출됨 ===");
    console.log("videoId:", videoId);
    console.log("shouldClassify:", shouldClassify);
    console.log("isClassifyingRef.current:", isClassifyingRef.current);
    console.log("호출 스택:", new Error().stack);

    const currentVideoId = videoId;
    if (!currentVideoId) {
      setError("비디오 ID가 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = "http://localhost:8000";
      const endpoint = `${baseUrl}/api/videos/${currentVideoId}/comments/positive`;
      const token = localStorage.getItem("token");

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      console.log("API 응답 상태:", response.status);

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API 응답 데이터:", responseData);

      // 댓글이 있으면 표시
      if (responseData.data && responseData.data.length > 0) {
        console.log("댓글이 이미 있음:", responseData.data.length, "개");
        const formattedComments: Comment[] = responseData.data.map(
          (comment: any, index: number) => ({
            id: comment.youtube_comment_id || comment.id, // youtube_comment_id 사용
            account: comment.author_name || `User_${index + 1}`,
            comment: comment.comment || "댓글 내용 없음",
            date: comment.comment_date
              ? new Date(comment.comment_date).toLocaleDateString("ko-KR")
              : "날짜 없음",
            checked: false,
          })
        );
        setPositiveComments(formattedComments);
        setIsLoading(false);
        return;
      }

      // 댓글이 없고 classify를 해야 하는 경우
      console.log(
        "댓글이 없음, shouldClassify:",
        shouldClassify,
        "isClassifyingRef:",
        isClassifyingRef.current
      );
      if (shouldClassify && !isClassifyingRef.current) {
        console.log("댓글이 없어서 classify API 호출");
        isClassifyingRef.current = true;

        try {
          const classifyRes = await fetch(
            `${baseUrl}/api/videos/${currentVideoId}/comments/classify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
            }
          );

          if (classifyRes.ok) {
            const classifyData = await classifyRes.json();
            console.log("classify 작업 시작됨, job_id:", classifyData.job_id);
            classifyJobIdRef.current = classifyData.job_id;
            // 상태 확인 시작
            checkClassifyStatus(classifyData.job_id);
          } else {
            throw new Error(`댓글 분류 API 실패: ${classifyRes.status}`);
          }
        } catch (classifyErr) {
          console.error("classify 실패:", classifyErr);
          isClassifyingRef.current = false;
          setError("댓글 분류 중 오류가 발생했습니다.");
          setIsLoading(false);
        }
      } else {
        // 댓글이 없고 classify도 안 하는 경우
        setPositiveComments([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("❌ API 오류:", error);
      setError("댓글 데이터를 불러오는데 실패했습니다.");
      setPositiveComments([]);
      setIsLoading(false);
    }
  };

  // classify 작업 상태 확인 함수
  const checkClassifyStatus = async (jobId: string) => {
    // 현재 job이 아니면 무시
    if (classifyJobIdRef.current !== jobId) {
      console.log("다른 job ID, 무시함");
      return;
    }

    const token = localStorage.getItem("token");
    const statusEndpoint = `http://localhost:8000/api/videos/${videoId}/comments/classify/status/${jobId}`;

    try {
      const response = await fetch(statusEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (response.ok) {
        const statusData = await response.json();
        console.log("classify 작업 상태:", statusData.status);

        if (statusData.status === "completed") {
          console.log("classify 작업 완료, 댓글 다시 불러오기");
          isClassifyingRef.current = false;
          // 댓글 다시 불러오기 (classify 없이)
          fetchPositiveComments(false);
        } else if (statusData.status === "failed") {
          console.error("classify 작업 실패");
          isClassifyingRef.current = false;
          setError("댓글 분류 작업이 실패했습니다.");
          setIsLoading(false);
        } else {
          // waiting, active 상태면 2초 후 다시 확인
          setTimeout(() => {
            checkClassifyStatus(jobId);
          }, 2000);
        }
      } else {
        console.error("상태 확인 실패:", response.status);
        isClassifyingRef.current = false;
        setError("작업 상태 확인 실패");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("상태 확인 중 오류:", error);
      isClassifyingRef.current = false;
      setError("작업 상태 확인 중 오류 발생");
      setIsLoading(false);
    }
  };

  // API에서 부정 댓글 데이터 가져오기
  const fetchNegativeComments = async () => {
    const currentVideoId = videoId;
    if (!currentVideoId) {
      setError("비디오 ID가 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = "http://localhost:8000";
      const endpoint = `${baseUrl}/api/videos/${currentVideoId}/comments/negative`;
      const token = localStorage.getItem("token");

      console.log("부정 댓글 API 호출:", endpoint);

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      console.log("부정 댓글 API 응답 상태:", response.status);

      if (!response.ok) {
        throw new Error(`부정 댓글 API 요청 실패: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("부정 댓글 API 응답 데이터:", responseData);

      if (responseData.data && Array.isArray(responseData.data)) {
        const formattedComments: Comment[] = responseData.data.map(
          (comment: any, index: number) => ({
            id: comment.youtube_comment_id || comment.id, // youtube_comment_id 사용
            account: comment.author_name || `User_${index + 1}`,
            comment: comment.comment || "댓글 내용 없음",
            date: comment.comment_date
              ? new Date(comment.comment_date).toLocaleDateString("ko-KR")
              : "날짜 없음",
            checked: false,
          })
        );
        console.log("부정 댓글 포맷팅 완료:", formattedComments.length, "개");
        setNegativeComments(formattedComments);
      } else {
        console.log("부정 댓글 데이터 없음");
        setNegativeComments([]);
      }
    } catch (error) {
      console.error("❌ 부정 댓글 API 오류:", error);
      setError("부정 댓글을 불러오는데 실패했습니다.");
      setNegativeComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 댓글 데이터 로드 (한 번만)
  useEffect(() => {
    if (videoId && !hasInitialLoadRef.current) {
      hasInitialLoadRef.current = true;
      console.log("초기 데이터 로드");

      // 긍정 댓글 로드 (처음에는 classify 시도)
      fetchPositiveComments(true);

      // 부정 댓글 로드
      fetchNegativeComments();
    }
  }, [videoId]);

  // 탭 변경 시에만 체크된 댓글 초기화
  useEffect(() => {
    setCheckedComments(new Set());
    setCurrentPage(1);
  }, [activeTab]);

  // 댓글 분류 변경
  // 댓글 분류 변경 API 연동
  const moveComments = async () => {
    const selectedIds = Array.from(checkedComments);
    if (selectedIds.length === 0) {
      alert("이동할 댓글을 선택해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/videos/${videoId}/comments`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            comment_ids: selectedIds,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(
          `${result.updated}개의 댓글이 ${
            activeTab === "positive" ? "부정" : "긍정"
          } 댓글로 이동되었습니다.`
        );

        // 선택된 댓글들을 현재 탭에서 제거
        const selectedComments = currentComments.filter(comment => 
          selectedIds.includes(comment.id)
        );

        if (activeTab === "positive") {
          // 긍정 → 부정 이동: 긍정 댓글에서 제거
          setPositiveComments(prev => 
            prev.filter(comment => !selectedIds.includes(comment.id))
          );
          // 부정 댓글에 추가 (comment_type을 2로 변경)
          setNegativeComments(prev => [
            ...selectedComments.map(comment => ({
              ...comment,
              comment_type: 2
            })),
            ...prev
          ]);
        } else {
          // 부정 → 긍정 이동: 부정 댓글에서 제거
          setNegativeComments(prev => 
            prev.filter(comment => !selectedIds.includes(comment.id))
          );
          // 긍정 댓글에 추가 (comment_type을 1로 변경)
          setPositiveComments(prev => [
            ...selectedComments.map(comment => ({
              ...comment,
              comment_type: 1
            })),
            ...prev
          ]);
        }

        setCheckedComments(new Set());
      } else {
        const errorData = await response.json();
        alert(`댓글 이동 실패: ${errorData.error || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("댓글 이동 중 오류:", error);
      alert("댓글 이동 중 오류가 발생했습니다.");
    }
  };

  // 댓글 삭제 API 연동
  const deleteComments = async () => {
    const selectedIds = Array.from(checkedComments);
    if (selectedIds.length === 0) {
      alert("삭제할 댓글을 선택해주세요.");
      return;
    }

    if (!confirm(`선택한 ${selectedIds.length}개의 댓글을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 토큰이 없으면 로그인 페이지로
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const youtubeAccessToken = localStorage.getItem("youtube_access_token");
      console.log("YouTube 액세스 토큰:", youtubeAccessToken ? "있음" : "없음");
      console.log("localStorage 전체 확인:", {
        token: localStorage.getItem("token"),
        isLoggedIn: localStorage.getItem("isLoggedIn"),
        youtube_access_token: localStorage.getItem("youtube_access_token"),
      });

      const requestBody = {
        comment_ids: selectedIds,
        youtube_access_token: youtubeAccessToken, // YouTube 액세스 토큰 전송
      };
      console.log("삭제 요청 데이터:", requestBody);

      const response = await fetch(
        `http://localhost:8000/api/videos/${videoId}/comments`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      // 401 에러 처리
      if (response.status === 401) {
        // 토큰 제거
        localStorage.removeItem("token");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }

      if (response.ok) {
        const result = await response.json();
        const message = result.message || `${result.dbDeleted || selectedIds.length}개의 댓글이 삭제되었습니다.`;
        alert(message);

        // 선택된 댓글들을 현재 탭에서 즉시 제거
        if (activeTab === "negative") {
          setNegativeComments(prev => 
            prev.filter(comment => !selectedIds.includes(comment.id))
          );
        }

        setCheckedComments(new Set());
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(
          `댓글 삭제 실패: ${
            errorData.error || errorData.detail || "알 수 없는 오류"
          }`
        );
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  // 탭 전환 핸들러
  const handleTabChange = (tab: "positive" | "negative") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setCheckedComments(new Set());
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    // 유효한 페이지 범위인지 확인
    const maxPage = Math.ceil(currentComments.length / COMMENTS_PER_PAGE);
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
      console.log(`페이지 변경: ${page} (최대: ${maxPage})`);
    } else {
      console.log(`잘못된 페이지 번호: ${page} (최대: ${maxPage})`);
    }
  };

  // 현재 활성 탭의 댓글 데이터 (최신순 정렬)
  const currentComments = (activeTab === "positive" ? positiveComments : negativeComments)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // 최신순 정렬
    });

  // 현재 페이지의 댓글들 (페이지 범위 계산 수정)
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const pagedComments = currentComments.slice(startIndex, endIndex);

  // 디버깅을 위한 로그
  console.log("페이지네이션 디버그:", {
    currentPage,
    totalComments: currentComments.length,
    startIndex,
    endIndex,
    pagedCommentsLength: pagedComments.length,
    activeTab
  });

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(currentComments.length / COMMENTS_PER_PAGE);

  // 페이지 유효성 검사 및 자동 리셋
  useEffect(() => {
    if (currentComments.length > 0 && currentPage > totalPages && totalPages > 0) {
      console.log(`페이지 범위 초과, 1페이지로 리셋 (현재: ${currentPage}, 최대: ${totalPages})`);
      setCurrentPage(1);
    }
  }, [currentComments.length, currentPage, totalPages]);

  // 데이터 상태 디버깅
  useEffect(() => {
    console.log("데이터 상태 업데이트:", {
      positiveCommentsLength: positiveComments.length,
      negativeCommentsLength: negativeComments.length,
      currentTab: activeTab,
      currentCommentsLength: currentComments.length,
      pagedCommentsLength: pagedComments.length,
      currentPage,
      totalPages
    });
  }, [positiveComments, negativeComments, activeTab, currentComments, pagedComments, currentPage, totalPages]);

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
    const currentPageCommentIds = new Set(pagedComments.map((c) => c.id));
    const allCurrentPageChecked = pagedComments.every((comment) =>
      checkedComments.has(comment.id)
    );

    if (allCurrentPageChecked) {
      // 현재 페이지의 모든 댓글 체크 해제
      const newChecked = new Set(checkedComments);
      currentPageCommentIds.forEach((id) => newChecked.delete(id));
      setCheckedComments(newChecked);
    } else {
      // 현재 페이지의 모든 댓글 체크
      const newChecked = new Set(checkedComments);
      currentPageCommentIds.forEach((id) => newChecked.add(id));
      setCheckedComments(newChecked);
    }
  };

  // 전체 체크 상태 확인 (현재 페이지의 모든 댓글이 체크되어 있는지)
  const allChecked =
    pagedComments.length > 0 && pagedComments.every((comment) =>
      checkedComments.has(comment.id)
    );

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
        <div className="flex flex-col flex-3 w-full rounded-2xl bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)] p-10">
          <div>
            {/* 영상 썸네일 및 정보 */}
            <div className="relative flex flex-col">
              <div>
                <button
                  className="rounded-full items-center justify-center cursor-pointer"
                  onClick={() => navigate("/my")}
                  style={{ transform: "scaleX(-1)" }}
                  aria-label="뒤로가기"
                >
                  <img
                    src={arrow}
                    alt="뒤로가기"
                    className="w-[36px] h-[28px]"
                  />
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
            </div>

            {/* 댓글 타입 선택 탭 */}
            <div className="flex flex-col gap-4">
              {/* 긍정적인 댓글 탭 */}
              <div
                className={`rounded-xl border-2 px-6 py-4 flex flex-col cursor-pointer transition
                  ${
                    activeTab === "positive"
                      ? "border-[#ff0000] bg-white"
                      : "border-transparent bg-[#ffffff]"
                  }`}
                onClick={() => handleTabChange("positive")}
              >
                <span
                  className={`text-[18.5px] font-semibold mb-1 ${
                    activeTab === "positive"
                      ? "text-[#ff0000]"
                      : "text-[#a3a3a3]"
                  }`}
                >
                  긍정적인 댓글 {activeTab === "positive" && "✓"}
                </span>
                <span className="text-[#6c6b6b] text-[15px] font-regular">
                  영상의 긍정적인 댓글만 모아,
                  <br />한 번에 좋아요를 눌러 팬들과 빠르게 교감하세요.
                </span>
              </div>

              {/* 부정적인 댓글 탭 */}
              <div
                className={`rounded-xl border-2 px-6 py-4 flex flex-col cursor-pointer transition
                  ${
                    activeTab === "negative"
                      ? "border-[#ff0000] bg-white"
                      : "border-transparent bg-[#ffffff]"
                  }`}
                onClick={() => handleTabChange("negative")}
              >
                <span
                  className={`text-[18.5px] font-semibold mb-1 ${
                    activeTab === "negative"
                      ? "text-[#ff0000]"
                      : "text-[#a3a3a3]"
                  }`}
                >
                  부정적인 댓글 & 광고 댓글 {activeTab === "negative" && "✓"}
                </span>
                <span className="text-[#6c6b6b] text-[15px] font-regular">
                  악성 댓글과 광고성 댓글을 자동으로 선별해,
                  <br />
                  클릭 한 번으로 정리할 수 있어요.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 컨테이너 - 댓글 목록 */}
        <div className="flex flex-col flex-7 w-full rounded-2xl bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)] h-full min-h-0">
          <div className="p-8 flex flex-col">
            {/* 헤더 영역 */}
            <div className="flex flex-row items-center justify-between mb-6">
              <div>
                <div className="text-[22px] font-semibold text-[#ff0000] mb-2">
                  {activeTab === "positive"
                    ? "긍정적인 댓글"
                    : "부정적인 댓글 & 광고 댓글"}
                </div>
                <div className="text-[#d9d9d9] text-[15px] font-extralight">
                  {activeTab === "positive" ? (
                    <>
                      해당 페이지에서는 긍정적인 댓글로 분류된 댓글들을 모아볼
                      수 있으며,
                      <br />
                      잘못 분류된 악성 댓글은 긍정 댓글에서 제외할 수 있습니다.
                      <br />
                      올바른 분류를 통해 더 정확한 분석이 가능해집니다.
                    </>
                  ) : (
                    <>
                      악성 댓글 및 광고 댓글로 분류된 내용입니다.
                      <br />
                      잘못 분류되었다고 생각되는 댓글은 체크를 해제하고,
                      <br />
                      삭제할 댓글만 선택해 한 번에 삭제할 수 있어요.
                    </>
                  )}
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex gap-3">
                <button
                  className="w-[200px] h-[55px] px-6 py-3 bg-[#555] text-white rounded-[10px] text-[18px] font-semibold hover:bg-[#333] transition-colors"
                  onClick={moveComments}
                  disabled={isLoading || checkedComments.size === 0}
                >
                  {activeTab === "positive"
                    ? "악성 댓글로 이동"
                    : "긍정 댓글로 이동"}
                </button>
                {activeTab === "negative" && (
                  <button
                    className="w-[170px] h-[55px] px-6 py-3 bg-[#ff0000] text-white rounded-[10px] text-[18px] font-semibold hover:bg-[#b31217] transition-colors flex justify-center items-center gap-2"
                    onClick={deleteComments}
                    disabled={isLoading || checkedComments.size === 0}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>댓글 삭제</span>
                  </button>
                )}
              </div>
            </div>

            {/* 로딩 상태 */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-[#d9d9d9] text-[18px]">
                  {activeTab === "positive" ? "긍정" : "부정"} 댓글을 불러오는
                  중...
                  {isClassifyingRef.current && " (댓글 분류 작업 진행 중)"}
                </div>
              </div>
            )}

            {/* 에러 상태 */}
            {error && !isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-[#ff0000] text-[18px]">{error}</div>
              </div>
            )}

            {/* 댓글 테이블 */}
            {!isLoading && !error && (
              <>
                {currentComments.length > 0 ? (
                  <CommentTable
                    comments={pagedComments}
                    checkedComments={checkedComments}
                    onCheck={handleCheck}
                    allChecked={allChecked}
                    onCheckAll={handleCheckAll}
                    avatar={avatar}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-[#d9d9d9] text-[18px]">
                      {activeTab === "positive" ? "긍정" : "부정"} 댓글이 없습니다.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
