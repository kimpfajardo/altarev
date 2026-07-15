import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "../index";

const meta = {
  title: "Altarev/Container",
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="rounded-[8px] bg-surface p-6 text-sm text-text">
        This content is centered and constrained to the container max width with
        responsive horizontal padding.
      </div>
    </Container>
  ),
};

export const WithGridContent: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Revenue", "Retention", "Expansion"].map((item) => (
          <div
            key={item}
            className="rounded-[8px] bg-surface p-6 text-md font-bold text-text"
          >
            {item}
          </div>
        ))}
      </div>
    </Container>
  ),
};
