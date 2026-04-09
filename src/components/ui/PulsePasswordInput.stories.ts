import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulsePasswordInput } from '@/components/ui/PulsePasswordInput';

const meta: Meta<typeof PulsePasswordInput> = {
  title: 'UI/PulsePasswordInput',
  component: PulsePasswordInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PulsePasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your password...',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Password...',
    error: 'Password must be at least 8 characters',
  },
};
