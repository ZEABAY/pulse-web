import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ResetPasswordCard } from '@/components/auth/ResetPasswordCard';

const meta: Meta<typeof ResetPasswordCard> = {
  title: 'Auth/ResetPasswordCard',
  component: ResetPasswordCard,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    formError: { control: 'text' },
    email: { control: 'text' },
    otp: { control: 'text' },
  },
  args: {
    onSubmit: fn(),
    email: 'user@example.com',
    otp: '123456',
  },
};

export default meta;
type Story = StoryObj<typeof ResetPasswordCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    formError: 'Password reset failed.',
  },
};
