import { Navigate, Route, Routes } from 'react-router-dom';
import { CommandCenterPage } from '../../features/command-center/CommandCenterPage';
import { CasesPlaceholderPage } from '../../features/cases/CasesPlaceholderPage';
import { PredictionPlaceholderPage } from '../../features/prediction/PredictionPlaceholderPage';
import { ResolutionPlaceholderPage } from '../../features/resolution/ResolutionPlaceholderPage';
import { AuditPlaceholderPage } from '../../features/audit/AuditPlaceholderPage';
import { RiskQueuePage } from '../../features/risk/RiskQueuePage';
import { NotFoundPage } from '../../layout/NotFoundPage/NotFoundPage';
import { AppShell } from '../AppShell';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/command-center" replace />} />
        <Route path="command-center" element={<CommandCenterPage />} />
        <Route path="risk" element={<RiskQueuePage />} />
        <Route path="cases" element={<CasesPlaceholderPage />} />
        <Route path="cases/:caseId" element={<CasesPlaceholderPage />} />
        <Route path="prediction" element={<PredictionPlaceholderPage />} />
        <Route path="prediction/:caseId" element={<PredictionPlaceholderPage />} />
        <Route path="resolution" element={<ResolutionPlaceholderPage />} />
        <Route path="resolution/:caseId" element={<ResolutionPlaceholderPage />} />
        <Route path="audit" element={<AuditPlaceholderPage />} />
        <Route path="audit/:caseId" element={<AuditPlaceholderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
