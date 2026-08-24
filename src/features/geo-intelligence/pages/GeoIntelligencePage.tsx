import React from 'react';
import { useGeoPrediction } from '../hooks/useGeoPrediction';
import { GeoHeader } from '../components/GeoHeader';
import { ForecastStatusBanner } from '../components/ForecastStatusBanner';
import { TimeHorizonSelector } from '../components/TimeHorizonSelector';
import { EvidenceGateCard } from '../components/EvidenceGateCard';
import { ExitModeCard } from '../components/ExitModeCard';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { CashOutZonesList } from '../components/CashOutZonesList';
import { ExplainableReasonsCard } from '../components/ExplainableReasonsCard';

export const GeoIntelligencePage: React.FC = () => {
  const {
    forecast,
    availableCases,
    switchCase,
    selectedZoneId,
    setSelectedZoneId,
    loading,
    toggleExitMode,
    setTargetRadius,
    setTimeHorizon,
    setForecastState,
    refreshForecast,
  } = useGeoPrediction('CASE-2026-8891');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Geo Header with Case Selector, Status Badges & Exit Mode Toggle */}
      <GeoHeader
        forecast={forecast}
        availableCases={availableCases}
        onSwitchCase={switchCase}
        onToggleExitMode={toggleExitMode}
        onStateChange={setForecastState}
        onRefresh={refreshForecast}
        isRefreshing={loading}
      />

      {/* ABSTAIN / MONITORING / CONFIRMED Status Banner */}
      <ForecastStatusBanner
        state={forecast.state}
        stateReason={forecast.stateReason}
        evidenceCoverage={forecast.evidenceCoverage}
      />

      {/* Time Horizon Selector (1h, 6h, 12h, 24h, 48h) */}
      <TimeHorizonSelector
        selectedHorizon={forecast.selectedHorizon}
        onSelectHorizon={setTimeHorizon}
      />

      {/* Main Responsive Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '1.25rem',
        }}
      >
        {/* Left Column: Spatial Canvas Map (withheld if ABSTAIN) & Cash-Out Zones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <MapPlaceholder
            state={forecast.state}
            zones={forecast.topKCashOutZones}
            exitModeActive={forecast.exitMode.isActive}
            selectedZoneId={selectedZoneId}
            onSelectZone={setSelectedZoneId}
          />
          <CashOutZonesList
            zones={forecast.topKCashOutZones}
            selectedZoneId={selectedZoneId}
            onSelectZone={setSelectedZoneId}
          />
        </div>

        {/* Right Column: Evidence Gate, Exit Mode Protocol, Rationale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <EvidenceGateCard
            coverage={forecast.evidenceCoverage}
            gate={forecast.evidenceGate}
          />
          <ExitModeCard
            exitMode={forecast.exitMode}
            onToggleExitMode={toggleExitMode}
            onSetRadius={setTargetRadius}
          />
          <ExplainableReasonsCard reasons={forecast.explainableReasons} />
        </div>
      </div>
    </div>
  );
};
