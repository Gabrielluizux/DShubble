import { useEffect } from "react";
import "./styles.css";
import type { Preview } from "@storybook/react-vite";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light" },
        { value: "dark", icon: "moon", title: "Dark" },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => {
        const groupOrder = ["Foundations", "Components"];
        const groupA = a.title.split("/")[0];
        const groupB = b.title.split("/")[0];
        if (groupA !== groupB) {
          return groupOrder.indexOf(groupA) - groupOrder.indexOf(groupB);
        }
        return a.title.localeCompare(b.title, undefined, { numeric: true });
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === "dark";
      useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
      }, [isDark]);
      return <Story />;
    },
  ],
};

export default preview;
