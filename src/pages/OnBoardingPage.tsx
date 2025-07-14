import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss";

const SECTIONS = [
  {
    title: "업무 흐름을 설계하고,\n자동으로 운영하세요.",
    description:
      "댓글 분석, 업로드 알림, 콘텐츠 힌트 추출까지\n자동화된 워크플로우로 채널 운영을 가볍게",
    align: "left",
  },
  {
    title: "매일 반복하던 3시간짜리\n작업이 단 5분으로.",
    description:
      "댓글 분석, 콘텐츠 정리, 일정 관리까지 자동으로 처리해요.\n이제 진짜 중요한 일에만 집중하세요.",
    align: "right",
  },
  {
    title: "수고는 줄이고, 일은 그대로.",
    description:
      "귀찮고 지루했던 작업, 이제는 버튼 한 번이면 끝.\n진짜 필요한 일에 에너지를 써보세요.",
    align: "center",
  },
  {
    title: "모든 준비가 끝났어요.\n이제 직접 시작해보세요.",
    isFinal: true,
    align: "center",
  },
];

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollLock, setScrollLock] = useState(false);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (event: WheelEvent) => {
    if (scrollLock) {
      event.preventDefault();
      return;
    }

    if (event.deltaY > 0 && currentSection < SECTIONS.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }

    setScrollLock(true);
    setTimeout(() => setScrollLock(false), 800);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSection, scrollLock]);

  useEffect(() => {
    scrollToSection(currentSection);
  }, [currentSection]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 도트 */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {SECTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              currentSection === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* 섹션들 */}
      <div className="h-screen w-full snap-y snap-mandatory overflow-hidden">
        {SECTIONS.map((section, index) => {
          const alignment =
            section.align === "left"
              ? "items-start text-left"
              : section.align === "right"
              ? "items-end text-right"
              : "items-center text-center";

          return (
            <section
              key={index}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
              className={`snap-start w-full h-screen flex justify-center items-center px-6 bg-black text-white`}
            >
              <div
                className={`flex flex-col max-w-[960px] w-full ${alignment}`}
              >
                <h1 className="text-[28px] md:text-[48px] font-bold whitespace-pre-line leading-snug mb-4">
                  {section.title}
                </h1>

                {section.description && (
                  <p className="text-[16px] md:text-[18px] font-light whitespace-pre-line leading-relaxed">
                    {section.description}
                  </p>
                )}

                {section.isFinal && (
                  <button
                    onClick={() => navigate("/main")}
                    className="mt-10 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-md transition"
                  >
                    🔥 나만의 워크플로우 생성하러 가기
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default OnBoardingPage;
