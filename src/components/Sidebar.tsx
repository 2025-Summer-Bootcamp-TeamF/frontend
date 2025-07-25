import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="fixed left-0 top-0 h-full flex flex-col items-center z-50 bg-black"
      style={{ width: "6vw" }}
    >
      <div style={{ marginTop: "2.94vh", marginBottom: "24px" }}>
        <img
          src="/logo.png"
          alt="Logo"
          className="w-auto h-auto cursor-pointer"
          onClick={() => navigate("/main")}
        />
      </div>
      <button className="p-3 rounded-lg transition-all mb-4 group">
        <img
          src="/mypagelogo.png"
          alt="My Page"
          className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all"
          onClick={() => navigate("/my")}
        />
      </button>
      <button className="p-3 rounded-lg transition-all mb-4 group">
        <img
          src="/insight.png"
          alt="Insight"
          className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all"
          onClick={() => navigate("/in")}
        />
      </button>
      <button className="p-3 rounded-lg transition-all group">
        <img
          src="/analysis.png"
          alt="Analysis"
          className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all"
          onClick={() => navigate("/category")}
        />
      </button>
    </div>
  );
};

export default Sidebar; 