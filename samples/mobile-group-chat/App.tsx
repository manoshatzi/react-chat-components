import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Switch, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, ChannelList } from "@pubnub/react-native-chat-components";
import { socialChannels } from "@pubnub/sample-data";

const pubnub = new PubNub({
  publishKey: "pub-c-2e4f37a4-6634-4df6-908d-32eb38d89a1b",
  subscribeKey: "sub-c-1456a186-fd7e-11ea-ae2d-56dc81df9fb5",
});

export function SimpleChat({ theme }: { theme: string }): JSX.Element {
  const [currentChannel, setCurrentChannel] = useState(socialChannels[0]);

  return (
    <Chat currentChannel={currentChannel.id} theme={theme}>
      <ChannelList
        channels={socialChannels}
        onChannelSwitched={(channel) => setCurrentChannel(channel)}
      />
    </Chat>
  );
}

export default function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, darkMode && styles.safeAreaDark]}>
      <PubNubProvider client={pubnub}>
        <SimpleChat theme={darkMode ? "dark" : "light"} />
      </PubNubProvider>
      <View style={styles.switchView}>
        <Text style={[styles.switchLabel, darkMode && styles.switchLabelDark]}>Dark theme</Text>
        <Switch onValueChange={() => setDarkMode(!darkMode)} value={darkMode} />
      </View>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 0,
  },
  safeAreaDark: {
    backgroundColor: "#292b2f",
  },
  switchView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  switchLabel: {
    color: "#585858",
    fontSize: 15,
    fontWeight: "500",
    paddingRight: 15,
  },
  switchLabelDark: {
    color: "#ffffff",
  },
});
