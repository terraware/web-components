// YourComponent.stories.js

import { Story } from "@storybook/react";
import React from "react";
import Button, { Props as ButtonProps } from "../components/Button/Button";

//👇 This default export determines where your story goes in the story list
export default {
  title: "Button",
  component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = (args) => {
  return <Button {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  label: "Label",
};
