import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import PubNub, { ChannelMetadataObject, ObjectCustom } from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { socialChannels } from "@pubnub/sample-data";
import { Chat } from "@pubnub/chat-components-common";
import { ChannelList } from "./src/channel-list";

const socialChannelList: ChannelMetadataObject<ObjectCustom>[] = socialChannels;

const pubnub = new PubNub({
  publishKey: "pub-c-2e4f37a4-6634-4df6-908d-32eb38d89a1b",
  subscribeKey: "sub-c-1456a186-fd7e-11ea-ae2d-56dc81df9fb5",
  uuid: "react-native",
});

const App = () => {
  const [channel, setChannel] = useState("hello");

  return (
    <PubNubProvider client={pubnub}>
      <SafeAreaView>
        <Chat theme="event-dark" currentChannel={channel}>
          <ChannelList
            channels={socialChannelList}
            onChannelSwitched={(channel) => setChannel(channel)}
          />
        </Chat>
      </SafeAreaView>
    </PubNubProvider>
  );
};

export default App;
