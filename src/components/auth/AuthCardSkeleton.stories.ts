import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AuthCardSkeleton } from '@/components/auth/AuthCardSkeleton';

const meta: Meta<typeof AuthCardSkeleton> = {
  title: 'Auth/AuthCardSkeleton',
  component: AuthCardSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthCardSkeleton>;

export const Default: Story = {};
