import React from "react";

import { ChannelList } from "../src/channel-list/channel-list";
import { workChannels as channels } from "@pubnub/sample-data";
import { render } from "../mock/custom-renderer";

describe("Channel List", () => {
  test("renders channels from objects", () => {
    const { getByText } = render(<ChannelList channels={channels} />);

    expect(getByText("Introductions")).toBeTruthy();
    expect(getByText("This channel is for company wide chatter")).toBeTruthy();
  });
});
