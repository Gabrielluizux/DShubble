import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/registry/default/ui/carousel/carousel";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const isVertical = args.orientation === "vertical";
    return (
      <div
        className="carousel-demo-wrapper"
        style={{ width: 280, height: isVertical ? 360 : undefined }}
      >
        {isVertical && (
          <style>{`.carousel-demo-wrapper [data-slot="carousel-content"] { height: 100%; }`}</style>
        )}
        <Carousel
          {...args}
          opts={{ loop: true }}
          style={{ width: "100%", height: isVertical ? "100%" : undefined }}
        >
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((index) => (
              <CarouselItem key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 160,
                    borderRadius: 8,
                    background: "var(--color-accent-2)",
                    fontSize: 24,
                  }}
                >
                  {index}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
};
