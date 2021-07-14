import React, { ReactNode } from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { render } from "@testing-library/react-native";
import { Chat, ChatProps } from "@pubnub/chat-components-common";
import { PubNubMock } from "./pubnub-mock";

const pubnub = PubNubMock() as PubNub;

const defaultOptions = {
  providerProps: {
    currentChannel: "test-general",
  },
};

const customRender = (ui: ReactNode, options: { providerProps: ChatProps } = defaultOptions) => {
  const { providerProps, ...renderOptions } = options;

  return render(
    <PubNubProvider client={pubnub}>
      <Chat {...providerProps}>{ui}</Chat>
    </PubNubProvider>,
    renderOptions
  );
};

export * from "@testing-library/react-native";
export { customRender as render };
