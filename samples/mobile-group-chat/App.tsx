import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, ChannelList } from "@pubnub/react-native-chat-components";
import { socialChannels } from "@pubnub/sample-data";

const pubnub = new PubNub({
  publishKey: "pub-c-2e4f37a4-6634-4df6-908d-32eb38d89a1b",
  subscribeKey: "sub-c-1456a186-fd7e-11ea-ae2d-56dc81df9fb5",
});

function SimpleChat(): JSX.Element {
  return (
    <Chat currentChannel="space_5f3547a18f448e567e84ba097db">
      <ChannelList channels={socialChannels} style={channelListStyles} />
    </Chat>
  );
}

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PubNubProvider client={pubnub}>
        <SimpleChat />
      </PubNubProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

const channelListStyles = StyleSheet.create({
  // channelActive: {
  //   backgroundColor: "red",
  // },
});
