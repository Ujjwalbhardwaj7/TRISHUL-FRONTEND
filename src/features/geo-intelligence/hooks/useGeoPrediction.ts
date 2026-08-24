import { useState, useCallback } from 'react';
import {
  ForecastData,
  TimeHorizonHours,
  ForecastState,
  GateStatus,
  CashOutZone,
} from '../../../types/geo';

const CASE_DATABASE: Record<string, ForecastData> = {
  'CASE-2026-8891': {
    caseId: 'CASE-2026-8891',
    forecastId: 'FC-8891-V4',
    state: 'MONITORING',
    stateReason: 'Sufficient spatial and temporal evidence gathered for observational monitoring.',
    evidenceCoverage: {
      overallPercent: 82,
      minRequiredPercent: 75,
      isCoverageSufficient: true,
      verifiedFeaturesCount: 14,
      totalFeaturesCount: 17,
      featureBreakdown: {
        spatialSignals: 88,
        temporalPattern: 85,
        behavioralAnomalies: 78,
        networkGraphLinkage: 76,
      },
    },
    evidenceGate: {
      status: 'VERIFIED',
      passedCount: 4,
      requiredCount: 4,
      blockingReasons: [],
      lastEvaluatedAt: new Date().toISOString(),
    },
    exitMode: {
      isActive: false,
      targetRadiusKm: 10,
      protocolStatus: 'INACTIVE',
      activeInterceptionsCount: 0,
    },
    selectedHorizon: 6,
    topKCashOutZones: [
      {
        id: 'zone-1',
        zoneCode: 'ZONE-DEL-NORTH-04',
        name: 'Civil Lines Commercial Cluster',
        district: 'North Delhi',
        latitude: 28.6814,
        longitude: 77.2227,
        confidenceScore: 89,
        riskLevel: 'ELEVATED',
        cashVolumeEstimate: '₹ 18,50,000',
        atmClusterDensity: 'HIGH',
        distanceKm: 3.4,
        primarySignal: 'Clustered off-hours withdrawal velocity burst',
      },
      {
        id: 'zone-2',
        zoneCode: 'ZONE-DEL-WEST-12',
        name: 'Janakpuri District Hub',
        district: 'West Delhi',
        latitude: 28.6219,
        longitude: 77.0878,
        confidenceScore: 74,
        riskLevel: 'MONITORED',
        cashVolumeEstimate: '₹ 12,00,000',
        atmClusterDensity: 'MODERATE',
        distanceKm: 8.7,
        primarySignal: 'Sequential account access pattern across adjacent nodes',
      },
      {
        id: 'zone-3',
        zoneCode: 'ZONE-DEL-SOUTH-09',
        name: 'Nehru Place Financial Complex',
        district: 'South Delhi',
        latitude: 28.5492,
        longitude: 77.2517,
        confidenceScore: 61,
        riskLevel: 'MONITORED',
        cashVolumeEstimate: '₹ 8,40,000',
        atmClusterDensity: 'HIGH',
        distanceKm: 14.2,
        primarySignal: 'Historical nexus node with elevated route proximity',
      },
    ],
    explainableReasons: [
      {
        id: 'reason-1',
        title: 'Off-Hours Cash-Out Velocity',
        description: 'Multiple high-value terminal attempts observed within a tight 45-minute temporal window.',
        category: 'TEMPORAL',
        importanceWeight: 92,
        impact: 'WARNING',
      },
      {
        id: 'reason-2',
        title: 'Geographic Terminal Proximity',
        description: 'ATM locations lie within a 2.5km vector along primary transit corridor exits.',
        category: 'SPATIAL',
        importanceWeight: 84,
        impact: 'POSITIVE',
      },
      {
        id: 'reason-3',
        title: 'Graph Node Intermediary Relay',
        description: 'Account transfers linked through 2-hop beneficiary cluster before cash conversion attempts.',
        category: 'NETWORK',
        importanceWeight: 76,
        impact: 'NEUTRAL',
      },
    ],
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 6).toISOString(),
  },
  'CASE-2026-9042': {
    caseId: 'CASE-2026-9042',
    forecastId: 'FC-9042-V2',
    state: 'CONFIRMED',
    stateReason: 'Multi-vector spatial convergence verified with critical operational urgency.',
    evidenceCoverage: {
      overallPercent: 94,
      minRequiredPercent: 75,
      isCoverageSufficient: true,
      verifiedFeaturesCount: 16,
      totalFeaturesCount: 17,
      featureBreakdown: {
        spatialSignals: 96,
        temporalPattern: 92,
        behavioralAnomalies: 90,
        networkGraphLinkage: 94,
      },
    },
    evidenceGate: {
      status: 'VERIFIED',
      passedCount: 4,
      requiredCount: 4,
      blockingReasons: [],
      lastEvaluatedAt: new Date().toISOString(),
    },
    exitMode: {
      isActive: true,
      targetRadiusKm: 15,
      protocolStatus: 'ENGAGED',
      activeInterceptionsCount: 3,
    },
    selectedHorizon: 1,
    topKCashOutZones: [
      {
        id: 'zone-9042-1',
        zoneCode: 'ZONE-MUM-BKC-01',
        name: 'BKC Financial Center Terminal',
        district: 'Mumbai Suburban',
        latitude: 19.0657,
        longitude: 72.8686,
        confidenceScore: 96,
        riskLevel: 'CRITICAL',
        cashVolumeEstimate: '₹ 45,00,000',
        atmClusterDensity: 'CRITICAL_DENSITY',
        distanceKm: 1.2,
        primarySignal: 'Immediate high-volume cash depletion signal detected',
      },
      {
        id: 'zone-9042-2',
        zoneCode: 'ZONE-MUM-ANDHERI-08',
        name: 'Andheri East Transport Node',
        district: 'Mumbai Suburban',
        latitude: 19.1197,
        longitude: 72.8464,
        confidenceScore: 82,
        riskLevel: 'ELEVATED',
        cashVolumeEstimate: '₹ 22,00,000',
        atmClusterDensity: 'HIGH',
        distanceKm: 6.8,
        primarySignal: 'High velocity secondary withdrawal channel',
      },
    ],
    explainableReasons: [
      {
        id: 'reason-9042-1',
        title: 'Synchronized Multi-Node Cash Drain',
        description: 'Simultaneous terminal transactions executed across 4 adjacent bank switches.',
        category: 'TEMPORAL',
        importanceWeight: 98,
        impact: 'WARNING',
      },
      {
        id: 'reason-9042-2',
        title: 'Transit Exit Vector Alignment',
        description: 'Highways and metro exit nodes matched target escape trajectory.',
        category: 'SPATIAL',
        importanceWeight: 94,
        impact: 'POSITIVE',
      },
    ],
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  },
  'CASE-2026-7710': {
    caseId: 'CASE-2026-7710',
    forecastId: 'FC-7710-V1',
    state: 'ABSTAIN',
    stateReason: 'Evidence coverage is below minimum threshold (52% vs 75% required). Geo forecast withheld.',
    evidenceCoverage: {
      overallPercent: 52,
      minRequiredPercent: 75,
      isCoverageSufficient: false,
      verifiedFeaturesCount: 8,
      totalFeaturesCount: 17,
      featureBreakdown: {
        spatialSignals: 55,
        temporalPattern: 48,
        behavioralAnomalies: 50,
        networkGraphLinkage: 56,
      },
    },
    evidenceGate: {
      status: 'GATE_RESTRICTED',
      passedCount: 2,
      requiredCount: 4,
      blockingReasons: ['Temporal sequence data incomplete', 'Insufficient spatial GPS velocity verification'],
      lastEvaluatedAt: new Date().toISOString(),
    },
    exitMode: {
      isActive: false,
      targetRadiusKm: 5,
      protocolStatus: 'INACTIVE',
      activeInterceptionsCount: 0,
    },
    selectedHorizon: 24,
    topKCashOutZones: [
      {
        id: 'zone-7710-1',
        zoneCode: 'ZONE-BLR-KORAMANGALA',
        name: 'Koramangala 8th Block Sector',
        district: 'Bengaluru Urban',
        latitude: 12.9352,
        longitude: 77.6245,
        confidenceScore: 48,
        riskLevel: 'MONITORED',
        cashVolumeEstimate: '₹ 6,00,000',
        atmClusterDensity: 'MODERATE',
        distanceKm: 5.1,
        primarySignal: 'Unverified spatial anomaly signal',
      },
    ],
    explainableReasons: [
      {
        id: 'reason-7710-1',
        title: 'Weak Intermediary Graph Connectivity',
        description: 'Relay account linkage metrics fall below minimum 80% confidence bound.',
        category: 'NETWORK',
        importanceWeight: 54,
        impact: 'NEUTRAL',
      },
    ],
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 24).toISOString(),
  },
};

export function useGeoPrediction(initialCaseId: string = 'CASE-2026-8891') {
  const [caseId, setCaseId] = useState<string>(initialCaseId);
  const [forecast, setForecast] = useState<ForecastData>(
    CASE_DATABASE[initialCaseId] || CASE_DATABASE['CASE-2026-8891']
  );
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>('zone-1');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Switch Active Intelligence Case
  const switchCase = useCallback((newCaseId: string) => {
    if (CASE_DATABASE[newCaseId]) {
      setCaseId(newCaseId);
      setForecast(CASE_DATABASE[newCaseId]);
      setSelectedZoneId(CASE_DATABASE[newCaseId].topKCashOutZones[0]?.id || null);
    }
  }, []);

  // Toggle Exit Mode state
  const toggleExitMode = useCallback(() => {
    setForecast((prev) => {
      const nextActive = !prev.exitMode.isActive;
      return {
        ...prev,
        exitMode: {
          ...prev.exitMode,
          isActive: nextActive,
          protocolStatus: nextActive ? 'ENGAGED' : 'INACTIVE',
          activatedAt: nextActive ? new Date().toISOString() : undefined,
          activeInterceptionsCount: nextActive ? 2 : 0,
        },
      };
    });
  }, []);

  // Set Exit Mode target radius
  const setTargetRadius = useCallback((radiusKm: number) => {
    setForecast((prev) => ({
      ...prev,
      exitMode: {
        ...prev.exitMode,
        targetRadiusKm: radiusKm,
      },
    }));
  }, []);

  // Update time horizon bucket & adjust zone estimates dynamically
  const setTimeHorizon = useCallback((horizon: TimeHorizonHours) => {
    setForecast((prev) => {
      const updatedZones: CashOutZone[] = prev.topKCashOutZones.map((z) => {
        const baseScore = z.confidenceScore;
        const adjustedScore = Math.min(99, Math.max(30, Math.round(baseScore * (1 + (horizon - 6) * 0.02))));
        return {
          ...z,
          confidenceScore: adjustedScore,
        };
      });

      return {
        ...prev,
        selectedHorizon: horizon,
        topKCashOutZones: updatedZones,
      };
    });
  }, []);

  // State override switcher for testing/demonstration (ABSTAIN / MONITORING / CONFIRMED)
  const setForecastState = useCallback((state: ForecastState) => {
    setForecast((prev) => {
      let updatedCoverage = { ...prev.evidenceCoverage };
      let gateStatus: GateStatus = 'VERIFIED';
      let passedCount = 4;
      let blockingReasons: string[] = [];

      if (state === 'ABSTAIN') {
        updatedCoverage.overallPercent = 54;
        updatedCoverage.isCoverageSufficient = false;
        gateStatus = 'GATE_RESTRICTED';
        passedCount = 2;
        blockingReasons = [
          'Evidence coverage below required 75% threshold',
          'Spatial velocity confidence bounds not satisfied',
        ];
      } else if (state === 'MONITORING') {
        updatedCoverage.overallPercent = 82;
        updatedCoverage.isCoverageSufficient = true;
        gateStatus = 'VERIFIED';
        passedCount = 4;
        blockingReasons = [];
      } else if (state === 'CONFIRMED') {
        updatedCoverage.overallPercent = 96;
        updatedCoverage.isCoverageSufficient = true;
        gateStatus = 'VERIFIED';
        passedCount = 4;
        blockingReasons = [];
      }

      return {
        ...prev,
        state,
        evidenceCoverage: updatedCoverage,
        evidenceGate: {
          ...prev.evidenceGate,
          status: gateStatus,
          passedCount,
          blockingReasons,
          lastEvaluatedAt: new Date().toISOString(),
        },
        stateReason:
          state === 'ABSTAIN'
            ? 'Evidence coverage is below minimum threshold (54% vs 75% required). Geo forecast withheld.'
            : state === 'MONITORING'
            ? 'Sufficient evidence coverage verified. Signal monitoring active.'
            : 'Operational threshold met with confirmed multi-signal correlation.',
      };
    });
  }, []);

  // Refresh / Re-run prediction simulation
  const refreshForecast = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setForecast((prev) => ({
        ...prev,
        generatedAt: new Date().toISOString(),
      }));
      setLoading(false);
    }, 600);
  }, []);

  return {
    caseId,
    availableCases: Object.keys(CASE_DATABASE),
    switchCase,
    forecast,
    selectedZoneId,
    setSelectedZoneId,
    loading,
    setLoading,
    error,
    setError,
    toggleExitMode,
    setTargetRadius,
    setTimeHorizon,
    setForecastState,
    refreshForecast,
  };
}
