export const SERVICES = {
  TOKAMAK_BRIDGE: 'tokamak-bridge',
  GEM_STON: 'gem-ston',
} as const;

export const DEFAULT_SERVICE = SERVICES.TOKAMAK_BRIDGE;
export type ServiceType = (typeof SERVICES)[keyof typeof SERVICES];
