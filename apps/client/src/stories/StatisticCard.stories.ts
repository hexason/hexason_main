import type { Meta, StoryObj } from "@storybook/react";
import { StatisticCard } from "@/components/core/Dashboard/StatisticCard";

const meta: Meta<typeof StatisticCard> = {
  title: "Example/StatisticCard",
  component: StatisticCard,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StatisticCard>;

export const Primary: Story = {
  args: {
    label: "Нэмэгдсэн хэрэглэгч",
    value: 10,
    isUp: true,
    // onC  lick: () => alert("hello"),
  },
};
