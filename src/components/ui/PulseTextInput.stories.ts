import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulseTextInput } from '@/components/ui/PulseTextInput';

const meta: Meta<typeof PulseTextInput> = {
  title: 'UI/PulseTextInput',
  component: PulseTextInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'url'] },
  },
};

export default meta;
type Story = StoryObj<typeof PulseTextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your username...',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter email...',
    error: 'Invalid email address',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit',
    disabled: true,
  },
};
