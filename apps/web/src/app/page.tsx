'use client';

import React from 'react';
import useTradingViewChart from '@/hooks/useTradingViewChart';
import BinanceRealtime from '@/components/BinanceRealtime';

export default function Home() {
  // 차트 초기화
  useTradingViewChart('tradingview-container', {
    symbol: 'BINANCE:BTCUSDT',
    theme: 'light',
    interval: '1',
    height: '500',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB] overflow-x-hidden">
      {/* 전체 컨테이너: 최대 너비 7xl, 가운데 정렬, 좌우 padding */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 페이지 헤더 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#191F28] mb-3">Sound Candle</h1>
          <p className="text-lg text-[#191F28]/80 max-w-2xl leading-relaxed">
            비트코인 차트가 들려주는 음악을 경험해보세요. 시장의 흐름이 음악으로 표현되어 새로운 방식으로 시장을 이해할
            수 있습니다.
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
              <div className="h-[500px]">
                <BinanceRealtime />
              </div>
            </div>
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
