import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';
import { Card } from './Card';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div style={{ width: '300px' }}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Input
export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

// Input with Label
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
  },
};

// Password Input
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

// Email Input
export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'john@example.com',
  },
};

// Number Input
export const Number: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
  },
};

// Input with Error
export const WithError: Story = {
  args: {
    label: 'Username',
    value: 'john',
    error: 'Username must be at least 6 characters',
  },
};

// Disabled Input
export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'This field is disabled',
    disabled: true,
  },
};

// Input with Initial Value
export const WithValue: Story = {
  args: {
    label: 'First Name',
    value: 'John',
  },
};

// Custom Styled Input
export const CustomStyled: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    className: 'border-2 border-purple-500 focus:ring-purple-500',
  },
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
    });
    const [errors, setErrors] = useState({
      email: '',
      password: '',
      name: '',
    });

    const validateForm = () => {
      const newErrors = {
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        name: !formData.name ? 'Name is required' : '',
      };
      setErrors(newErrors);
    };

    return (
      <Card className="w-96 space-y-4">
        <h3 className="text-xl font-bold">Registration Form</h3>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            errors.name && setErrors({ ...errors, name: '' });
          }}
          error={errors.name}
          placeholder="Enter your full name"
        />
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            errors.email && setErrors({ ...errors, email: '' });
          }}
          error={errors.email}
          placeholder="Enter your email"
        />
        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            errors.password && setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
          placeholder="Enter your password"
        />
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={validateForm}
        >
          Validate Form
        </button>
      </Card>
    );
  },
};