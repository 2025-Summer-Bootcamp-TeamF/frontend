import React, { useState } from 'react';

interface ChannelSnapshotTestProps {
  channelId: number;
}

const ChannelSnapshotTest: React.FC<ChannelSnapshotTestProps> = ({ channelId }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const saveChannelSnapshot = async () => {
    setLoading(true);
    setResult('');

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setResult("토큰이 없습니다. 로그인해주세요.");
        return;
      }
      
      console.log("요청 시작:", `http://localhost:8000/api/channel/snapshot`);
      console.log("토큰:", token.substring(0, 20) + "...");
      console.log("채널 스냅샷 저장 API 호출됨");
      
      const response = await fetch(`http://localhost:8000/api/channel/snapshot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          subscriber: 100000,
          total_videos: 50,
          total_view: 5000000,
          channel_created: "2023-01-01",
          daily_view: 10000,
          average_view: 100000,
          nation: "KR"
        })
      });

      console.log("응답 상태:", response.status);
      console.log("응답 헤더:", response.headers);

      const data = await response.json();
      console.log("응답 데이터:", data);
      
      if (response.ok) {
        setResult(`성공! 저장된 데이터: ${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`실패 (${response.status}): ${data.message || data.error || JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error saving channel snapshot:', error);
      setResult(`에러: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Channel Snapshot 테스트</h2>
      <button
        onClick={saveChannelSnapshot}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {loading ? "저장 중..." : "Channel Snapshot 저장"}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-700 rounded">
          <h3 className="font-bold mb-2">결과:</h3>
          <pre className="text-sm overflow-auto">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default ChannelSnapshotTest; 