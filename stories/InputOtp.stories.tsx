import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/registry/default/ui/input-otp/input-otp";

const meta = {
  title: "Components/Input OTP",
  component: InputOTP,
  tags: ["autodocs"],
  args: { size: "default" },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "large", "small", "mini"],
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ size }) => (
    <InputOTP maxLength={6} size={size}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};
