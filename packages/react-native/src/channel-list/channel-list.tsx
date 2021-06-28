import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  ListRenderItem,
} from "react-native";

import { ChannelMetadataObject, ObjectCustom } from "pubnub";
import { ChannelListProps, useChannelListCore, toPascal } from "@pubnub/chat-components-common";

export const ChannelList: FC<ChannelListProps> = (props: ChannelListProps) => {
  const { isChannelActive, channelSorter, channelFromString, switchChannel, theme } =
    useChannelListCore(props);

  const renderChannel: ListRenderItem<ChannelMetadataObject<ObjectCustom>> = ({ item }) => {
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
          <View>
            <Text style={styles.channelName}>{channel.name}</Text>
            {channel.description && (
              <Text style={styles.channelDescription}>{channel.description}</Text>
            )}
            <Text>{isChannelActive(item) ? "active" : "non-active"}</Text>
          </View>
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
    <View style={styles.channelListWrapper}>
      <FlatList
        style={[styles.channelList, styles[`channelList${toPascal(theme)}`]]}
        data={(props.channels as string[]).map(channelFromString).sort(channelSorter)}
        renderItem={renderChannel}
        keyExtractor={(channel) => channel.id}
      />
      <>{props.children}</>
    </View>
  );
};

const styles = StyleSheet.create({
  channelListWrapper: {
    flex: 1,
  },
  channelList: {
    backgroundColor: "#ffffff",
  },
  channelListLight: {},
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
  channelActive: {
    backgroundColor: "red",
  },
  channelName: {
    color: "black",
    fontSize: 15,
  },
  channelDescription: {},
  channelThumb: {
    borderRadius: 50,
    height: 36,
    marginRight: 20,
    width: 36,
  },
});
