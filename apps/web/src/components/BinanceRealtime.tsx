'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Trade {
  tradeId: string;
  price: number;
  quantity: number;
  tradeTime: string;
}

export default function BinanceRealtime() {
  const [tradeData, setTradeData] = useState<Trade[]>([]);
  const prevPriceRef = useRef<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newTrade: Trade = {
        tradeId: data.t.toString(),
        price: parseFloat(data.p),
        quantity: parseFloat(data.q),
        tradeTime: new Date(data.T).toLocaleTimeString(),
      };

      setTradeData((prev) => {
        const updated = [newTrade, ...prev];
        return updated.slice(0, 10);
      });

      prevPriceRef.current = newTrade.price;
    };

    return () => socket.close();
  }, []);

  const getPriceDirection = (currentTrade: Trade, index: number): 'up' | 'down' | 'neutral' => {
    if (index === 0 && tradeData.length > 1) {
      const secondTrade = tradeData[1];
      if (!secondTrade) return 'neutral';
      if (currentTrade.price > secondTrade.price) return 'up';
      if (currentTrade.price < secondTrade.price) return 'down';
    } else if (index > 0) {
      const nextTrade = tradeData[index + 1];
      if (!nextTrade) return 'neutral';
      if (currentTrade.price > nextTrade.price) return 'up';
      if (currentTrade.price < nextTrade.price) return 'down';
    }
    return 'neutral';
  };

  // 최신 항목(첫 번째)일 때만 색상 강조
  const getTextColor = (direction: 'up' | 'down' | 'neutral', isLatest: boolean): string => {
    if (!isLatest) return 'text-[#191F28]/80';
    switch (direction) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-[#191F28]';
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto rounded-lg border border-[#E5E7EB] bg-white">
      <table className="w-full table-fixed text-left text-sm text-[#191F28]">
        <thead className="bg-[#F9FAFB] sticky top-0">
          <tr>
            <th className="py-3 px-4 font-semibold text-[#191F28] w-1/3">거래 ID</th>
            <th className="py-3 px-4 font-semibold text-[#191F28] w-1/3">가격 (BTC)</th>
            <th className="py-3 px-4 font-semibold text-[#191F28] w-1/4">수량</th>
            <th className="py-3 px-4 font-semibold text-[#191F28] w-1/4">시간</th>
          </tr>
        </thead>
        <tbody>
          {tradeData.map((trade, idx) => {
            const direction = getPriceDirection(trade, idx);
            const textColor = getTextColor(direction, idx === 0);
            return (
              <tr key={trade.tradeId} className="border-b last:border-b-0 hover:bg-[#F9FAFB]/50 transition-colors">
                <td className="py-3 px-4">{trade.tradeId}</td>
                <td className={`py-3 px-4 font-semibold ${textColor}`}>{trade.price.toFixed(2)}</td>
                <td className="py-3 px-4">{trade.quantity.toFixed(6)}</td>
                <td className="py-3 px-4 text-[#191F28]/60">{trade.tradeTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
