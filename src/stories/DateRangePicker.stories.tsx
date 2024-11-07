import type { Meta, StoryObj } from '@storybook/react';
import DateRangePicker from '../components/shared/DateRangePicker';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    onChange: (range) => console.log('Selected range:', range),
  },
};

export const WithLabel: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    onChange: (range) => console.log('Selected range:', range),
    label: 'Período',
  },
};

export const Required: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    onChange: (range) => console.log('Selected range:', range),
    label: 'Período',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    onChange: (range) => console.log('Selected range:', range),
    label: 'Período',
    error: 'Período inválido',
  },
};

export const Disabled: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    onChange: (range) => console.log('Selected range:', range),
    label: 'Período',
    disabled: true,
  },
};