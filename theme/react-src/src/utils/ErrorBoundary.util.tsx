import type { ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
}

class ErrorBoundaryUtil extends Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error: error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundaryUtil;
