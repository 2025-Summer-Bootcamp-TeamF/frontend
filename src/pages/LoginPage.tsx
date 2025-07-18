// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import youtubeLogo from '../assets/youtube.png';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      background: '#0a0607',
      color: '#fff',
      fontFamily: 'Roboto, sans-serif',
    }}>
      <style>{`
        .login-left {
          flex: 1.15 1.15 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          border-radius: 28px;
          margin: 24px;
          /* 그라데이션에서 검은색(#111) 영역을 더 넓게 조정 */
          background: linear-gradient(135deg, #e52d27 0%, #e52d27 35%, #111 65%, #111 100%);
          box-shadow: 0 0 24px 2px #e52d27a0;
          overflow: hidden;
        }
        .login-left-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .login-back {
          position: absolute;
          top: 18px;
          left: 32px;
          font-size: 2.8rem;
          color: #fff;
          opacity: 0.9;
          cursor: pointer;
          z-index: 2;
          user-select: none;
        }
        .login-left-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          padding: 48px 48px 0 48px;
          margin-top: 180px;
        }
        .login-left .login-desc1 {
          font-size: 1.3rem;
          color: #e0e0e0;
          opacity: 0.7;
          margin-bottom: 12px;
        }
        .login-left .login-desc2 {
          font-size: 3.2rem;
          font-weight: 500;
          line-height: 1.13;
          color: #fff;
          opacity: 0.92;
          margin-bottom: 0;
        }
        .login-left-logo {
          position: absolute;
          right: 36px;
          bottom: 36px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .login-left-logo img {
          height: 38px;
        }
        .login-left-logo span {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -1px;
        }
        .login-right {
          flex: 0.85 0.85 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 7vw;
        }
        .login-title, .login-desc, .login-label, .login-btn {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .login-title {
          font-size: 3.7rem;
          font-weight: 500;
          margin-bottom: 4px; /* 간격 더 좁힘 */
        }
        .login-desc {
          font-size: 1.25rem;
          color: #bdbdbd;
          margin-bottom: 14px; /* 간격 더 좁힘 */
          margin-top: -6px; /* 위로 올림 */
        }
        .login-label {
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 8px;
          margin-top: 38px; /* 위쪽 여백 추가로 아래로 내림 */
        }
        .login-btn {
          width: 100%;
          max-width: 740px; /* 기존 700px에서 약간 늘림 */
          background: #ff0000;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 1.35rem;
          font-weight: 500;
          padding: 12px 0 12px 0;
          margin-top: 12px; /* label과 버튼 사이 간격을 조금 더 넓힘 */
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:hover {
          background: #b31217;
        }
        @media (max-width: 900px) {
          .login-left-content { padding: 32px 18px 0 18px; margin-top: 90px; }
          .login-right { padding: 0 3vw; }
          .login-title { font-size: 2.6rem; }
          .login-left .login-desc2 { font-size: 2.1rem; }
          .login-back { top: 10px; }
          .login-btn { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .login-left, .login-right { flex: 1 1 100%; min-width: 0; }
          .login-left { margin: 8px; border-radius: 12px; }
          .login-left-content { padding: 18px 8px 0 8px; margin-top: 36px; }
          .login-right { padding: 0 8px; }
          .login-title { font-size: 1.6rem; }
          .login-left .login-desc2 { font-size: 1.1rem; }
          .login-left-logo img { height: 22px; }
          .login-left-logo span { font-size: 1.1rem; }
          .login-back { top: 6px; }
          .login-btn { max-width: 100%; }
        }
      `}</style>
      {/* 좌측 카드 */}
      <div className="login-left">
        <div className="login-back" onClick={() => navigate('/')}>{'\u2190'}</div>
        <div className="login-left-header" style={{marginTop: 64}}>
          {/* 뒤로가기 버튼 아래에 글자가 오도록 marginTop 조정 */}
          <div className="login-left-content" style={{marginTop: 0}}>
            <div className="login-desc1">You can easily</div>
            <div className="login-desc2">
              Speed up your work<br />with our service
            </div>
          </div>
        </div>
        <div className="login-left-logo">
          <img src={youtubeLogo} alt="YouTube" />
          <span>YouTube</span>
        </div>
      </div>
      {/* 우측 폼 */}
      <div className="login-right">
        <div>
          <div className="login-title">Get Started Now</div>
          <div className="login-desc">Please log in to your account to continue.</div>
          <div className="login-label">YouTube Account</div>
          <button
            className="login-btn"
            onClick={() => navigate('/mainpage_login')}
          >
            Continue with YouTube
          </button>
        </div>
      </div>
    </div>
  );
}