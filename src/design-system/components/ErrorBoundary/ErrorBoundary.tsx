import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryProps { children: ReactNode; fallback: (error: Error) => ReactNode; resetKey?: string; }
interface ErrorBoundaryState { error: Error | null; }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { error: null };
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { error }; }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { void error; void errorInfo; /* Reserved for configured observability. */ }
  public componentDidUpdate(previousProps: ErrorBoundaryProps) { if (previousProps.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null }); }
  public render() { return this.state.error ? this.props.fallback(this.state.error) : this.props.children; }
}
