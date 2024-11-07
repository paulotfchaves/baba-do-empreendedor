import type { Meta, StoryObj } from '@storybook/react';
import { Input, TextArea, Select, Checkbox, Radio, FormLabel } from '../components/shared/FormStyles';
import { Mail } from 'lucide-react';

const meta = {
  title: 'Components/Form Elements',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const InputWithIcon: Story = {
  args: {
    placeholder: 'Digite seu email',
    leftIcon: <Mail className="w-5 h-5" />,
  },
};

export const InputWithError: Story = {
  args: {
    placeholder: 'Digite algo...',
    error: 'Este campo é obrigatório',
  },
};

export const BasicTextArea: Story = {
  render: () => (
    <TextArea
      placeholder="Digite uma descrição..."
    />
  ),
};

export const BasicSelect: Story = {
  render: () => (
    <Select>
      <option value="">Selecione uma opção</option>
      <option value="1">Opção 1</option>
      <option value="2">Opção 2</option>
    </Select>
  ),
};

export const BasicCheckbox: Story = {
  render: () => (
    <Checkbox
      label="Aceito os termos e condições"
    />
  ),
};

export const BasicRadio: Story = {
  render: () => (
    <Radio
      name="option"
      label="Opção 1"
    />
  ),
};

export const FormLabelExample: Story = {
  render: () => (
    <FormLabel required>Nome completo</FormLabel>
  ),
};