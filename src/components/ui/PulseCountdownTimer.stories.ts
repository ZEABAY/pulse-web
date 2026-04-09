import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { PulseCountdownTimer } from '@/components/ui/PulseCountdownTimer';

const meta: Meta<typeof PulseCountdownTimer> = {
  title: 'UI/PulseCountdownTimer',
  component: PulseCountdownTimer,
  tags: ['autodocs'],
  argTypes: {
    initialSeconds: { control: { type: 'number', min: 1, max: 300 } },
    resendText: { control: 'text' },
    isResending: { control: 'boolean' },
  },
  args: {
    onComplete: fn(),
    onResend: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof PulseCountdownTimer>;

export const Counting: Story = {
  args: {
    initialSeconds: 180,
    resendText: 'Resend Code',
  },
};

export const ShortTimer: Story = {
  args: {
    initialSeconds: 5,
    resendText: 'Resend Code',
  },
};
