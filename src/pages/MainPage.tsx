// src/pages/MainPage.tsx
import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
import screenshot from '../assets/screenshot.png'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">

      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center top, rgba(229,45,39,0.8) 0%, transparent 60%)'
        }}
      />

      {/* Header (투명, 글자 키우기) */}
      <header className="fixed inset-x-0 top-8 h-16 bg-transparent flex items-center z-50">
        <div className="container mx-auto flex items-center justify-between space-x-8">
          {/* 로고 -> 홈으로 이동 */}
          <Link to="/">
            <img src={logo} alt="YouTube" className="w-36" />
          </Link>

          {/* 내비 */}
          <nav className="mr-28 flex space-x-10 bg-white/13 backdrop-blur px-5 py-4 rounded-full">
            <Link to="/chat" className="ml-2 text-xl font-medium hover:text-red-500 transition">
              Chat
            </Link>
            <Link to="/account" className="text-xl font-medium hover:text-red-500 transition">
              My Account
            </Link>
            <Link to="/Insights" className="mr-2 text-xl font-medium hover:text-red-500 transition">
              Insights
            </Link>
          </nav>

          {/* 로그인 */}
          <Link to="/login"
            className="text-2xl font-semibold hover:text-red-500 transition"
          >
            Login →
          </Link>
        </div>
      </header>

      {/* Hero (위치 더 올리고, 글자 키우기) */}
      <section className="pt-16 h-screen flex items-center justify-center z-10 relative">
        <div className="text-center px-4 -mt-65"> {/* -mt-8 으로 위로 살짝 */}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Automate smarter.<br />
            Work faster.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
            복잡한 반복 작업은 자동화에 맡기고, 중요한 일에 집중하세요.<br />
            누구나 쉽게 만들 수 있는 시각화 기반 워크플로우로 업무 속도를 높여보세요.
          </p>
        </div>
      </section>

      {/* Preview (크기 더 늘리고, 텍스트 아래 배치) */}
      <section className="relative -mt-80 flex justify-center overflow-hidden z-20 h-80">
        <img
          src={screenshot}
          alt="서비스 화면 예시"
          className="w-full max-w-4xl h-full object-cover object-top"  /* hero 텍스트 바로 아래로 */
        />
      </section>
    </div>
  )
}