import { create } from 'zustand';
import { BinanceTradeResponse, BinanceKlineResponse, BinanceTradeData, MaCandleData } from '@/types/binance';

interface BinanceStore {
  tradeData: BinanceTradeData | null;
  maData: MaCandleData | null;

  updateTradeData: (data: BinanceTradeResponse) => void;
  updateKlineData: (data: BinanceKlineResponse) => void;
}

const useBinanceSocket = create<BinanceStore>((set) => ({
  tradeData: null,
  maData: { ma15: null, ma50: null },

  updateTradeData: (data: BinanceTradeResponse) =>
    set({
      tradeData: {
        tradeId: data.t.toString(),
        price: parseFloat(data.p),
        quantity: parseFloat(data.q),
        tradeTime: new Date(data.T).toLocaleTimeString(),
      },
    }),

  updateKlineData: (data: BinanceKlineResponse) =>
    set((state) => {
      const newClose = parseFloat(data.k.c);
      const prevMA = state.maData ?? { ma15: newClose, ma50: newClose };

      return {
        maData: {
          ma15: prevMA.ma15 !== null ? (prevMA.ma15 * 14 + newClose) / 15 : newClose,
          ma50: prevMA.ma50 !== null ? (prevMA.ma50 * 49 + newClose) / 50 : newClose,
        },
      };
    }),
}));

export default useBinanceSocket;
