'use client';

import React from 'react';
import useTradingViewChart from '@/hooks/useTradingViewChart';
import BinanceRealtime from '@/components/BinanceRealtime';

export default function Home() {
  useTradingViewChart('tradingview-container', {
    symbol: 'BINANCE:BTCUSDT',
    theme: 'dark',
    interval: '1',
    height: '800',
  });

  return (
    <div className="flex min-h-screen bg-gray-900 p-4">
      <div className="flex-1 mr-4">
        <div className="bg-gray-800 rounded-lg p-4 h-full">
          <h2 className="text-xl font-bold text-white mb-4">실시간 차트</h2>
          <div id="tradingview-container" className="w-full h-[800px]" />
        </div>
      </div>

      <div className="w-96">
        <BinanceRealtime />
      </div>
    </div>
  );
}
