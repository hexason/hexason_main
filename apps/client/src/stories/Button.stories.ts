import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@chakra-ui/react";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    onClick: () => alert("hello"),
  },
};
