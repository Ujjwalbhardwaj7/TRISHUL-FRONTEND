export interface ConfidenceMeterProps { value: number; label?: string; }

export function ConfidenceMeter({ value, label = 'Model confidence' }: ConfidenceMeterProps) {
  const percentage = Math.max(0, Math.min(100, value));
  return <div className="confidence-meter"><div className="confidence-meter__label"><span>{label}</span><strong aria-hidden="true">{percentage}%</strong></div><div className="confidence-meter__track" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: `${percentage}%` }} /></div></div>;
}
