import React from "react";

import Button from "./Button";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
  },
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Basic = (args) => {
  return <Button {...args} type="submit" />;
};

Basic.args = {
  text: "Click",
  size: "large",
  buttonStyle: {
    buttonSelectedType: "danger",
    buttonSelectedStyle: "outline",
  },
};

// export const Primary = {
//   render: () => <Button />,
// };
