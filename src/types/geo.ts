/**
 * TRISHUL Geo / Prediction Module Data Models & API Contracts
 * Based on TRISHUL Master Blueprint
 */

export type ForecastState = 'ABSTAIN' | 'MONITORING' | 'CONFIRMED';

export type TimeHorizonHours = 1 | 6 | 12 | 24 | 48;

export type RiskLevel = 'MONITORED' | 'ELEVATED' | 'CRITICAL';

export type GateStatus = 'OPEN' | 'GATE_RESTRICTED' | 'VERIFIED';

/**
 * Evidence Coverage Metrics
 */
export interface EvidenceCoverage {
  overallPercent: number;
  minRequiredPercent: number;
  isCoverageSufficient: boolean;
  verifiedFeaturesCount: number;
  totalFeaturesCount: number;
  featureBreakdown: {
    spatialSignals: number;
    temporalPattern: number;
    behavioralAnomalies: number;
    networkGraphLinkage: number;
  };
}

/**
 * Evidence Gate Status
 */
export interface EvidenceGateStatus {
  status: GateStatus;
  passedCount: number;
  requiredCount: number;
  blockingReasons: string[];
  lastEvaluatedAt: string;
}

/**
 * Exit Mode Status & Controls
 */
export interface ExitModeStatus {
  isActive: boolean;
  activatedAt?: string;
  activatedBy?: string;
  targetRadiusKm: number;
  protocolStatus: 'INACTIVE' | 'STANDBY' | 'ENGAGED' | 'LOCKDOWN';
  activeInterceptionsCount: number;
}

/**
 * Candidate Geo Location / Cash-Out Zone
 */
export interface CashOutZone {
  id: string;
  zoneCode: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  confidenceScore: number; // 0 - 100
  riskLevel: RiskLevel;
  cashVolumeEstimate: string;
  atmClusterDensity: 'SPARSE' | 'MODERATE' | 'HIGH' | 'CRITICAL_DENSITY';
  distanceKm: number;
  primarySignal: string;
}

/**
 * Geo Candidate details returned by candidate endpoint
 */
export interface GeoCandidate {
  id: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  relevanceScore: number; // 0 - 1.0
  historicalHitRate: number;
  tags: string[];
}

/**
 * Explainable Prediction Rationale
 */
export interface ExplainableReason {
  id: string;
  title: string;
  description: string;
  category: 'SPATIAL' | 'TEMPORAL' | 'BEHAVIORAL' | 'NETWORK';
  importanceWeight: number; // 0 - 100
  impact: 'POSITIVE' | 'NEUTRAL' | 'WARNING';
}

/**
 * Complete Forecast Data structure returned by backend
 */
export interface ForecastData {
  caseId: string;
  forecastId: string;
  state: ForecastState;
  stateReason: string;
  evidenceCoverage: EvidenceCoverage;
  evidenceGate: EvidenceGateStatus;
  exitMode: ExitModeStatus;
  selectedHorizon: TimeHorizonHours;
  topKCashOutZones: CashOutZone[];
  explainableReasons: ExplainableReason[];
  generatedAt: string;
  expiresAt: string;
}

/* ==========================================
 * API Request & Response Contracts
 * ========================================== */

// GET /cases/:id/geo-candidates
export interface GeoCandidatesResponse {
  caseId: string;
  candidates: GeoCandidate[];
  totalCandidates: number;
  timestamp: string;
}

// POST /cases/:id/exit-mode
export interface ExitModePayload {
  exitModeActive: boolean;
  targetRadiusKm?: number;
  reason?: string;
  activatedBy?: string;
}

export interface ExitModeResponse {
  caseId: string;
  exitModeActive: boolean;
  activatedAt: string;
  protocolStatus: 'INACTIVE' | 'STANDBY' | 'ENGAGED' | 'LOCKDOWN';
  message: string;
}

// POST /cases/:id/forecast
export interface ForecastRequestPayload {
  timeHorizonHours: TimeHorizonHours;
  minEvidenceCoverage?: number;
  topKLimit?: number;
}

export interface ForecastResponse {
  forecastId: string;
  caseId: string;
  status: 'SUCCESS' | 'ABSTAIN' | 'ERROR';
  forecastData: ForecastData;
}
