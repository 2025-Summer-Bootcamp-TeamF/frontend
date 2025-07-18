import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import youtubeLogo from "../assets/youtube.png";
import avatar from "../assets/avatar.png";
import image1 from "../assets/image1.png";
import channelAnalysisIcon from "../assets/channel_analysis.png";
import mypageIcon from "../assets/mypage.png";
import videoCategorizeIcon from "../assets/video_categorize.png";

const COMMENTS_PER_PAGE = 14;
const TOTAL_COMMENTS = 100;
const initialComments = Array.from({ length: TOTAL_COMMENTS }).map((_, i) => ({
  account: `Kim Hanjooo__${i + 1}`,
  comment: "와 영상 너무 멋져요 기대됩니다",
  date: "2019-08-21",
  checked: false,
}));

export default function ReplyManagementPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState(initialComments);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  // 현재 페이지에 해당하는 댓글만 보여줌
  const pagedComments = comments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE
  );

  // 전체 선택 체크박스 상태
  const allChecked = pagedComments.every((c) => c.checked);
  const someChecked = pagedComments.some((c) => c.checked);

  // 개별 체크박스 토글
  const handleCheck = (idx: number) => {
    const globalIdx = (page - 1) * COMMENTS_PER_PAGE + idx;
    setComments((prev) =>
      prev.map((c, i) =>
        i === globalIdx ? { ...c, checked: !c.checked } : c
      )
    );
  };

  // 전체 선택/해제 토글
  const handleCheckAll = () => {
    setComments((prev) =>
      prev.map((c, i) => {
        const inPage = i >= (page - 1) * COMMENTS_PER_PAGE && i < page * COMMENTS_PER_PAGE;
        return inPage ? { ...c, checked: !allChecked } : c;
      })
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "#18191b",
        display: "flex",
        fontFamily: "Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        .reply-sidebar {
          width: 90px;
          background: #111;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 24px;
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
          height: 100vh;
        }
        .reply-sidebar .logo {
          margin-bottom: 36px;
          cursor: pointer;
        }
        .reply-sidebar .icon {
          width: 32px;
          height: 32px;
          margin: 18px 0;
          opacity: 0.8;
          cursor: pointer;
          user-drag: none;
          user-select: none;
        }
        .reply-main {
          flex: 1;
          display: flex;
          gap: 24px;
          padding: 24px 24px 24px 0;
          height: 100vh;
          box-sizing: border-box;
        }
        .reply-left-card {
          width: 400px;
          background: #232325;
          border-radius: 18px;
          box-shadow: 0 0 16px 2px #0002;
          padding: 48px 16px 16px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 0;
          height: 100%;
          box-sizing: border-box;
          position: relative;
        }
        .reply-back {
          position: absolute;
          top: 16px;
          left: 16px;
          align-self: flex-start;
          font-size: 1.5rem;
          color: #fff;
          opacity: 0.7;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .reply-thumb {
          width: 100%;
          max-width: 360px;
          height: 240px;
          border-radius: 12px;
          object-fit: cover;
          margin-bottom: 12px;
          user-drag: none;
          user-select: none;
        }
        .reply-info {
          color: #fff;
          width: 100%;
          margin-bottom: 10px;
          margin-left: 12px;
          margin-top: 20px;
        }
        .reply-info .date {
          color: #aaa;
          font-size: 0.95rem;
          margin-bottom: 2px;
        }
        .reply-info .title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .reply-info .meta {
          font-size: 0.95rem;
          color: #ccc;
          margin-bottom: 1px;
        }
        .reply-tabs {
          width: 100%;
          margin-top: 38px;
        }
        .reply-tab {
          background: #181818;
          border-radius: 10px;
          padding: 10px 10px 8px 10px;
          margin-bottom: 8px;
          font-size: 0.98rem;
          color: #fff;
          border: 2px solid transparent;
          cursor: pointer;
          transition: border 0.2s;
        }
        .reply-tab.selected {
          border: 2px solid #e52d27;
          color: #e52d27;
          background: #232325;
        }
        .reply-tab.selected.negative {
          border: 2px solid #e52d27;
          color: #e52d27;
          background: #fff;
        }
        .reply-tab.selected.negative .tab-title {
          color: #e52d27;
        }
        .reply-tab.selected.negative .tab-desc {
          color: #e52d27;
        }
        .reply-tab .tab-title {
          font-weight: 700;
          margin-bottom: 2px;
          display: block;
        }
        .reply-tab .tab-desc {
          font-size: 0.92rem;
          color: #ccc;
        }
        .reply-content {
          flex: 1;
          background: #232325;
          border-radius: 18px;
          box-shadow: 0 0 16px 2px #0002;
          padding: 20px 16px 12px 16px;
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100%;
          box-sizing: border-box;
          position: relative;
        }
        .reply-content-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 4px;
          margin-top: 0;
        }
        .reply-content-title {
          color: #e52d27;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .reply-content-desc {
          color: #ccc;
          font-size: 0.95rem;
          margin-bottom: 0;
          margin-top: 2px;
          max-width: 480px;
        }
        .reply-desc-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .reply-bad-btn {
          position: absolute;
          top: 80px;
          right: 24px;
          background: #444;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 7px 14px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          margin: 0;
        }
        .reply-bad-btn:hover {
          background: #e52d27;
        }
        .reply-table {
          width: 100%;
          background: #232325;
          border-radius: 10px;
          margin-top: 0px;
          border-collapse: separate;
          border-spacing: 0 0;
          font-size: 0.95rem;
        }
        .reply-table th, .reply-table td {
          padding: 6px 6px;
          text-align: left;
        }
        .reply-table th {
          color: #aaa;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .reply-table td {
          color: #fff;
          font-size: 0.95rem;
          background: #181818;
          border-radius: 0;
        }
        /* 계정 이름 셀의 좌우 길이(최소/최대) 조정 */
        .reply-table .account-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .reply-table .profile {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 6px;
          margin-left: 10px;
          user-drag: none;
          user-select: none;
        }
        .reply-table .checkbox {
          width: 16px;
          height: 16px;
          accent-color: #e52d27;
        }
        .reply-table-body {
          display: block;
          max-height: calc(100vh - 320px);
          overflow-y: auto;
        }
        .reply-table thead, .reply-table tbody, .reply-table tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
        .reply-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 0;
          margin-bottom: 0;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 16px;
          height: 48px;
          background: transparent;
        }
        .reply-pagination-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #181818;
          color: #fff;
          border: none;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .reply-pagination-btn.selected {
          background: #e52d27;
          color: #fff;
        }
        .reply-pagination-btn:hover {
          background: #e52d27;
        }
        @media (max-width: 1100px) {
          .reply-main {
            flex-direction: column;
            gap: 12px;
            padding: 12px 0 12px 0;
            height: 100vh;
          }
          .reply-left-card, .reply-content {
            width: 100% !important;
            min-width: 0;
            height: 45vh;
            padding: 10px 6px 6px 6px;
          }
          .reply-table-body {
            max-height: 18vh;
          }
          /* 계정 이름 셀 모바일에서 더 좁게 */
          .reply-table .account-cell {
            min-width: 70px;
            max-width: 120px;
          }
        }
        /* 댓글 상단 배치용 래퍼 */
        .reply-top-actions {
          display: flex;
          align-items: flex-start;
          margin-bottom: 10px;
          justify-content: space-between;
        }
        .reply-top-actions .reply-bad-btn {
          margin-left: -12px; /* 왼쪽으로 조금 이동 */
          margin-right: 0;
          margin-top: 0;
        }
        .reply-top-actions .reply-content-header {
          flex: 1;
        }
        /* 댓글 테이블 위에 버튼 배치용 래퍼 */
        .reply-table-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 4px;
          margin-top: 0;
        }
        .reply-left-content {
          width: 100%;
          padding-top: 40px;
        }
        .reply-table-wrapper {
          position: relative;
          margin-top: 80px;
        }
        .comment-cell {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .reply-header-actions {
          position: absolute;
          top: 80px;
          right: 24px;
          display: flex;
          gap: 12px;
        }
        .reply-move-btn {
          background: #444;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 7px 14px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .reply-move-btn:hover {
          background: #e52d27;
        }
        .reply-delete-btn {
          background: #e52d27;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 7px 18px 7px 14px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
        }
        .reply-delete-btn:hover {
          background: #b31217;
        }
      `}</style>
      {/* 사이드바 */}
      <div className="reply-sidebar">
        <img
          src={youtubeLogo}
          alt="YouTube Logo"
          className="logo"
          style={{ width: 60, height: 40, objectFit: "contain" }}
          onClick={() => navigate("/")}
        />
        <img
          src={mypageIcon}
          alt="My Page"
          className="icon"
          onClick={() => navigate("/mypage")}
        />
        <img
          src={channelAnalysisIcon}
          alt="Channel Analysis"
          className="icon"
          onClick={() => navigate("/channel-analysis")}
        />
        <img
          src={videoCategorizeIcon}
          alt="Video Categorize"
          className="icon"
          onClick={() => navigate("/video-categorize")}
        />
      </div>
      {/* 메인 */}
      <div className="reply-main">
        {/* 왼쪽 카드 */}
        <div className="reply-left-card">
          <div className="reply-back">&#8592;</div>
          <div className="reply-left-content">
            <img src={image1} alt="썸네일" className="reply-thumb" draggable={false} />
            <div className="reply-info">
              <div className="date">2025. 07. 10</div>
              <div className="title">[Teaser] 실리카겔 (Silica Gel) - 南宮FEFERE</div>
              <div className="meta">조회수 <span style={{ marginLeft: 8 }}>38,665회</span></div>
              <div className="meta">댓글 참여율 <span style={{ marginLeft: 8 }}>0.007%</span></div>
              <div className="meta">좋아요 참여율 <span style={{ marginLeft: 8 }}>0.7%</span></div>
            </div>
            <div className="reply-tabs">
              <div className="reply-tab" onClick={() => navigate("/reply_positive") } style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="tab-title">긍정적인 댓글</span>
                  <span className="tab-desc">영상의 긍정적인 댓글만 모아,<br />한 번에 좋아요를 눌러 팬들과 빠르게 교감하세요.</span>
                </div>
              </div>
              <div className="reply-tab selected negative" style={{ cursor: "pointer" }}>
                <span className="tab-title">부정적인 댓글 & 광고 댓글 ✓</span>
                <span className="tab-desc">악성/광고/부정성 댓글을 자동으로 선별해,<br />클릭 한 번으로 정리할 수 있어요.</span>
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽 메인 */}
        <div className="reply-content">
          <div className="reply-header-actions">
            <button className="reply-move-btn">긍정 댓글로 이동</button>
            <button className="reply-delete-btn">댓글 삭제 <span role="img" aria-label="delete">🗑️</span></button>
          </div>
          {/* 댓글 상단: 타이틀/설명 */}
          <div className="reply-top-actions">
            <div className="reply-content-header" style={{ marginBottom: 0 }}>
              <div className="reply-content-title">부정적인 댓글 & 광고 댓글</div>
              <div className="reply-content-desc">
                악성 댓글 및 광고 댓글로 분류된 내용입니다.<br />잘못 분류되었다고 생각되는 댓글은 체크를 해제하고<br />
                삭제할 댓글만 선택해 한 번에 삭제할 수 있습니다.
              </div>
            </div>
          </div>
          {/* 댓글 테이블과 페이지네이션 등 기존 내용 유지 */}
          {/* 댓글 테이블 */}
          <table className="reply-table">
            <thead>
              <tr>
                <th style={{ width: 60, textAlign: "center" }}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={allChecked}
                    ref={el => {
                      if (el) el.indeterminate = false;
                    }}
                    onChange={handleCheckAll}
                  />
                </th>
                <th style={{ width: 200, textAlign: "center" }}>Account</th>
                <th style={{ width: 360, textAlign: "center" }}>Comment</th>
                <th style={{ width: 400, textAlign: "center" }}>Date</th>
              </tr>
            </thead>
            <tbody className="reply-table-body">
              {pagedComments.map((c, i) => (
                <tr key={i + (page - 1) * COMMENTS_PER_PAGE}>
                  <td style={{ width: 60, textAlign: "center" }}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={c.checked}
                      onChange={() => handleCheck(i)}
                    />
                  </td>
                  <td className="account-cell" style={{ width: 240, textAlign: "left" }}>
                    <img src={avatar} alt="profile" className="profile" draggable={false} />
                    {c.account}
                  </td>
                  <td className="comment-cell" style={{ width: 440, textAlign: "left" }} title={c.comment}>
                    {c.comment}
                  </td>
                  <td className="date-cell" style={{ width: 160, textAlign: "center" }}>
                    {c.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 페이지네이션 */}
          <div className="reply-pagination">
            <button
              className="reply-pagination-btn"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={page === 1 ? { opacity: 0.5, cursor: "default" } : {}}
            >
              &#60;
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`reply-pagination-btn${page === idx + 1 ? " selected" : ""}`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="reply-pagination-btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={page === totalPages ? { opacity: 0.5, cursor: "default" } : {}}
            >
              &#62;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
