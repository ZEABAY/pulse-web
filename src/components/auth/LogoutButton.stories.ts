import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LogoutButton } from '@/components/auth/LogoutButton';

const meta: Meta<typeof LogoutButton> = {
  title: 'Auth/LogoutButton',
  component: LogoutButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {};
