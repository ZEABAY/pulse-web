import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ForgotPasswordCard } from '@/components/auth/ForgotPasswordCard';

const meta: Meta<typeof ForgotPasswordCard> = {
  title: 'Auth/ForgotPasswordCard',
  component: ForgotPasswordCard,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    formError: { control: 'text' },
  },
  args: {
    onSubmit: fn(),
    onBackToLogin: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    formError: 'Something went wrong. Please try again.',
  },
};
