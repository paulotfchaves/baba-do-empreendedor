import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWithinInterval, startOfWeek, addDays, subDays, startOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Input } from './FormStyles';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (range: { start: Date; end: Date }) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

interface PresetPeriod {
  label: string;
  getValue: () => { start: Date; end: Date };
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  label,
  error,
  required,
  disabled,
  className = ''
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(startDate);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [tempRange, setTempRange] = useState({ start: startDate, end: endDate });
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [showPresets, setShowPresets] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  const presetPeriods: PresetPeriod[] = [
    {
      label: 'Hoje',
      getValue: () => ({ start: today, end: today })
    },
    {
      label: 'Últimos 7 dias',
      getValue: () => ({
        start: subDays(today, 6),
        end: today
      })
    },
    {
      label: 'Últimos 14 dias',
      getValue: () => ({
        start: subDays(today, 13),
        end: today
      })
    },
    {
      label: 'Mês Atual',
      getValue: () => ({
        start: startOfMonth(today),
        end: endOfMonth(today)
      })
    },
    {
      label: 'Últimos 90 dias',
      getValue: () => ({
        start: subDays(today, 89),
        end: today
      })
    },
    {
      label: 'Este ano',
      getValue: () => ({
        start: startOfYear(today),
        end: today
      })
    }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function calculatePosition() {
      if (!containerRef.current || !calendarRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const calendarHeight = calendarRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - containerRect.bottom;
      const spaceAbove = containerRect.top;

      const padding = 16;
      const minSpace = 100;
      
      if (spaceBelow < calendarHeight + padding && spaceAbove > calendarHeight + padding) {
        setDropdownPosition('top');
      } else if (spaceBelow < minSpace) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }

    if (isOpen) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen]);

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
    if (selecting === 'start') {
      setTempRange({ start: date, end: date });
      setSelecting('end');
    } else {
      if (date < tempRange.start) {
        setTempRange({ start: date, end: tempRange.start });
      } else {
        setTempRange({ ...tempRange, end: date });
      }
      onChange({ start: tempRange.start, end: date });
      setIsOpen(false);
      setSelecting('start');
    }
  };

  const handlePresetSelect = (preset: PresetPeriod) => {
    const range = preset.getValue();
    onChange(range);
    setIsOpen(false);
  };

  const isInRange = (date: Date) => {
    return isWithinInterval(date, {
      start: tempRange.start,
      end: tempRange.end
    });
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setCurrentMonth(startDate);
      setTempRange({ start: startDate, end: endDate });
    }
  };

  const toggleView = () => {
    setShowPresets(!showPresets);
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Input
        value={`${format(startDate, "dd 'de' MMMM", { locale: ptBR })} - ${format(endDate, "dd 'de' MMMM", { locale: ptBR })}`}
        onClick={handleInputClick}
        readOnly
        placeholder="Selecione um período"
        className={className}
        error={error}
        required={required}
        disabled={disabled}
        leftIcon={<Calendar className="w-5 h-5 text-gray-400" />}
      />

      {isOpen && !disabled && (
        <div
          ref={calendarRef}
          style={{
            position: 'absolute',
            [dropdownPosition === 'top' ? 'bottom' : 'top']: 'calc(100% + 8px)',
            left: '0',
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            minWidth: '320px'
          }}
          className="z-50 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[320px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex border-b border-gray-200">
            <button
              onClick={toggleView}
              className={`flex-1 py-3 text-sm font-medium ${
                showPresets ? 'text-[#FF66B2] border-b-2 border-[#FF66B2]' : 'text-gray-500'
              }`}
            >
              Períodos
            </button>
            <button
              onClick={toggleView}
              className={`flex-1 py-3 text-sm font-medium ${
                !showPresets ? 'text-[#FF66B2] border-b-2 border-[#FF66B2]' : 'text-gray-500'
              }`}
            >
              Calendário
            </button>
          </div>

          {showPresets ? (
            <div className="p-2">
              {presetPeriods.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(preset)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4">
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

              <div className="text-sm text-gray-600 mb-4 text-center">
                {selecting === 'start' ? 'Selecione a data inicial' : 'Selecione a data final'}
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
                  const isSelected = isSameDay(day, tempRange.start) || isSameDay(day, tempRange.end);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isRangeDay = isInRange(day) && isCurrentMonth;

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
                            : isRangeDay
                            ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                            : isCurrentMonth
                            ? 'text-gray-900 hover:bg-gray-100'
                            : 'text-gray-400 hover:bg-gray-50'
                        }
                      `}
                      disabled={!isCurrentMonth}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}