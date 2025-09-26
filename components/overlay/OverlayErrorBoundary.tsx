// Error Boundary ottimizzato
import { Component, ReactNode, Suspense } from "react";
import { Button } from "..";


// Error handler centralizzato
const handleOverlayError = (error: Error, componentName?: string) => {
    console.error('Modal Error:', error);
    // Qui puoi aggiungere il tuo error tracking centralizzato
    // es. Sentry.captureException(error);
    // es. analytics.track('modal_error', { component: componentName });
};

export class OverlayErrorBoundary extends Component<
    { children: ReactNode },
    { hasError: boolean; error: Error | null }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        handleOverlayError(error, 'DynamicComponent');
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Caricamento...</div>}>
                    <div className="flex flex-col items-center py-8 text-center">
                        <div className="text-error mb-2 text-2xl">⚠️</div>
                        <p className="text-error mb-2 font-medium">Errore nel caricamento</p>
                        <p className="text-sm text-primary/60 mb-4">
                            Si è verificato un errore imprevisto
                        </p>
                        <Button onClick={this.handleRetry}>Riprova</Button>
                    </div>
                </Suspense>
            );
        }

        return this.props.children;
    }
}