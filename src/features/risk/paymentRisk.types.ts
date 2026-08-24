import type { SystemStatus } from '../../api/types/status';

export type TrustVerificationState = 'VERIFIED' | 'UNVERIFIED' | 'REVOKED' | 'UNAVAILABLE';
export type RiskDimensionAvailability = 'AVAILABLE' | 'PARTIAL' | 'UNAVAILABLE';
export type PaymentDecision = 'ALLOW' | 'WARN' | 'STEP_UP' | 'BLOCK';

export type PaymentRiskReasonCode =
  | 'NEW_BENEFICIARY'
  | 'AMOUNT_ANOMALY'
  | 'TIME_ANOMALY'
  | 'VELOCITY_SPIKE'
  | 'RECEIVER_INFLOW_SPIKE'
  | 'FIRST_TIME_SENDER_SPIKE'
  | 'HIGH_PASS_THROUGH'
  | 'NETWORK_CONVERGENCE';

export interface PaymentParty {
  label: string;
  identifier?: string;
}

export interface PaymentTransaction {
  reference: string;
  amount: { value: number; currency: string };
  payer: PaymentParty;
  receiver: PaymentParty;
  timestamp: string;
  provider?: string;
  paymentMethod?: string;
}

export interface TrustVerification {
  state: TrustVerificationState;
  provider?: string;
  detail?: string;
  checkedAt?: string;
}

export interface RiskDimension {
  id: 'transaction-anomaly' | 'receiver-behaviour' | 'network-risk';
  title: string;
  status: SystemStatus;
  availability: RiskDimensionAvailability;
  score?: number;
  explanation: string;
}

export interface PaymentRiskAssessment {
  transaction: PaymentTransaction;
  trust: TrustVerification;
  dimensions: RiskDimension[];
  reasons: PaymentRiskReasonCode[];
  decision: {
    outcome: PaymentDecision;
    reasons: PaymentRiskReasonCode[];
    partnerDefined: boolean;
  };
  dataCompleteness: 'COMPLETE' | 'PARTIAL';
  dataNotice?: string;
}
