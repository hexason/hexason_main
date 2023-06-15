import type { Meta, StoryObj } from "@storybook/react";
import { Chart } from "@/components/core/Dashboard/Chart";

const meta: Meta<typeof Chart> = {
  title: "Example/Chart",
  component: Chart,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Primary: Story = {
  args: {
    series: [0, 1, 2, 2, 34, 5, 23, 4, 5, 6, 29, 3, 92],
  },
};
