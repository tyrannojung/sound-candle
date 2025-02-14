import { BinanceTradeResponse, BinanceKlineResponse, BinanceKlineData } from '@/types/binance';
import useBinanceSocket from '@/store/useBinanceStore';

export const initializeBinanceWebSocket = () => {
  const tradeSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
  const klineSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

  console.log('연결 한번만 되니?');

  tradeSocket.onmessage = (event) => {
    const data: BinanceTradeResponse = JSON.parse(event.data);
    useBinanceSocket.getState().updateTradeData(data);
  };

  klineSocket.onmessage = (event) => {
    const data: BinanceKlineResponse = JSON.parse(event.data);
    useBinanceSocket.getState().updateKlineData(data);
  };

  return () => {
    tradeSocket.close();
    klineSocket.close();
  };
};

export const fetchInitialKlineData = async () => {
  try {
    const response = await fetch('https://dapi.binance.com/dapi/v1/klines?symbol=BTCUSD_PERP&interval=1m&limit=50');
    const data: BinanceKlineData[] = await response.json();

    // 종가(Closing Price) 값만 추출하여 MA15, MA50 계산
    const closingPrices: number[] = data.map((candle) => parseFloat(candle[4]));

    const ma15: number = closingPrices.slice(-15).reduce((sum, price) => sum + price, 0) / 15;
    const ma50: number = closingPrices.slice(-50).reduce((sum, price) => sum + price, 0) / 50;

    // Zustand Store에 저장
    useBinanceSocket.setState({ maData: { ma15, ma50 } });

    console.log(`📊 초기 MA 데이터 설정: MA15=${ma15.toFixed(2)}, MA50=${ma50.toFixed(2)}`);
  } catch (error) {
    console.error('🚨 초기 MA 데이터 가져오기 실패:', error);
  }
};
