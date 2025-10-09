import type { Meta, StoryObj } from "@storybook/react";
import { OctaneText } from "./octane-text";

const meta: Meta<typeof OctaneText> = {
  title: "Octane/OctaneText",
  component: OctaneText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomText: Story = {
  args: {},
  render: () => (
    <div>
      <OctaneText />
      <p style={{ marginTop: "16px", color: "#666" }}>
        This is the default OctaneText component
      </p>
    </div>
  ),
};
