import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulseSpinner } from '@/components/ui/PulseSpinner';

const meta: Meta<typeof PulseSpinner> = {
  title: 'UI/PulseSpinner',
  component: PulseSpinner,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PulseSpinner>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    className: 'w-12 h-12',
  },
};
