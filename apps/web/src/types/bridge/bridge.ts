export interface BridgeTest {
  testType: string;
  network: string;
  fromToken: string;
  toToken: string;
  duration: number;
  gasCostText: string;
  detailsVisible: boolean;
  error: string;
  timestamp: string;
}
