export interface BinanceTradeResponse {
    e: string;      // 이벤트 타입
    E: number;      // 이벤트 시간
    s: string;      // 심볼
    t: number;      // 거래 ID
    p: string;      // 가격
    q: string;      // 수량
    T: number;      // 거래 시간
}

export interface BinanceKlineResponse {
    e: string;      // 이벤트 타입
    E: number;      // 이벤트 시간
    s: string;      // 심볼
    k: {
        t: number;    // 캔들 시작 시간
        T: number;    // 캔들 종료 시간
        s: string;    // 심볼
        i: string;    // 인터벌
        o: string;    // 시가
        h: string;    // 고가
        l: string;    // 저가
        c: string;    // 종가
        v: string;    // 거래량
        x: boolean;   // 캔들 완성 여부
    }
}

// 과거 캔들 데이터 데이터 타입
export type BinanceKlineData = [
    number, // Open time
    string, // Open
    string, // High
    string, // Low
    string, // Close (or latest price)
    string, // Volume
    number, // Close time
    string, // Base asset volume
    number, // Number of trades
    string, // Taker buy volume
    string, // Taker buy base asset volume
    string  // Ignore
];


export interface BinanceTradeData {
    tradeId: string;
    price: number;
    quantity: number;
    tradeTime: string;
}

export interface MaCandleData {
    ma15: number | null;
    ma50: number | null;
}