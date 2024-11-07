import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '../components/shared/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: new Date(),
    onChange: (date) => console.log('Selected date:', date),
  },
};

export const WithLabel: Story = {
  args: {
    value: new Date(),
    onChange: (date) => console.log('Selected date:', date),
    label: 'Data de nascimento',
  },
};

export const Required: Story = {
  args: {
    value: new Date(),
    onChange: (date) => console.log('Selected date:', date),
    label: 'Data de nascimento',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    value: new Date(),
    onChange: (date) => console.log('Selected date:', date),
    label: 'Data de nascimento',
    error: 'Data inválida',
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(),
    onChange: (date) => console.log('Selected date:', date),
    label: 'Data de nascimento',
    disabled: true,
  },
};