import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 추출
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      navigate("/main", { replace: true });
    } else {
      // 토큰이 없으면 로그인 페이지로
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
} 