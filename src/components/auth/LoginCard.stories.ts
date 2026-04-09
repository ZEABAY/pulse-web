import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { LoginCard } from '@/components/auth/LoginCard';

const meta: Meta<typeof LoginCard> = {
  title: 'Auth/LoginCard',
  component: LoginCard,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    formError: { control: 'text' },
  },
  args: {
    onSubmit: fn(),
    onSwitchToRegister: fn(),
    onSwitchToForgotPassword: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof LoginCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    formError: 'Login failed. Please check your credentials.',
  },
};
