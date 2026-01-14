import React from "react";

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log the error to the console for debugging
    // eslint-disable-next-line no-console
    console.error("Unhandled render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mb-4">A rendering error occurred. Details have been logged to the console.</p>
          {this.state.error && (
            <pre className="text-xs bg-muted/50 p-4 rounded overflow-auto">{String(this.state.error.stack || this.state.error.message)}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
