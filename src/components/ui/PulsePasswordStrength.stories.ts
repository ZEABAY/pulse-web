import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulsePasswordStrength } from '@/components/ui/PulsePasswordStrength';

const meta: Meta<typeof PulsePasswordStrength> = {
  title: 'UI/PulsePasswordStrength',
  component: PulsePasswordStrength,
  tags: ['autodocs'],
  argTypes: {
    password: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PulsePasswordStrength>;

export const Empty: Story = {
  args: {
    password: '',
  },
};

export const VeryWeak: Story = {
  args: {
    password: 'abc',
  },
};

export const Weak: Story = {
  args: {
    password: 'abcdefgh',
  },
};

export const Fair: Story = {
  args: {
    password: 'Abcdefgh',
  },
};

export const Good: Story = {
  args: {
    password: 'Abcdefg1',
  },
};

export const Strong: Story = {
  args: {
    password: 'Abcdefg1!',
  },
};
