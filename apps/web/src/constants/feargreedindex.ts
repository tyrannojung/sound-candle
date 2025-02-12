export const MARKET_SENTIMENT = {
  EXTREME_FEAR: 'Extreme Fear',
  FEAR: 'Fear',
  NEUTRAL: 'Neutral',
  GREED: 'Greed',
  EXTREME_GREED: 'Extreme Greed',
} as const;

// 타입 정의
export type SentimentValue = (typeof MARKET_SENTIMENT)[keyof typeof MARKET_SENTIMENT];
