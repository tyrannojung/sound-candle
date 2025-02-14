// 'use client';

// import React, { useEffect, useState } from 'react';
// import useBinanceSocket from '@/store/useBinanceStore';
// import { BinanceTradeData } from '@/types/binance';

// export default function BinanceRealtime() {
//   const latestTrade = useBinanceSocket((state) => state.tradeData); // ✅ Zustand에서 최신 1개만 가져옴
//   const [tradeHistory, setTradeHistory] = useState<BinanceTradeData[]>([]); // ✅ 배열 관리

//   // ✅ Zustand에서 최신 데이터가 변경될 때, 배열에 추가 (최근 10개 유지)
//   useEffect(() => {
//     if (latestTrade) {
//       setTradeHistory((prevTrades) => [latestTrade, ...prevTrades].slice(0, 10));
//     }
//   }, [latestTrade]);

//   const getPriceDirection = (currentTrade: Trade, index: number): 'up' | 'down' | 'neutral' => {
//     if (index === 0 && tradeHistory.length > 1) {
//       const secondTrade = tradeHistory[1];
//       if (!secondTrade) return 'neutral';
//       if (currentTrade.price > secondTrade.price) return 'up';
//       if (currentTrade.price < secondTrade.price) return 'down';
//     } else if (index > 0) {
//       const nextTrade = tradeHistory[index + 1];
//       if (!nextTrade) return 'neutral';
//       if (currentTrade.price > nextTrade.price) return 'up';
//       if (currentTrade.price < nextTrade.price) return 'down';
//     }
//     return 'neutral';
//   };

//   // 최신 항목(첫 번째)일 때만 색상 강조
//   const getTextColor = (direction: 'up' | 'down' | 'neutral', isLatest: boolean): string => {
//     if (!isLatest) return 'text-[#191F28]/80';
//     switch (direction) {
//       case 'up':
//         return 'text-green-500';
//       case 'down':
//         return 'text-red-500';
//       default:
//         return 'text-[#191F28]';
//     }
//   };

//   return (
//     <div className="w-full h-full overflow-y-auto rounded-lg border border-[#E5E7EB] bg-white">
//       <table className="w-full table-fixed text-left text-sm text-[#191F28]">
//         <thead className="bg-[#F9FAFB] sticky top-0">
//           <tr>
//             <th className="py-3 px-4 font-semibold text-[#191F28] w-1/3">거래 ID</th>
//             <th className="py-3 px-4 font-semibold text-[#191F28] w-1/3">가격 (BTC)</th>
//             <th className="py-3 px-4 font-semibold text-[#191F28] w-1/4">수량</th>
//             <th className="py-3 px-4 font-semibold text-[#191F28] w-1/4">시간</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tradeHistory.map((trade, idx) => {
//             const direction = getPriceDirection(trade, idx);
//             const textColor = getTextColor(direction, idx === 0);
//             return (
//               <tr key={trade.tradeId} className="border-b last:border-b-0 hover:bg-[#F9FAFB]/50 transition-colors">
//                 <td className="py-3 px-4">{trade.tradeId}</td>
//                 <td className={`py-3 px-4 font-semibold ${textColor}`}>{trade.price.toFixed(2)}</td>
//                 <td className="py-3 px-4">{trade.quantity.toFixed(6)}</td>
//                 <td className="py-3 px-4 text-[#191F28]/60">{trade.tradeTime}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
