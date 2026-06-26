import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "@/registry/default/ui/calendar/calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  args: { showOutsideDays: true, disabled: false, isRange: false },
  argTypes: {
    showOutsideDays: { control: "boolean" },
    disabled: { control: "boolean" },
    isRange: { control: "boolean", name: "Range selection" },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function CalendarDemo() {
      const [singleSelected, setSingleSelected] = useState<Date | undefined>(
        new Date(),
      );
      const [rangeSelected, setRangeSelected] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      });

      const shared = {
        showOutsideDays: args.showOutsideDays,
        disabled: args.disabled ? () => true : undefined,
      };

      if (args.isRange) {
        return (
          <Calendar
            mode="range"
            selected={rangeSelected}
            onSelect={setRangeSelected}
            {...shared}
          />
        );
      }

      return (
        <Calendar
          mode="single"
          selected={singleSelected}
          onSelect={setSingleSelected}
          {...shared}
        />
      );
    }
    return <CalendarDemo />;
  },
};
