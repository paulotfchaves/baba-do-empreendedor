import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Button from '../components/shared/Button';
import { Input, TextArea, Select, Checkbox, Radio, FormLabel } from '../components/shared/FormStyles';
import DatePicker from '../components/shared/DatePicker';
import DateRangePicker from '../components/shared/DateRangePicker';
import CurrencyInput from '../components/shared/CurrencyInput';
import CategoryBadge from '../components/shared/CategoryBadge';
import StatusBadge from '../components/shared/StatusBadge';

export default function Documentation() {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
    buttons: true,
    inputs: true,
    badges: true,
    pickers: true
  });

  const [demoDate, setDemoDate] = useState(new Date());
  const [demoDateRange, setDemoDateRange] = useState({
    start: new Date(),
    end: new Date()
  });

  const toggleSection = (section: string) => {
    setIsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({
    id,
    title,
    children
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {isOpen[id] ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen[id] && (
        <div className="pb-6 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Design System</h1>
            <p className="mt-2 text-gray-600">
              Documentação dos componentes do Babá do Empreendedor
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            <Section id="buttons" title="Botões">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Variantes</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Primário</Button>
                    <Button variant="secondary">Secundário</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Estados</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled>Desabilitado</Button>
                    <Button loading>Carregando</Button>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="inputs" title="Campos de Entrada">
              <div className="space-y-4">
                <div>
                  <FormLabel>Input Padrão</FormLabel>
                  <Input placeholder="Digite algo..." />
                </div>
                <div>
                  <FormLabel>Área de Texto</FormLabel>
                  <TextArea placeholder="Digite uma descrição..." />
                </div>
                <div>
                  <FormLabel>Select</FormLabel>
                  <Select>
                    <option>Selecione uma opção</option>
                    <option>Opção 1</option>
                    <option>Opção 2</option>
                  </Select>
                </div>
                <div>
                  <FormLabel>Moeda</FormLabel>
                  <CurrencyInput
                    value="1.234,56"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </Section>

            <Section id="badges" title="Badges">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Categorias</h3>
                  <div className="flex flex-wrap gap-2">
                    <CategoryBadge category="Personal" />
                    <CategoryBadge category="Business" />
                    <CategoryBadge category="Mixed" />
                    <CategoryBadge category="Goal" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="waiting" />
                    <StatusBadge status="in_progress" />
                    <StatusBadge status="completed" />
                  </div>
                </div>
              </div>
            </Section>

            <Section id="pickers" title="Seleção de Data">
              <div className="space-y-4">
                <div>
                  <FormLabel>Date Picker</FormLabel>
                  <DatePicker
                    value={demoDate}
                    onChange={setDemoDate}
                  />
                </div>
                <div>
                  <FormLabel>Date Range Picker</FormLabel>
                  <DateRangePicker
                    startDate={demoDateRange.start}
                    endDate={demoDateRange.end}
                    onChange={setDemoDateRange}
                  />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}