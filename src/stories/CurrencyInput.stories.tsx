import type { Meta, StoryObj } from '@storybook/react';
import CurrencyInput from '../components/shared/CurrencyInput';

const meta = {
  title: 'Components/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Value:', value),
  },
};

export const WithValue: Story = {
  args: {
    value: '1.234,56',
    onChange: (value) => console.log('Value:', value),
  },
};

export const WithError: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Value:', value),
    error: 'Valor inválido',
  },
};

export const Required: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Value:', value),
    required: true,
  },
};