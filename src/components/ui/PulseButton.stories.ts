import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulseButton } from '@/components/ui/PulseButton';

const meta: Meta<typeof PulseButton> = {
  title: 'UI/PulseButton',
  component: PulseButton,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PulseButton>;

export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

export const Loading: Story = {
  args: {
    children: 'Submitting...',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
