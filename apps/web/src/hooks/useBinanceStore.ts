import { create } from 'zustand';

// 🔹 상태 타입 정의
interface BinanceState {
  tradeData: {
    tradeId: string;
    price: number;
    quantity: number;
    tradeTime: string;
  }[];
  ma15: number | null;
  ma50: number | null;
  currentPrice: number | null;
  position: number;
  setTradeData: (trade: BinanceState['tradeData'][0]) => void;
  setCurrentPrice: (price: number) => void;
  setPosition: (position: number) => void;
}

// 🔹 Zustand Store 생성
export const useBinanceStore = create<BinanceState>((set) => ({
  tradeData: [],
  ma15: null,
  ma50: null,
  currentPrice: null,
  position: 0, // ✅ 기본값을 0으로 설정
  setTradeData: (trade) =>
    set((state) => ({
      tradeData: [trade, ...state.tradeData].slice(0, 10), // 최근 10개 유지
    })),
  setCurrentPrice: (price) => set(() => ({ currentPrice: price })),
  setPosition: (position) => set(() => ({ position })),
}));

// 🔹 WebSocket 초기화 함수 (앱에서 한 번만 실행)
export function initializeBinanceWebSocket() {
  const { setTradeData, setCurrentPrice, setPosition } = useBinanceStore.getState();

  // ✅ WebSocket 연결 (1회만 실행)
  const tradeSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
  const klineSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

  // 🔹 실시간 거래 데이터 수신
  tradeSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const newTrade = {
      tradeId: data.t.toString(),
      price: parseFloat(data.p),
      quantity: parseFloat(data.q),
      tradeTime: new Date(data.T).toLocaleTimeString(),
    };

    setTradeData(newTrade);
    setCurrentPrice(newTrade.price);
  };

  // 🔹 1분봉 MA15 & MA50 업데이트
  klineSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const kline = data.k;
    if (!kline.x) return; // 캔들 종료 여부 확인

    const newClose = parseFloat(kline.c);

    // ✅ MA15, MA50 업데이트 (setState 직접 사용)
    useBinanceStore.setState((state) => ({
      ma15: state.ma15 !== null ? (state.ma15 * 14 + newClose) / 15 : newClose,
      ma50: state.ma50 !== null ? (state.ma50 * 49 + newClose) / 50 : newClose,
    }));

    // 🔹 가격 위치 업데이트 (null 체크 추가)
    const { ma15, ma50, currentPrice } = useBinanceStore.getState();

    if (ma15 !== null && ma50 !== null && currentPrice !== null) {
      let newPosition: number = 0; // ✅ 기본값 0으로 설정

      if (currentPrice > ma15 && currentPrice > ma50) {
        newPosition = 1;
      } else if (currentPrice > ma15 && currentPrice < ma50) {
        newPosition = 2;
      } else if (currentPrice < ma15 && currentPrice > ma50) {
        newPosition = 3;
      } else if (currentPrice < ma15 && currentPrice < ma50) {
        newPosition = 4;
      }

      setPosition(newPosition); // ✅ 이제 newPosition은 항상 number 타입!
    }
  };

  return () => {
    tradeSocket.close();
    klineSocket.close();
  };
}
