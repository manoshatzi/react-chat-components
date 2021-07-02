import React from "react";
import { PubNubProvider } from "pubnub-react";

import { Chat } from "../packages/react/src";
import { PubNubMock } from "../packages/react/mock/pubnub-mock";
import { rawUsers } from "@pubnub/sample-data";

const pubnub = new PubNubMock();

export const decorators = [
  (Story, context) => (
    <PubNubProvider client={pubnub}>
      <Chat
        {...{
          currentChannel: "space_ac4e67b98b34b44c4a39466e93e",
          theme: context.parameters.theme || "light",
          users: rawUsers,
        }}
      >
        <Story />
      </Chat>
    </PubNubProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: "docs",
  options: {
    storySort: {
      order: [
        "Introduction",
        ["About", "Usage", "Metadata", "Emoji Pickers", "Error Handling"],
        "Custom Hooks",
        [
          "About",
          "useUsers",
          "useUser",
          "useChannels",
          "useChannelMembers",
          "useUserMemberships",
          "usePresence",
        ],
        "Components",
        ["Chat (Provider)"],
        "UI Customization",
        ["Themes", "CSS Variables", "Custom Renderers"],
      ],
    },
  },
};
