// constants/tradingView.ts
import { TradingViewChartOptions } from '@/types/tradingView';

const DEFAULT_TRADINGVIEW_OPTIONS: TradingViewChartOptions = {
  symbol: 'BINANCE:BTCUSDT',
  theme: 'light',
  width: '100%',
  height: '500',
  interval: '1',
  timezone: 'Asia/Seoul',
  style: '3',
  locale: 'ko',
  toolbar_bg: '#f1f3f6',
  enable_publishing: false,
  hide_top_toolbar: true,
  allow_symbol_change: false,
};

export default DEFAULT_TRADINGVIEW_OPTIONS;
