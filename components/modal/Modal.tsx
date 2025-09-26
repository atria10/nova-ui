'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from "@radix-ui/react-icons";
import { ComponentType, ReactNode } from "react";
import { OverlayErrorBoundary } from '..';
import { cn } from '../../utils/cn';

export interface ModalProps<T extends Record<string, any> = Record<string, any>> {
    title: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
    trigger: ReactNode;
    // Dynamic component props
    DynamicComponent: ComponentType<T>;
    componentProps?: T;
    loading?: ReactNode;
    // Controllo esterno opzionale
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

// Size configurations
const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]'
};

// Dynamic Modal component con backdrop migliorato
function Modal<T extends Record<string, any> = Record<string, any>>({
    trigger,
    title,
    description,
    DynamicComponent,
    componentProps,
    size = 'md',
    className,
    loading = <div className="py-8 text-center text-base-content/60">Caricamento...</div>,
    isOpen,
    onOpenChange
}: ModalProps<T>) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Portal>
                {/* Main backdrop with modern blur effect */}
                <Dialog.Overlay className={cn(
                    "fixed inset-0 z-40",
                    "bg-base-content/30 backdrop-blur-lg",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=open]:backdrop-blur-lg data-[state=closed]:backdrop-blur-none",
                    "transition-all duration-300 ease-out"
                )} />

                {/* Enhanced gradient overlay */}
                <div className={cn(
                    "fixed inset-0 z-41 pointer-events-none",
                    "bg-gradient-to-br from-base-content/10 via-transparent to-base-content/5",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "transition-all duration-500 ease-out"
                )} />

                {/* Subtle dot pattern overlay */}
                <div className={cn(
                    "fixed inset-0 z-42 pointer-events-none opacity-20",
                    "bg-[radial-gradient(circle_at_2px_2px,_currentColor_1px,_transparent_1px)]",
                    "bg-[length:24px_24px] text-base-content/20",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:scale-110 data-[state=open]:scale-100",
                    "transition-all duration-700 ease-out"
                )} />

                <Dialog.Content
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 grid w-[90vw] max-h-[85vh]",
                        "translate-x-[-50%] translate-y-[-50%] gap-4",

                        // Enhanced glass morphism background
                        "bg-base-100/95 backdrop-blur-2xl",
                        "border border-base-300/60 shadow-2xl shadow-base-content/[0.15]",
                        "ring-1 ring-base-content/[0.05]",

                        // Modern rounded corners
                        "rounded-2xl",

                        // Content styling
                        "p-6 focus:outline-none overflow-hidden",

                        // Enhanced animations
                        "duration-300 ease-out",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
                        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",

                        // Smooth scale animation on open
                        "data-[state=open]:duration-300 data-[state=closed]:duration-200",

                        sizeClasses[size],
                        className
                    )}
                >
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-base-100/60 via-transparent to-base-100/30 pointer-events-none rounded-2xl" />

                    {/* Content wrapper */}
                    <div className="relative z-10">
                        {/* Header section */}
                        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
                            <Dialog.Title className="text-xl font-semibold leading-none tracking-tight text-base-content">
                                {title}
                            </Dialog.Title>
                            {description && (
                                <Dialog.Description className="text-sm text-base-content/70 leading-relaxed">
                                    {description}
                                </Dialog.Description>
                            )}
                        </div>

                        {/* Main content area */}
                        <div className="flex-1 relative">
                            <OverlayErrorBoundary>
                                <DynamicComponent {...(componentProps ?? {} as T)} />
                            </OverlayErrorBoundary>
                        </div>
                    </div>

                    {/* Enhanced close button */}
                    <Dialog.Close className={cn(
                        "absolute right-4 top-4 z-20",
                        "flex items-center justify-center w-8 h-8",
                        "rounded-full bg-base-200/80 backdrop-blur-sm",
                        "border border-base-300/60",
                        "text-base-content/70 hover:text-base-content",
                        "hover:bg-base-200 hover:scale-105",
                        "transition-all duration-200 ease-out",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20",
                        "active:scale-95 cursor-pointer",
                        "shadow-sm hover:shadow-md"
                    )}>
                        <Cross2Icon className="h-4 w-4" />
                        <span className="sr-only">Chiudi</span>
                    </Dialog.Close>

                    {/* Subtle border highlight */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-base-content/10 via-transparent to-transparent pointer-events-none opacity-50" />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

Modal.displayName = 'Modal';

export default Modal;