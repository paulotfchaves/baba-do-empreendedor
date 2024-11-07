import { Input } from './FormStyles';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export default function CurrencyInput({
  value,
  onChange,
  placeholder = "0,00",
  required = false,
  className = "",
  error
}: CurrencyInputProps) {
  const formatToCurrency = (value: string): string => {
    // Remove tudo exceto números
    let numbers = value.replace(/\D/g, '');
    
    // Se não houver números, retorna vazio ou 0,00
    if (!numbers) {
      return '';
    }
    
    // Converte para número e divide por 100 para ter 2 casas decimais
    const amount = parseFloat(numbers) / 100;
    
    // Formata o número usando pt-BR
    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatToCurrency(e.target.value);
    onChange(newValue);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      required={required}
      error={error}
      leftIcon={<span className="text-gray-500">R$</span>}
    />
  );
}