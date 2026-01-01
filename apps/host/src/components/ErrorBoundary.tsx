import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <div className="text-red-600 text-xl font-semibold mb-2">
                            ⚠️ Component Unavailable
                        </div>
                        <p className="text-red-700 text-sm">
                            The remote component failed to load. Please try again later.
                        </p>
                        {this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="text-red-600 cursor-pointer text-sm font-medium">
                                    Error Details
                                </summary>
                                <pre className="mt-2 text-xs bg-red-100 p-3 rounded overflow-auto">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
