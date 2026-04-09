import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulseSkeleton } from '@/components/ui/PulseSkeleton';

const meta: Meta<typeof PulseSkeleton> = {
  title: 'UI/PulseSkeleton',
  component: PulseSkeleton,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PulseSkeleton>;

export const Line: Story = {
  args: {
    className: 'h-4 w-48',
  },
};

export const Circle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const Card: Story = {
  args: {
    className: 'h-32 w-full max-w-md',
  },
};
