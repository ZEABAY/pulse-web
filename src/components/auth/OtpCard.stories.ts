import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { OtpCard } from '@/components/auth/OtpCard';

const meta: Meta<typeof OtpCard> = {
  title: 'Auth/OtpCard',
  component: OtpCard,
  tags: ['autodocs'],
  argTypes: {
    email: { control: 'text' },
    length: { control: { type: 'number', min: 4, max: 8 } },
    isLoading: { control: 'boolean' },
    isResending: { control: 'boolean' },
    formError: { control: 'text' },
  },
  args: {
    onSubmit: fn(),
    onResend: fn(),
    onBack: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof OtpCard>;

export const Default: Story = {
  args: {
    email: 'user@example.com',
    length: 6,
  },
};

export const Loading: Story = {
  args: {
    email: 'user@example.com',
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    email: 'user@example.com',
    formError: 'Invalid verification code.',
  },
};

export const WithoutResendHandler: Story = {
  args: {
    email: 'user@example.com',
    onResend: undefined,
  },
};
