// ========================================
// FILE: index.ts (ROOT del progetto)
// ========================================

// Componenti base - Export individuali per tree-shaking
export { default as Button } from './components/button/Button';
export type { ButtonProps } from './components/button/Button';

// Componenti di input - Export individuali
export { default as TextInput } from './components/inputs/TextInput';
export { default as EmailInput } from './components/inputs/EmailInput';
export { default as PhoneInput } from './components/inputs/PhoneInput';
export { default as PasswordInput } from './components/inputs/PasswordInput';
export { default as SelectInput } from './components/inputs/SelectInput';
export { default as CalendarInput } from './components/inputs/CalendarInput';

export type { 
  TextInputProps,
  EmailInputProps,
  PhoneInputProps,
  PasswordInputProps,
  SelectInputProps,
  SelectOption,
  CalendarInputProps
} from './components/inputs';

// Componenti interattivi - Export individuali
export { 
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent
} from './components/dropdown/Dropdown';
export type { DropdownProps } from './components/dropdown/Dropdown';

export { default as Modal } from './components/modal/Modal';
export type { ModalProps } from './components/modal/Modal';

// Componenti layout
export { Card, CardHeader, CardContent, CardFooter } from './components/card/Card';
export type { CardProps } from './components/card/Card';

export { default as ResponsiveImage } from './components/responsiveImage/ResponsiveImage';
export type { ResponsiveImageProps } from './components/responsiveImage/ResponsiveImage';

// Utility components
export { OverlayErrorBoundary } from './components/overlay/OverlayErrorBoundary';

// Contexts
export { ThemeProvider, useTheme, themes } from './contexts/ThemeContext';
export type { ThemeMode, Theme } from './contexts/ThemeContext';

// Utils
export { cn } from './utils/cn';