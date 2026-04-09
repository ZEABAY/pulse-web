import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PulseThemeToggle } from '@/components/ui/PulseThemeToggle';

const meta: Meta<typeof PulseThemeToggle> = {
  title: 'UI/PulseThemeToggle',
  component: PulseThemeToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PulseThemeToggle>;

export const Default: Story = {};
