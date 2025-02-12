'use client';

import React, { useEffect, useState, useRef } from 'react';

interface KlineData {
  time: number;
  close: number;
}

export default function BinanceMAWatcher() {
  const [klineData, setKlineData] = useState<KlineData[]>([]);
  const [ma15, setMa15] = useState<number | null>(null);
  const [ma50, setMa50] = useState<number | null>(null);
  const [, setCurrentPrice] = useState<number | null>(null);
  const pricePositionRef = useRef<string>('📍 현재 가격 위치: 계산 중...');

  // ✅ 1. 페이지 접속 시 과거 데이터 불러오기 (50개 캔들)
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=50');
        const data = await response.json();
        const historicalData: KlineData[] = data.map((d: any) => ({
          time: d[0],
          close: parseFloat(d[4]), // 종가 (Close)
        }));

        setKlineData(historicalData);
      } catch (error) {
        console.error('🚨 과거 1분봉 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchHistoricalData();
  }, []);

  // ✅ 2. 실시간 1분봉 데이터 추가 (웹소켓)
  useEffect(() => {
    const klineSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    klineSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const kline = data.k;
      if (!kline.x) return; // 캔들 종료 여부 확인

      const newKline: KlineData = {
        time: kline.t,
        close: parseFloat(kline.c),
      };

      setKlineData((prev) => {
        const updated = [...prev, newKline].slice(-50); // 50개 유지 (MA50 계산)
        return updated;
      });
    };

    return () => klineSocket.close();
  }, []);

  // ✅ 3. MA15 & MA50 계산
  useEffect(() => {
    if (klineData.length >= 50) {
      const last15 = klineData.slice(-15).map((d) => d.close);
      const last50 = klineData.map((d) => d.close);

      const ma15Value = last15.reduce((acc, val) => acc + val, 0) / 15;
      const ma50Value = last50.reduce((acc, val) => acc + val, 0) / 50;

      setMa15(ma15Value);
      setMa50(ma50Value);
    }
  }, [klineData]);

  // ✅ 4. 실시간 가격 감지 & 현재 가격 위치 계산
  useEffect(() => {
    const tradeSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    tradeSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const tradePrice = parseFloat(data.p);
      setCurrentPrice(tradePrice);

      if (ma15 !== null && ma50 !== null) {
        let positionMessage = '📍 현재 가격 위치: 계산 중...';

        if (tradePrice > ma15 && tradePrice > ma50) {
          positionMessage = `📍 현재 가격(${tradePrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) & MA50(${ma50.toFixed(2)}) 위에 있음`;
        } else if (tradePrice > ma15 && tradePrice < ma50) {
          positionMessage = `📍 현재 가격(${tradePrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) 위, MA50(${ma50.toFixed(2)}) 아래에 있음`;
        } else if (tradePrice < ma15 && tradePrice > ma50) {
          positionMessage = `📍 현재 가격(${tradePrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) 아래, MA50(${ma50.toFixed(2)}) 위에 있음`;
        } else if (tradePrice < ma15 && tradePrice < ma50) {
          positionMessage = `📍 현재 가격(${tradePrice.toFixed(2)})이 MA15(${ma15.toFixed(2)}) & MA50(${ma50.toFixed(2)}) 아래에 있음`;
        }

        pricePositionRef.current = positionMessage;
        console.log(positionMessage);
      }
    };

    return () => tradeSocket.close();
  }, [ma15, ma50]);

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
      <p className="text-lg font-semibold text-[#191F28]">{pricePositionRef.current}</p>
    </div>
  );
}
