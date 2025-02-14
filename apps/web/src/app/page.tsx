'use client';

import React, { useEffect, useState } from 'react';
import useTradingViewChart from '@/hooks/useTradingViewChart';
// import BinanceRealtime from '@/components/BinanceRealtime';
import BinanceMAWatcher from '@/components/BinanceMAWatcher';
import { SentimentValue } from '@/constants/feargreedindex';
import FearGreedIndicator from '@/components/FearGreedIndicator';
import { initializeBinanceWebSocket, fetchInitialKlineData } from '@/utils/socket';

export default function Home() {
  const [sentiment, setSentiment] = useState<SentimentValue | null>(null);
  const [sentimentValue, setSentimentValue] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // 차트 초기화
  useTradingViewChart('tradingview-container', {
    symbol: 'BINANCE:BTCUSDT',
    theme: 'light',
    interval: '1',
    height: '500',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.alternative.me/fng/?limit=1&format=json');
        const data = await response.json();
        setSentiment(data.data[0].value_classification);
        setSentimentValue(data.data[0].value);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    fetchInitialKlineData();

    // 함수를 전달한다. 함수명 보내는거고 () =>
    const cleanup = initializeBinanceWebSocket();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB] overflow-x-hidden">
      {/* 전체 컨테이너: 최대 너비 7xl, 가운데 정렬, 좌우 padding */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 페이지 헤더 */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-[#191F28]">Sound Candle</h1>
            <span className="px-3 py-1 text-sm font-medium text-[#3182f6] bg-[#3182f6]/10 rounded-full">Beta</span>
          </div>
          <p className="text-lg text-[#191F28]/80 max-w-2xl leading-relaxed">
            비트코인 차트가 들려주는 음악을 경험해보세요...
          </p>
        </header>
        {/* 본문 영역 (그리드) */}
        <div className="grid grid-cols-12 gap-6">
          {/* 차트 영역: 작은 화면에서는 전체 폭(col-span-12), md 이상에서는 col-span-8 */}
          <div className="col-span-12 md:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#191F28] mb-4">BTC/USDT 차트</h2>
              <div id="tradingview-container" className="w-full h-[500px]" />
            </div>
          </div>

          {/* 실시간 거래내역 영역: 작은 화면에서는 전체 폭, md 이상에서는 col-span-4 */}
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-6 h-full">
              <h2 className="text-xl font-semibold text-[#191F28] mb-4">실시간 거래 내역</h2>
              <div className="h-[500px]">{/* <BinanceRealtime /> */}</div>
            </div>
          </div>

          {/* 음악 컨트롤 섹션 */}
          {/* 음악 컨트롤 섹션과 탐욕 지수 섹션을 감싸는 컨테이너 */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 🎵 시장 뮤직 플레이어 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold text-[#191F28]">시장 뮤직 플레이어</h2>
                <p className="text-[#3182f6] font-medium mt-1 mb-6">현재 재생중: 상승장 테마</p>
                <button
                  type="button"
                  aria-label="음악 재생"
                  className="w-16 h-16 rounded-full bg-[#3182f6] hover:bg-[#2970d6] 
                  transition-colors flex items-center justify-center text-white 
                  shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 📊 Fear & Greed Index */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold text-[#191F28] mb-4">탐욕 & 공포 지수</h2>
              {loading ? (
                <p className="text-center text-gray-500">데이터 로딩 중...</p>
              ) : (
                <FearGreedIndicator sentiment={sentiment} sentimentValue={sentimentValue} />
              )}
            </div>

            {/* 📈 이동평균선 분석 */}
            <BinanceMAWatcher />
          </div>

          {/* 추가 정보 섹션 */}
          <div className="col-span-12">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#191F28] mb-4">주요 기능</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-[#3182f6]">실시간 차트 시각화</h3>
                  <p className="text-[#191F28]/80">
                    이동평균선을 기반으로 시장의 흐름을 분석하고 실시간으로 변화를 반영합니다
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-[#3182f6]">동적 음악 변환</h3>
                  <p className="text-[#191F28]/80">
                    상승장에서는 경쾌한 멜로디, 하락장에서는 차분한 음악으로 자동 전환됩니다
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-[#3182f6]">감정적 효과음</h3>
                  <p className="text-[#191F28]/80">
                    급격한 시장 변화를 효과음으로 강조하여 더욱 직관적인 시장 이해를 돕습니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* grid end */}
      </div>
      {/* max-w-7xl container end */}
    </div> // 전체 페이지 배경
  );
}
