import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from "react-native";
import { ChannelMetadataObject, ObjectCustom } from "pubnub";
import {
  ChannelListProps,
  useChannelListCore,
  toPascal,
  CurrentChannelAtom,
} from "@pubnub/chat-components-common";
import { useAtom } from "jotai";

export const ChannelList: FC<ChannelListProps> = (props: ChannelListProps) => {
  const { isChannelActive, channelSorter, channelFromString, switchChannel, theme } =
    useChannelListCore(props);

  const [currentChannel] = useAtom(CurrentChannelAtom);

  const renderChannel = ({ item }: { item: ChannelMetadataObject<ObjectCustom> }) => {
    const channel = item;

    if (props.channelRenderer) {
      return props.channelRenderer(channel);
    }

    return (
      <TouchableHighlight onPress={() => switchChannel(item)}>
        <View
          style={[styles.channelNormal, isChannelActive(channel) ? styles.channelActive : null]}
        >
          <Image
            style={styles.channelThumb}
            source={{
              uri: channel.custom?.thumb as string,
            }}
          />
          <Text style={styles.channelName}>{channel.name}</Text>
        </View>
      </TouchableHighlight>

      // <div
      //   key={channel.id}
      //   className={`pn-channel ${activeClass}`}
      //   onClick={() => switchChannel(channel)}
      // >
      //   {channel.custom?.thumb && (
      //     <img
      //       className="pn-channel__thumb"
      //       src={channel.custom?.thumb as string}
      //       alt="Channel thumb"
      //     />
      //   )}
      //   <div className="pn-channel__title">
      //     <p className="pn-channel__name">{channel.name}</p>
      //     {channel.description && <p className="pn-channel__description">{channel.description}</p>}
      //   </div>
      // </div>
    );
  };

  return (
    <View>
      <FlatList
        style={[styles.channelList, styles[`channelList${toPascal(theme)}`]]}
        data={(props.channels as string[]).map(channelFromString).sort(channelSorter)}
        renderItem={renderChannel}
        keyExtractor={(channel) => channel.id}
      />
      <Text>{currentChannel}</Text>
      <>{props.children}</>
    </View>
  );
};

const styles = StyleSheet.create({
  channelList: {
    backgroundColor: "white",
  },
  channelListLight: {
    backgroundColor: "blue",
  },
  channelListDark: {
    backgroundColor: "black",
  },
  channelListEventDark: {
    backgroundColor: "gray",
  },
  channelNormal: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  channelName: {
    color: "black",
    fontSize: 15,
  },
  channelThumb: {
    borderRadius: 50,
    height: 36,
    marginRight: 20,
    width: 36,
  },
});
