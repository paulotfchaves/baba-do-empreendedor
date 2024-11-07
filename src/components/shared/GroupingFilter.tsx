interface GroupingFilterProps {
  value: 'day' | 'week' | 'month';
  onChange: (value: 'day' | 'week' | 'month') => void;
}

export default function GroupingFilter({ value, onChange }: GroupingFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as 'day' | 'week' | 'month')}
      className="rounded-lg border-gray-300 shadow-sm focus:border-[#FF66B2] focus:ring-[#FF66B2]"
    >
      <option value="day">Agrupar por Dia</option>
      <option value="week">Agrupar por Semana</option>
      <option value="month">Agrupar por Mês</option>
    </select>
  );
}