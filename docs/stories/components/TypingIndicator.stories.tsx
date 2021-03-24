import React from "react";
import { Story, Meta } from "@storybook/react";
import { TypingIndicator, TypingIndicatorProps } from "@pubnub/react-chat-components";

export default {
  title: "Components/Typing Indicator",
  component: TypingIndicator,
} as Meta;

const Template: Story<TypingIndicatorProps> = (args) => <TypingIndicator {...args} />;

export const Default = Template.bind({});
