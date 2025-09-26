// ========================================
// FILE: types/index.ts (se hai tipi globali)
// ========================================

// Export di tutti i tipi globali della libreria
export type { ButtonProps } from '../components/button/Button';
export type { 
  TextInputProps,
  EmailInputProps,
  PhoneInputProps,
  PasswordInputProps,
  SelectInputProps,
  SelectOption,
  CalendarInputProps
} from '../components/inputs';
export type { DropdownProps } from '../components/dropdown/Dropdown';
export type { ModalProps } from '../components/modal/Modal';
export type { CardProps } from '../components/card/Card';
export type { ResponsiveImageProps } from '../components/responsiveImage/ResponsiveImage';
export type { ThemeMode, Theme } from '../contexts/ThemeContext';