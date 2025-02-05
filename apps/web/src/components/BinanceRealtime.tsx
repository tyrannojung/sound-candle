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

  const getBorderColor = (direction: 'up' | 'down' | 'neutral'): string => {
    switch (direction) {
      case 'up':
        return 'border-green-500';
      case 'down':
        return 'border-red-500';
      default:
        return 'border-gray-700';
    }
  };

  const getTextColor = (direction: 'up' | 'down' | 'neutral', isLatest: boolean): string => {
    if (!isLatest) return 'text-gray-300';

    switch (direction) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">실시간 거래</h2>
      <div className="space-y-3 overflow-auto">
        {tradeData.map((trade, idx) => {
          const priceDirection = getPriceDirection(trade, idx);
          const borderColor = getBorderColor(priceDirection);
          const textColor = getTextColor(priceDirection, idx === 0);

          return (
            <div
              key={trade.tradeId}
              className={`rounded-lg p-4 border transition-colors duration-300 
                hover:bg-gray-700 ${borderColor}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-semibold text-lg ${textColor}`}>{trade.price.toFixed(2)}</span>
                <span className="text-gray-400 text-sm">{trade.tradeTime}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">수량: {trade.quantity.toFixed(6)} BTC</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
