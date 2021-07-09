import React, { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, Pressable, ListRenderItem } from "react-native";
import { ChannelMetadataObject, ObjectCustom } from "pubnub";
import { ChannelListCoreProps, useChannelListCore, toPascal } from "@pubnub/chat-components-common";
import defaultStyle from "./channel-list.style";

export type ChannelListProps = ChannelListCoreProps & {
  style: StyleSheet;
};

/**
 * Renders an interactive list of channels. It can represent all channels of the application, only
 * channels joined by the current user, all channels available to be joined or whatever else is
 * passed into it. A common patttern in Chat Applications is to render two instances of the
 * component - one visible all the time to show joined channels, and another one hidden inside of a
 * modal with channels available to join. Make sure to handle onChannelSwitched event to switch
 * current channel passed to the Chat provider, or whatever else is expected.
 */
export const ChannelList: FC<ChannelListProps> = (props: ChannelListProps) => {
  const { isChannelActive, channelSorter, channelFromString, switchChannel, theme } =
    useChannelListCore(props);
  const [style, setStyle] = useState(defaultStyle(theme));

  useEffect(() => {
    setStyle(Object.assign({}, defaultStyle(theme), props.style));
  }, [setStyle, props.style, theme]);

  const renderChannel: ListRenderItem<ChannelMetadataObject<ObjectCustom>> = ({ item }) => {
    const channel = item;

    if (props.channelRenderer) {
      return props.channelRenderer(channel);
    }

    return (
      <Pressable
        onPress={() => switchChannel(channel)}
        style={({ pressed }) => [
          style.channel,
          isChannelActive(channel) ? style.channelActive : {},
          pressed ? style.channelPressed : {},
        ]}
      >
        {({ pressed }) => (
          <>
            {channel.custom?.thumb && (
              <Image style={style.channelThumb} source={{ uri: channel.custom?.thumb as string }} />
            )}
            <View>
              <Text
                style={[
                  style.channelName,
                  pressed ? style.channelNamePressed : {},
                  isChannelActive(channel) ? style.channelNameActive : {},
                ]}
              >
                {channel.name}
              </Text>
              {channel.description && (
                <Text
                  style={[
                    style.channelDescription,
                    pressed ? style.channelDescriptionPressed : {},
                    isChannelActive(channel) ? style.channelDescriptionActive : {},
                  ]}
                >
                  {channel.description}
                </Text>
              )}
            </View>
          </>
        )}
      </Pressable>
    );
  };

  return (
    <View style={style.channelListWrapper}>
      <FlatList
        style={[style.channelList, style[`channelList${toPascal(theme)}`]]}
        data={(props.channels as string[]).map(channelFromString).sort(channelSorter)}
        renderItem={renderChannel}
        keyExtractor={(channel) => channel.id}
      />
      <>{props.children}</>
    </View>
  );
};
