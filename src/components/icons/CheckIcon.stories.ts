import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckIcon } from '@/components/icons/CheckIcon';

const meta: Meta<typeof CheckIcon> = {
  title: 'Icons/CheckIcon',
  component: CheckIcon,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckIcon>;

export const Default: Story = {
  args: {
    className: 'w-6 h-6 text-success',
  },
};

export const Large: Story = {
  args: {
    className: 'w-12 h-12 text-primary',
  },
};
