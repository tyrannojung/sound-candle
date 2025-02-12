import React from 'react';
import classNames from 'classnames';
import { SentimentValue } from '@/constants/feargreedindex';

// 감정별 아이콘 정의
const SENTIMENT_ICONS = {
  'Extreme Fear': '😱',
  Fear: '😨',
  Neutral: '😐',
  Greed: '😏',
  'Extreme Greed': '😈',
} as const;

// 배경색 그라데이션 (Tailwind CSS)
const SENTIMENT_GRADIENTS = {
  'Extreme Fear': 'bg-gradient-to-r from-red-500 to-red-800',
  Fear: 'bg-gradient-to-r from-orange-500 to-orange-700',
  Neutral: 'bg-gradient-to-r from-gray-500 to-gray-700',
  Greed: 'bg-gradient-to-r from-green-500 to-green-700',
  'Extreme Greed': 'bg-gradient-to-r from-emerald-500 to-emerald-700',
} as const;

// 감정별 애니메이션 효과
const SENTIMENT_ANIMATIONS = {
  'Extreme Fear': 'animate-shake',
  Fear: 'animate-wiggle',
  Neutral: 'animate-fade',
  Greed: 'animate-pulse',
  'Extreme Greed': 'animate-glow',
} as const;

interface Props {
  sentiment: SentimentValue | null;
  sentimentValue: string;
}

export default function FearGreedIndicator({ sentiment, sentimentValue }: Props) {
  const [isAnimating, setIsAnimating] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!sentiment) return null;

  return (
    <div
      className={classNames(
        'rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4 transition-all duration-300',
        {
          'text-white': isAnimating,
          [SENTIMENT_GRADIENTS[sentiment]]: isAnimating,
          [SENTIMENT_ANIMATIONS[sentiment]]: isAnimating,
          'bg-white text-gray-800': !isAnimating,
        },
      )}
    >
      <span className="text-5xl">{SENTIMENT_ICONS[sentiment]}</span>
      <p className="text-lg font-bold">{sentiment}</p>
      <div className="text-4xl font-extrabold">{sentimentValue}</div>
    </div>
  );
}
