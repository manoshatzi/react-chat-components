import React from "react";
import { Story, Meta } from "@storybook/react";
// importing with @pubnub/react-chat-components breaks the prop tables
import { Chat, ChatProps } from "../../../packages/react/src";

export default {
  title: "Components/Chat (Provider)",
  component: Chat,
} as Meta;

const Template: Story<ChatProps> = (args) => <Chat {...args} />;

export const Default = Template.bind({});
