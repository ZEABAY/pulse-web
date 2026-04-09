import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulseLogo } from '@/components/ui/PulseLogo';

const meta: Meta<typeof PulseLogo> = {
  title: 'UI/PulseLogo',
  component: PulseLogo,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PulseLogo>;

export const Default: Story = {
  args: {
    className: 'w-16 h-16',
  },
};

export const Large: Story = {
  args: {
    className: 'w-32 h-32',
  },
};

export const ErrorColor: Story = {
  args: {
    className: 'w-16 h-16 bg-error',
  },
};
