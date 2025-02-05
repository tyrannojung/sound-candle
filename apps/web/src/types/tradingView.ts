// types/tradingView.ts
export interface TradingViewChartOptions {
    symbol?: string;
    theme?: 'light' | 'dark';
    width?: string | number;
    height?: string | number;
    interval?: string; // 차타의 기본 시간 프레임 설정
    timezone?: string; // 차트의 시간대 설정
    style?: string; // 차트 스타일 설정 1 bars, 2 candles, 3 area
    locale?: string; // 차트 언어 설정
    toolbar_bg?: string; // 차트 툴바 배경색 설정
    enable_publishing?: boolean;
    hide_top_toolbar?: boolean; // 상단 툴바
    allow_symbol_change?: boolean; // 차트 종목 변경 가능 여부
}