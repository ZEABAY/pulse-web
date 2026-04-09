import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { RegisterCard } from '@/components/auth/RegisterCard';

const meta: Meta<typeof RegisterCard> = {
  title: 'Auth/RegisterCard',
  component: RegisterCard,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    formError: { control: 'text' },
  },
  args: {
    onSubmit: fn(),
    onSwitchToLogin: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof RegisterCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    formError: 'Registration failed. Please try again.',
  },
};
