'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (document.getElementById('tradingview-script')) {
      return; // 이미 script가 있으면 추가하지 않음
    }

    const script = document.createElement('script');
    script.id = 'tradingview-script'; // script에 ID 추가
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: 'BINANCE:BTCUSDT',
      theme: 'light',
      width: '100%',
      height: '500',
      interval: '1',
      timezone: 'Asia/Seoul',
      style: '1',
      locale: 'ko',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_top_toolbar: false,
      allow_symbol_change: true,
    });

    document.getElementById('tradingview-container')?.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold">비트코인 차트</h1>
        <p className="mt-2 text-gray-700">✅ TradingView 무료 차트가 렌더링됩니다.</p>
        <div id="tradingview-container" className="mt-4 w-full h-[500px]" />
      </div>
    </div>
  );
}
