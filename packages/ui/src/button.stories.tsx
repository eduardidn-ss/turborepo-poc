import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    appName: {
      control: "text",
      description: "Name of the app using this button",
    },
    showVersion: {
      control: "boolean",
      description: "Whether to show version information",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Click me",
    appName: "Demo App",
    showVersion: false,
  },
};

// Button with version info
export const WithVersion: Story = {
  args: {
    children: "Click me",
    appName: "Demo App",
    showVersion: true,
  },
};

// Different app names
export const FilmApp: Story = {
  args: {
    children: "Watch Movie",
    appName: "Film App",
    showVersion: true,
  },
};

export const WebApp: Story = {
  args: {
    children: "Get Started",
    appName: "Web App",
    showVersion: true,
  },
};

export const DemoZoneApp: Story = {
  args: {
    children: "Enter Demo",
    appName: "Demo Zone",
    showVersion: true,
  },
};

// Styled variants
export const Styled: Story = {
  args: {
    children: "Styled Button",
    appName: "Styled App",
    showVersion: true,
    className:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  },
};

export const CustomStyled: Story = {
  args: {
    children: "Custom Button",
    appName: "Custom App",
    showVersion: true,
    className:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg",
  },
};

// Different content types
export const WithIcon: Story = {
  args: {
    children: "🚀 Launch",
    appName: "Rocket App",
    showVersion: true,
  },
};

export const LongText: Story = {
  args: {
    children: "This is a button with very long text content",
    appName: "Long Text App",
    showVersion: true,
  },
};

// Interactive states
export const WithoutVersion: Story = {
  args: {
    children: "Simple Button",
    appName: "Simple App",
    showVersion: false,
  },
};

// Size variants (using Tailwind classes)
export const Small: Story = {
  args: {
    children: "Small",
    appName: "Size Demo",
    showVersion: true,
    className: "text-sm py-1 px-2",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    appName: "Size Demo",
    showVersion: true,
    className: "text-lg py-4 px-8",
  },
};

// Color variants
export const Primary: Story = {
  args: {
    children: "Primary",
    appName: "Color Demo",
    showVersion: true,
    className:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    appName: "Color Demo",
    showVersion: true,
    className:
      "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    appName: "Color Demo",
    showVersion: true,
    className:
      "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    appName: "Color Demo",
    showVersion: true,
    className:
      "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    appName: "Color Demo",
    showVersion: true,
    className:
      "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button appName="Variant 1" showVersion={false}>
        No Version
      </Button>
      <Button appName="Variant 2" showVersion={true}>
        With Version
      </Button>
      <Button
        appName="Variant 3"
        showVersion={true}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Styled
      </Button>
      <Button
        appName="Variant 4"
        showVersion={true}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded"
      >
        Gradient
      </Button>
    </div>
  ),
};
