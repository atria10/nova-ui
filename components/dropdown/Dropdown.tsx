'use client';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { ComponentType, ReactNode } from 'react';
import { OverlayErrorBoundary } from '..';
import { cn } from '../../utils/cn';

export interface DropdownProps<T> {
  trigger: ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  DynamicComponent?: ComponentType;
  componentProps?: T;
  sideOffset?: number;
  alignOffset?: number;
}

export function Dropdown<T extends Record<string, any> = Record<string, any>>({
  trigger,
  DynamicComponent,
  componentProps,
  align = 'start',
  side = 'bottom',
  sideOffset = 8,
  alignOffset = 0,
  className,
  children
}: DropdownProps<T> & { children?: ReactNode }) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          side={side}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={cn(
            // Base styles with trigger width matching
            "z-50 min-w-[var(--radix-dropdown-menu-trigger-width)] max-w-[320px] overflow-hidden",
            
            // Background using DaisyUI colors
            "bg-base-100/95 backdrop-blur-xl border border-base-300/60",
            
            // Shape and shadows
            "rounded-xl shadow-2xl shadow-base-content/[0.12]",
            
            // Modern glass effect
            "ring-1 ring-base-content/[0.05]",
            
            // Smooth animations
            "will-change-[opacity,transform]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "duration-200 ease-out",
            
            // Responsive
            "max-h-[var(--radix-dropdown-menu-content-available-height)]",
            
            className
          )}
        >
          {/* Subtle gradient overlay using DaisyUI colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-base-100/40 to-transparent pointer-events-none rounded-xl" />
          
          {/* Content container */}
          <div className="relative p-1">
            {DynamicComponent ? (
              <OverlayErrorBoundary>
                <DynamicComponent {...(componentProps ?? {} as T)} />
              </OverlayErrorBoundary>
            ) : (
              children
            )}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

// Styled components per una UX moderna e consistente
export const DropdownItem = ({ 
  className, 
  children, 
  icon,
  shortcut,
  destructive = false,
  ...props 
}: {
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
} & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      // Base styles
      "relative flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5",
      
      // Typography using DaisyUI
      "text-sm font-medium text-base-content",
      
      // Interactive states
      "cursor-pointer select-none outline-none",
      "transition-all duration-150 ease-out",
      
      // Hover/focus states using DaisyUI colors
      "hover:bg-base-200/80 focus:bg-base-200/80",
      
      // Modern rounded corners
      "rounded-lg",
      
      // Active state
      "active:scale-[0.98] active:bg-base-300/60",
      
      // Disabled state
      "disabled:pointer-events-none disabled:opacity-50",
      
      // Destructive variant using DaisyUI error colors
      destructive && [
        "text-error",
        "hover:bg-error/10 focus:bg-error/10",
      ],
      
      className
    )}
    {...props}
  >
    {icon && (
      <span className={cn(
        "flex-shrink-0 text-base-content/60",
        destructive && "text-error"
      )}>
        {icon}
      </span>
    )}
    
    <span className="flex-1 truncate">{children}</span>
    
    {shortcut && (
      <span className="flex-shrink-0 text-xs text-base-content/60 font-mono tracking-wider">
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitive.Item>
);

export const DropdownSeparator = ({ className, ...props }: { className?: string }) => (
  <DropdownMenuPrimitive.Separator
    className={cn(
      "h-px mx-2 my-2 bg-gradient-to-r from-transparent via-base-300 to-transparent",
      className
    )}
    {...props}
  />
);

export const DropdownLabel = ({ 
  className, 
  children, 
  ...props 
}: {
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-3 py-2 text-xs font-semibold text-base-content/70",
      "uppercase tracking-wider",
      className
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Label>
);

// Componenti aggiuntivi per UX avanzata
export const DropdownCheckboxItem = ({
  className,
  children,
  checked,
  icon,
  ...props
}: {
  className?: string;
  children: ReactNode;
  checked?: boolean;
  icon?: ReactNode;
} & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(
      "relative flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5",
      "text-sm font-medium text-base-content",
      "cursor-pointer select-none outline-none rounded-lg",
      "transition-all duration-150 ease-out",
      "hover:bg-base-200/80 focus:bg-base-200/80",
      "active:scale-[0.98]",
      className
    )}
    checked={checked}
    {...props}
  >
    <div className="flex items-center justify-center w-4 h-4">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="w-3.5 h-3.5 text-primary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </div>
    
    {icon && (
      <span className="flex-shrink-0 text-base-content/60">
        {icon}
      </span>
    )}
    
    <span className="flex-1 truncate">{children}</span>
  </DropdownMenuPrimitive.CheckboxItem>
);

export const DropdownRadioItem = ({
  className,
  children,
  icon,
  ...props
}: {
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
} & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "relative flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5",
      "text-sm font-medium text-base-content",
      "cursor-pointer select-none outline-none rounded-lg",
      "transition-all duration-150 ease-out",
      "hover:bg-base-200/80 focus:bg-base-200/80",
      "active:scale-[0.98]",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-center w-4 h-4">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="w-3.5 h-3.5 text-primary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </div>
    
    {icon && (
      <span className="flex-shrink-0 text-base-content/60">
        {icon}
      </span>
    )}
    
    <span className="flex-1 truncate">{children}</span>
  </DropdownMenuPrimitive.RadioItem>
);

// Submenu support per dropdown complessi
export const DropdownSubTrigger = ({
  className,
  children,
  icon,
  ...props
}: {
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
} & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "relative flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5",
      "text-sm font-medium text-base-content",
      "cursor-pointer select-none outline-none rounded-lg",
      "transition-all duration-150 ease-out",
      "hover:bg-base-200/80 focus:bg-base-200/80",
      "active:scale-[0.98]",
      "data-[state=open]:bg-base-200/80",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="flex-shrink-0 text-base-content/60">
        {icon}
      </span>
    )}
    
    <span className="flex-1 truncate">{children}</span>
    
    <ChevronRightIcon className="w-4 h-4 ml-auto text-base-content/60" />
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownSubContent = ({ className, ...props }: { className?: string }) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      // Same styling as main dropdown using DaisyUI colors
      "z-50 min-w-[220px] max-w-[320px] overflow-hidden",
      "bg-base-100/95 backdrop-blur-xl border border-base-300/60",
      "rounded-xl shadow-2xl shadow-base-content/[0.12]",
      "ring-1 ring-base-content/[0.05]",
      "will-change-[opacity,transform]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "duration-200 ease-out p-1",
      className
    )}
    {...props}
  />
);

// Wrapper components per submenu
export const DropdownSub = DropdownMenuPrimitive.Sub;
export const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Esempi di utilizzo avanzato con DaisyUI
/*
// Esempio 1: Dropdown semplice con icone e shortcuts
<Dropdown trigger={<Button variant="primary">Menu</Button>}>
  <DropdownLabel>Account</DropdownLabel>
  <DropdownItem icon={<UserIcon />} shortcut="⌘K">
    Profile
  </DropdownItem>
  <DropdownItem icon={<SettingsIcon />} shortcut="⌘,">
    Settings
  </DropdownItem>
  <DropdownSeparator />
  <DropdownItem icon={<LogoutIcon />} destructive>
    Logout
  </DropdownItem>
</Dropdown>

// Esempio 2: Dropdown con checkbox (usa colore primary per checked)
<Dropdown trigger={<Button variant="secondary">Options</Button>}>
  <DropdownCheckboxItem checked={showBookmarks}>
    Show Bookmarks
  </DropdownCheckboxItem>
  <DropdownCheckboxItem checked={showURLs}>
    Show URLs
  </DropdownCheckboxItem>
</Dropdown>

// Esempio 3: Dropdown con submenu
<Dropdown trigger={<Button variant="outline">Advanced</Button>}>
  <DropdownItem>New Tab</DropdownItem>
  <DropdownSub>
    <DropdownSubTrigger icon={<ShareIcon />}>
      Share
    </DropdownSubTrigger>
    <DropdownSubContent>
      <DropdownItem>Email</DropdownItem>
      <DropdownItem>Social Media</DropdownItem>
    </DropdownSubContent>
  </DropdownSub>
</Dropdown>

// Colori DaisyUI utilizzati:
// - base-100: Background principale
// - base-200: Background hover/focus
// - base-300: Separatori e bordi
// - base-content: Testo principale
// - primary: Elementi selezionati (checkbox/radio)
// - error: Elementi distruttivi
*/