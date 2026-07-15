import "../src/styles.css";

import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8 font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview;
