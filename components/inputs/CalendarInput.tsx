// components/inputs/CalendarInput.tsx
'use client';

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { 
  format, 
  parse, 
  isValid, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday as dateFnsIsToday, 
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  isAfter
} from 'date-fns';
import { it,Locale } from 'date-fns/locale';
import React, { forwardRef, useState, useEffect, useMemo } from 'react';
import { cn } from '../../utils/cn';

export interface CalendarInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  fullWidth?: boolean;
  showIcon?: boolean;
  value?: Date | string;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  placeholder?: string;
  locale?: Locale;
}

const CalendarInput = forwardRef<HTMLInputElement, CalendarInputProps>(
  ({
    label,
    error,
    hint,
    required = false,
    fullWidth = true,
    showIcon = true,
    className = '',
    id,
    value,
    onChange,
    minDate,
    maxDate,
    dateFormat = 'dd/MM/yyyy',
    placeholder = 'Seleziona una data',
    locale = it,
    disabled,
    ...props
  }, ref) => {
    const inputId = id || props.name || `calendar-${Math.random().toString(36).substr(2, 9)}`;
    const [isOpen, setIsOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Parse initial value
    useEffect(() => {
      if (value) {
        const date = value instanceof Date ? value : new Date(value);
        if (isValid(date)) {
          setSelectedDate(date);
          setCurrentMonth(startOfMonth(date));
          setDisplayValue(format(date, dateFormat, { locale }));
        }
      } else {
        setSelectedDate(null);
        setDisplayValue('');
      }
    }, [value, dateFormat, locale]);

    // Generate calendar grid using date-fns
    const calendarDays = useMemo(() => {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
      const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

      const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

      return days.map(date => {
        const isCurrentMonth = isSameMonth(date, currentMonth);
        const isToday = dateFnsIsToday(date);
        const isSelected = selectedDate && isSameDay(date, selectedDate);
        const isDisabled = 
          (minDate && isBefore(date, minDate)) || 
          (maxDate && isAfter(date, maxDate)) ||
          disabled;

        return {
          date,
          day: date.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          isDisabled
        };
      });
    }, [currentMonth, selectedDate, minDate, maxDate, disabled]);

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      if (disabled) return;
      
      setSelectedDate(date);
      setDisplayValue(format(date, dateFormat, { locale }));
      setIsOpen(false);
      
      if (onChange) {
        onChange(date);
      }
    };

    // Handle input change with date-fns parsing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      if (inputValue.trim()) {
        // Try to parse with the specified format first
        let parsedDate = parse(inputValue, dateFormat, new Date(), { locale });
        
        // If that fails, try common alternative formats
        if (!isValid(parsedDate)) {
          const commonFormats = ['dd/MM/yyyy', 'd/M/yyyy', 'dd-MM-yyyy', 'd-M-yyyy', 'yyyy-MM-dd'];
          for (const formatStr of commonFormats) {
            parsedDate = parse(inputValue, formatStr, new Date(), { locale });
            if (isValid(parsedDate)) break;
          }
        }

        // Last resort: try native Date parsing
        if (!isValid(parsedDate)) {
          parsedDate = new Date(inputValue);
        }

        if (isValid(parsedDate)) {
          setSelectedDate(parsedDate);
          setCurrentMonth(startOfMonth(parsedDate));
          if (onChange) {
            onChange(parsedDate);
          }
        }
      } else {
        setSelectedDate(null);
        if (onChange) {
          onChange(null);
        }
      }
    };

    // Navigation functions
    const goToPreviousMonth = () => {
      setCurrentMonth(prev => subMonths(prev, 1));
    };

    const goToNextMonth = () => {
      setCurrentMonth(prev => addMonths(prev, 1));
    };

    // Get localized month and day names
    const monthName = format(currentMonth, 'MMMM yyyy', { locale });
    const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

    return (
      <div className={`${fullWidth ? 'w-full' : ''} relative`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-base-content/70 mb-1"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {showIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarIcon className="h-4 w-4 text-base-content/60" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type="text"
            autoComplete="off"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              `w-full ${showIcon ? 'pl-10' : 'pl-3'} pr-3 py-2`,
              "border rounded-lg",
              "text-sm text-base-content",
              "placeholder:text-base-content/50",
              "transition-colors duration-200",
              error
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-base-300 focus:border-primary focus:ring-primary',
              "focus:outline-none focus:ring-2 focus:ring-opacity-20",
              "disabled:bg-base-200 disabled:text-base-content/50 disabled:cursor-not-allowed",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <InfoCircledIcon className="h-4 w-4 text-error" />
            </div>
          )}

          {/* Calendar Dropdown */}
          {isOpen && !disabled && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Calendar */}
              <div className="absolute top-full left-0 z-20 mt-2 p-4 bg-base-100/95 backdrop-blur-xl border border-base-300/60 rounded-xl shadow-2xl shadow-base-content/[0.12] min-w-[320px]">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-base-100/40 to-transparent pointer-events-none rounded-xl" />
                
                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="p-2 hover:bg-base-200/80 rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <ChevronLeftIcon className="h-4 w-4 text-base-content" />
                    </button>

                    <h3 className="text-sm font-semibold text-base-content capitalize">
                      {monthName}
                    </h3>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="p-2 hover:bg-base-200/80 rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <ChevronRightIcon className="h-4 w-4 text-base-content" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="p-2 text-xs font-medium text-base-content/60 text-center"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => !day.isDisabled && handleDateSelect(day.date)}
                        disabled={day.isDisabled}
                        className={cn(
                          "p-2 text-sm rounded-lg transition-all duration-150",
                          "hover:bg-base-200/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20",
                          
                          // Current month vs other months
                          day.isCurrentMonth 
                            ? "text-base-content" 
                            : "text-base-content/40",
                          
                          // Today
                          day.isToday && "bg-primary/10 text-primary font-semibold ring-1 ring-primary/20",
                          
                          // Selected
                          day.isSelected && "bg-primary text-primary-content font-semibold shadow-lg",
                          
                          // Disabled
                          day.isDisabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
                          
                          // Active state
                          !day.isDisabled && "active:scale-95"
                        )}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>

                  {/* Footer with today button */}
                  <div className="pt-3 border-t border-base-300/60">
                    <button
                      type="button"
                      onClick={() => handleDateSelect(new Date())}
                      className="w-full py-2.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-all duration-150 font-medium active:scale-98"
                    >
                      Oggi - {format(new Date(), dateFormat, { locale })}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-xs text-base-content/60">
            {hint}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CalendarInput.displayName = 'CalendarInput';

export default CalendarInput;

/*
Dependency da aggiungere al package.json:
npm install date-fns

Esempi di utilizzo:

// Uso base
<CalendarInput
  label="Data di nascita"
  value={birthDate}
  onChange={setBirthDate}
  required
/>

// Con validazione range
<CalendarInput
  label="Data appuntamento"
  value={appointmentDate}
  onChange={setAppointmentDate}
  minDate={new Date()}
  maxDate={addMonths(new Date(), 6)}
  hint="Seleziona una data nei prossimi 6 mesi"
/>

// Formato personalizzato
<CalendarInput
  label="Data evento"
  dateFormat="dd-MM-yyyy"
  placeholder="gg-mm-aaaa"
  value={eventDate}
  onChange={setEventDate}
/>

// Con gestione errori
<CalendarInput
  label="Data scadenza"
  value={expiryDate}
  onChange={setExpiryDate}
  error={dateError}
  required
/>
*/