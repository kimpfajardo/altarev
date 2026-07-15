import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel } from "../index";

function Slide({ label }: { label: string }) {
  return (
    <div className="flex h-32 w-64 items-center justify-center rounded-[8px] bg-surface text-lg font-bold text-text">
      {label}
    </div>
  );
}

const slides = ["Revenue", "Retention", "Expansion", "Pipeline"];

const meta = {
  title: "Altarev/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Highlights",
    autoSlide: false,
    className: "w-full max-w-2xl",
    children: slides.map((label) => <Slide key={label} label={label} />),
  },
};

export const WithDescription: Story = {
  args: {
    title: "Highlights",
    description: "Key metrics from this quarter.",
    seeAllHref: "#",
    autoSlide: false,
    className: "w-full max-w-2xl",
    children: slides.map((label) => <Slide key={label} label={label} />),
  },
};

export const NoArrows: Story = {
  args: {
    title: "Highlights",
    arrows: false,
    autoSlide: false,
    className: "w-full max-w-2xl",
    children: slides.map((label) => <Slide key={label} label={label} />),
  },
};
