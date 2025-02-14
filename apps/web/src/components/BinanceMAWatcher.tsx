'use client';

import React from 'react';
import { useBinanceStore } from '@/hooks/useBinanceStore';

export default function BinanceMAWatcher() {
  const ma15 = useBinanceStore((state) => state.ma15);
  const ma50 = useBinanceStore((state) => state.ma50);
  const currentPrice = useBinanceStore((state) => state.currentPrice);

  // 📍 현재 가격 위치 메시지 계산
  const getPositionMessage = () => {
    if (ma15 === null || ma50 === null || currentPrice === null) {
      return '📍 현재 가격 위치: 계산 중...';
    }

    if (currentPrice > ma15 && currentPrice > ma50) {
      return `📍 현재 가격(${currentPrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) & MA50(${ma50.toFixed(2)}) 위에 있음`;
    }
    if (currentPrice > ma15 && currentPrice < ma50) {
      return `📍 현재 가격(${currentPrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) 위, MA50(${ma50.toFixed(2)}) 아래에 있음`;
    }
    if (currentPrice < ma15 && currentPrice > ma50) {
      return `📍 현재 가격(${currentPrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) 아래, MA50(${ma50.toFixed(2)}) 위에 있음`;
    }
    return `📍 현재 가격(${currentPrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) & MA50(${ma50.toFixed(2)}) 아래에 있음`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
      {/* 📊 중앙 정렬된 타이틀 */}
      <h2 className="text-2xl font-semibold text-[#191F28] mb-4">이동평균선 MA 15, 50</h2>

      {/* 📈 MA15 & MA50 정보 */}
      <div className="mb-4">
        <p className="text-lg font-medium text-[#3182f6]">🔹 MA15: {ma15?.toFixed(2) || '계산 중...'}</p>
        <p className="text-lg font-medium text-[#ff6b6b]">🔹 MA50: {ma50?.toFixed(2) || '계산 중...'}</p>
      </div>

      {/* 📍 현재 가격 위치 */}
      <p className="text-lg font-semibold text-[#191F28]">{getPositionMessage()}</p>
    </div>
  );
}
