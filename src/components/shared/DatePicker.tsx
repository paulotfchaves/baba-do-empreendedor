import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Input } from './FormStyles';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Selecione uma data',
  error,
  required,
  disabled,
  className = ''
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current && !calendarRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(currentMonth), { locale: ptBR });
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    const remainingDays = 42 - days.length;
    const lastDay = days[days.length - 1];
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push(addDays(lastDay, i));
    }

    return days;
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handlePreviousMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      setCurrentMonth(value || new Date());
    }
  };

  const renderCalendar = () => (
    <div
      ref={calendarRef}
      className="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[320px]"
      style={{
        top: inputRef.current ? inputRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
        left: inputRef.current ? inputRef.current.getBoundingClientRect().left + window.scrollX : 0,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Mês anterior"
          type="button"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Próximo mês"
          type="button"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-700 h-8 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth().map((day, index) => {
          const isSelected = value && isSameDay(day, value);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              type="button"
              className={`
                h-12 rounded-lg text-sm font-medium
                flex items-center justify-center
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66B2]
                ${
                  isSelected
                    ? 'bg-[#FF66B2] text-white hover:bg-[#ff4d9f]'
                    : isCurrentMonth
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400 hover:bg-gray-50'
                }
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => handleDateSelect(new Date())}
          className="text-sm text-[#FF66B2] hover:text-[#ff4d9f] font-medium"
          type="button"
        >
          Hoje
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative" ref={inputRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Input
        value={value ? format(value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''}
        onClick={handleInputClick}
        readOnly
        placeholder={placeholder}
        className={className}
        error={error}
        required={required}
        disabled={disabled}
        leftIcon={<Calendar className="w-5 h-5 text-gray-400" />}
      />

      {isOpen && !disabled && createPortal(renderCalendar(), document.body)}
    </div>
  );
}
