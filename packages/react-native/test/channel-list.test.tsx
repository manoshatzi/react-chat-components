import React from "react";
import { Text } from "react-native";

import { ChannelList } from "../src/channel-list/channel-list";
import { lightColors } from "../src/channel-list/channel-list.style";
import { workChannels as channels } from "@pubnub/sample-data";
import { render, fireEvent } from "../mock/custom-renderer";

describe("Channel List", () => {
  test("renders channels from objects", () => {
    const { getByText } = render(<ChannelList channels={channels} />);

    expect(getByText("Introductions")).toBeTruthy();
    expect(getByText("This channel is for company wide chatter")).toBeTruthy();
  });

  test("renders channels from strings", () => {
    const { getByText } = render(<ChannelList channels={["Introductions", "Examples"]} />);

    expect(getByText("Introductions")).toBeTruthy();
  });

  test("renders current channel as active", () => {
    const { getByText } = render(<ChannelList channels={channels} />, {
      providerProps: {
        currentChannel: "space_ac4e67b98b34b44c4a39466e93e",
      },
    });

    expect(getByText("Introductions").parent.parent.parent).toHaveStyle({
      backgroundColor: lightColors.channelActiveBackground,
    });
  });

  test("renders passed in children", () => {
    const { getByText } = render(
      <ChannelList channels={channels}>
        <Text>Test String</Text>
      </ChannelList>
    );

    expect(getByText("Test String")).toBeTruthy();
  });

  test("renders with custom renderer", () => {
    const customRenderer = (channel) => <Text>Custom {channel.name}</Text>;
    const { getByText, queryByText } = render(
      <ChannelList channels={channels} channelRenderer={customRenderer} />
    );

    expect(getByText("Custom Introductions")).toBeTruthy();
    expect(queryByText("Introductions")).toBeNull();
  });

  test("emits events on channel clicks", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <ChannelList channels={channels} onChannelSwitched={handleClick} />
    );
    fireEvent.press(getByText("Introductions"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("emits nothing on channel clicks when no callback", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<ChannelList channels={channels} />);
    fireEvent.press(getByText("Introductions"));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
