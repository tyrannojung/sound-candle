'use client';

import React from 'react';
import useTradingViewChart from '@/hooks/useTradingViewChart';

export default function Home() {
  // 훅 사용 예시
  useTradingViewChart('tradingview-container', {
    symbol: 'BINANCE:BTCUSDT', // BTC 아닌 ETH
    theme: 'dark',
    interval: '1',
    height: '600',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold">트레이딩뷰 차트</h1>
        <p className="mt-2 text-gray-700">✅ TradingView 위젯이 렌더링됩니다.</p>
        <div id="tradingview-container" className="mt-4 w-full h-[600px]" />
      </div>
    </div>
  );
}
