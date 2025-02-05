// hooks/useTradingViewChart.ts

'use client';

import { useEffect } from 'react';
import { TradingViewChartOptions } from '@/types/tradingView';
import DEFAULT_TRADINGVIEW_OPTIONS from '@/constants/tradingView';

function useTradingViewChart(containerId: string, userOptions?: TradingViewChartOptions) {
  useEffect(() => {
    // 이미 스크립트가 로드되어 있다면 재삽입하지 않음
    if (document.getElementById('tradingview-script')) {
      return () => {};
    }

    // 스크립트 태그 생성
    const script = document.createElement('script');
    script.id = 'tradingview-script';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // 실제로 트레이딩뷰 위젯 설정할 JSON
    const mergedOptions: TradingViewChartOptions = {
      ...DEFAULT_TRADINGVIEW_OPTIONS,
      ...userOptions,
    };

    script.innerHTML = JSON.stringify(mergedOptions);

    // 컨테이너에 스크립트 삽입
    document.getElementById(containerId)?.appendChild(script);

    // Optional: cleanup
    return () => {
      // 태그 제거 등 정리 로직
    };
  }, [containerId, userOptions]);
}

export default useTradingViewChart;
