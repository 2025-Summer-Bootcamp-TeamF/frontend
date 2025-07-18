import React from "react";
import { useNavigate } from "react-router-dom";
import youtubeLogo from "../assets/youtube.png";
import analysisIcon from "../assets/analysis.png";
import categoryIcon from "../assets/category.png";
import replyIcon from "../assets/reply.png";

const cardData = [
  {
    img: analysisIcon,
    title: (
      <>
        <b>Channel <span style={{ color: '#aaa', fontWeight: 400 }}>Analysis</span></b>
      </>
    ),
    desc: (
      <>
        다른 채널의 분석을 통해<br />내 채널 성장의 발판을 마련해보세요.
      </>
    ),
    btn: "바로 비교하기",
    onClick: (navigate: (path: string) => void) => navigate('/analysis'),
  },
  {
    img: categoryIcon,
    title: (
      <>
        <b>Video Cate<span style={{ color: '#aaa', fontWeight: 400 }}>gorize</span></b>
      </>
    ),
    desc: (
      <>
        영상을 분석하여 시청자의 눈길을<br />사로잡을 수 있도록 도와줍니다.
      </>
    ),
    btn: "인사이트 확인하기",
    onClick: (navigate: (path: string) => void) => navigate('/category'),
  },
  {
    img: replyIcon,
    title: (
      <>
        <b>Reply <span style={{ color: '#aaa', fontWeight: 400 }}>Management</span></b>
      </>
    ),
    desc: (
      <>
        편리한 댓글 관리를 통해<br />구독자들과 더 쉽게 소통하세요.
      </>
    ),
    btn: "댓글 분석하기",
    onClick: (navigate: (path: string) => void) => navigate('/reply_positive'),
  },
];

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at 100% -50%, rgba(229,45,39,0.8) 10%, #111 60%)',
      color: '#fff',
      fontFamily: 'Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden',
      boxSizing: 'border-box',
    }}>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 48px 60px 0 60px;
          width: 100%;
          box-sizing: border-box;
        }
        .main-header .logo {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
        }
        .main-header .logo img {
          height: 36px;
        }
        .main-header .logo-text {
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: -1px;
        }
        .logout-button {
          font-size: 1.7rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logout-button:hover {
          color: #e52d27;
        }

        .main-section {
          min-height: calc(100vh - 60px); /* 기존보다 30px 정도 상하로 더 늘림 */
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding-top: 72px;    /* 기존 48px -> 72px로 상단 패딩 증가 */
          padding-bottom: 72px; /* 기존 48px -> 72px로 하단 패딩 증가 */
        }
        .main-cards {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 40px; /* 카드 간의 간격을 동일하게 40px로 조정 */
          width: 100%;
          flex-wrap: wrap;
          padding-left: 40px; /* 좌우 여백을 60px -> 40px로 아주 조금만 줄임 */
          padding-right: 40px;
          box-sizing: border-box;
        }
        .main-card {
          background: #181818;
          border-radius: 18px;
          box-shadow: 0 0 24px 2px #e52d27a0;
          border: 2px solid #333;
          width: 360px; /* 카드의 너비를 380px -> 360px로 아주 조금만 줄임 */
          height: 540px;
          min-width: 360px;
          min-height: 540px;
          max-width: 360px;
          max-height: 540px;
          padding: 38px 28px 38px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          box-sizing: border-box;
          margin: 0; /* 카드 간의 간격은 gap으로만 조정 */
        }
        .main-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 0 40px 6px #e52d27cc;
        }
        .main-card img {
          width: 160px;
          height: 160px;
          margin-bottom: 0;
          margin-top: 8px;
          object-fit: contain;
        }
        .main-card-title {
          font-size: 1.9rem;
          font-weight: 700;
          margin: 28px 0 16px 0;
          color: #fff;
        }
        /* 카드 타이틀 그라데이션 효과 - 흰색 계열로 변경 */
        .main-card-title .gradient-text {
          background: linear-gradient(90deg, #fff 0%, #e0e0e0 50%, #bdbdbd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        /* 카드 타이틀의 주요 키워드에 흰색 그라데이션 적용 */
        .main-card-title .main-gradient {
          background: linear-gradient(90deg, #fff 0%, #e0e0e0 50%, #bdbdbd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .main-card-desc {
          color: #ccc;
          font-size: 1.18rem;
          margin-bottom: 28px;
          margin-top: 0;
          text-align: center;
          min-height: 56px;
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.6;
        }
        .main-card-btn {
          background: #e52d27;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 18px 0;
          width: 100%;
          font-size: 1.18rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 28px;
        }
        .main-card-btn:hover {
          background: #b31217;
        }
        @media (max-width: 1100px) {
          .main-cards { 
            flex-direction: column; 
            align-items: center; 
            gap: 40px; /* 세로 gap도 동일하게 40px로 맞춤 */
            padding-left: 0;
            padding-right: 0;
          }
          .main-card {
            margin: 0; /* 카드 간의 간격은 gap으로만 조정 */
          }
        }
        @media (max-width: 600px) {
          .main-header { flex-direction: column; gap: 16px; padding: 24px 8px 0 8px; }
          .main-section { min-height: calc(100vh - 40px); padding-top: 36px; padding-bottom: 36px; }
          .main-cards { gap: 24px; padding-left: 0; padding-right: 0; }
          .main-card {
            width: 97vw;
            max-width: 360px;
            min-width: 240px;
            height: 440px;
            min-height: 440px;
            max-height: 440px;
            padding: 22px 8px;
            margin: 0; /* 카드 간의 간격은 gap으로만 조정 */
          }
          .main-card img { width: 110px; height: 110px; }
          .main-card-title { font-size: 1.3rem; margin: 16px 0 10px 0; }
          .main-card-desc { font-size: 1.05rem; min-height: 36px; margin-bottom: 16px; }
          .main-card-btn { font-size: 1.05rem; padding: 12px 0; margin-top: 16px; }
        }
      `}</style>
      <div className="main-header">
        <div className="logo" onClick={() => navigate("/") }>
          <img src={youtubeLogo} alt="YouTube Logo" />
          <span className="logo-text">YouTube</span>
        </div>
        <button className="logout-button" onClick={() => navigate("/reply_analysis")}>Logout &rarr;</button>
        {/* <button className="logout-button" onClick={() => navigate("/mainpage")}>Logout &rarr;</button> */}
      </div>
      <div className="main-section">
        <div className="main-cards">
          {cardData.map((card, idx) => (
            <div className="main-card" key={idx}>
              <img src={card.img} alt="card icon" />
              <div className="main-card-title">{card.title}</div>
              <div className="main-card-desc">
                {card.desc}
              </div>
              <button
                className="main-card-btn"
                onClick={() => {
                  if (idx === 0) {
                    navigate('/channelanalysispage');
                  } else if (idx === 1) {
                    // 인사이트 확인하기 버튼 클릭 시 동작 (필요시 수정)
                  } else if (idx === 2) {
                    navigate('/reply_positive');
                  }
                }}
              >
                {idx === 0 && '바로 비교하기'}
                {idx === 1 && '인사이트 확인하기'}
                {idx === 2 && '댓글 분석하기'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}