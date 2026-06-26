import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/registry/default/ui/field/field";
import { Input } from "@/registry/default/ui/input/input";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  args: { orientation: "vertical" },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FieldSet style={{ width: 320 }}>
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <FieldContent>
            <Input id="field-name" placeholder="Jane Doe" />
            <FieldDescription>Your full legal name.</FieldDescription>
          </FieldContent>
        </Field>
        <Field {...args} data-invalid>
          <FieldLabel htmlFor="field-email">Email</FieldLabel>
          <FieldContent>
            <Input id="field-email" aria-invalid placeholder="jane@example.com" />
            <FieldError>Enter a valid email address.</FieldError>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
