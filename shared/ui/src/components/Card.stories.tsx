import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Card
export const Default: Story = {
  args: {
    children: <p>This is a default card with medium shadow and medium padding.</p>,
  },
};

// Card with no padding
export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div className="p-4">
        <p>This card has no default padding.</p>
      </div>
    ),
  },
};

// Card with small padding
export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: <p>This card has small padding.</p>,
  },
};

// Card with large padding
export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: <p>This card has large padding.</p>,
  },
};

// Card shadows
export const SmallShadow: Story = {
  args: {
    shadow: 'sm',
    children: <p>Card with small shadow.</p>,
  },
};

export const LargeShadow: Story = {
  args: {
    shadow: 'lg',
    children: <p>Card with large shadow.</p>,
  },
};

export const ExtraLargeShadow: Story = {
  args: {
    shadow: 'xl',
    children: <p>Card with extra large shadow.</p>,
  },
};

// Card with custom className
export const CustomStyled: Story = {
  args: {
    className: 'bg-gradient-to-r from-purple-400 to-pink-400 text-white',
    children: <p className="font-semibold">This is a custom styled card with gradient background!</p>,
  },
};

// Complex Card
export const ComplexCard: Story = {
  render: () => (
    <Card shadow="lg" padding="lg">
      <h3 className="text-xl font-bold mb-3">Card Title</h3>
      <p className="text-gray-600 mb-4">
        This is a more complex card example with multiple elements inside.
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Last updated: 2 hours ago</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Action
        </button>
      </div>
    </Card>
  ),
};

// All Shadows
export const AllShadows: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <Card shadow="sm" padding="md">
        <p>Small Shadow</p>
      </Card>
      <Card shadow="md" padding="md">
        <p>Medium Shadow</p>
      </Card>
      <Card shadow="lg" padding="md">
        <p>Large Shadow</p>
      </Card>
      <Card shadow="xl" padding="md">
        <p>Extra Large Shadow</p>
      </Card>
    </div>
  ),
};