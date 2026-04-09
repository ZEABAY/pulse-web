import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { PulseOtpInput } from '@/components/ui/PulseOtpInput';

const meta: Meta<typeof PulseOtpInput> = {
  title: 'UI/PulseOtpInput',
  component: PulseOtpInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } },
    value: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof PulseOtpInput>;

export const Default: Story = {
  args: {
    length: 6,
    value: '',
  },
};

export const Prefilled: Story = {
  args: {
    length: 6,
    value: '123456',
  },
};

export const WithError: Story = {
  args: {
    length: 6,
    value: '999',
    error: 'Invalid code',
  },
};

export const Disabled: Story = {
  args: {
    length: 6,
    value: '123',
    disabled: true,
  },
};

export const FourDigit: Story = {
  args: {
    length: 4,
    value: '',
  },
};
