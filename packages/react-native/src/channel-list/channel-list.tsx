import React, { FC, useState, useEffect } from "react";
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
  const [style, setStyle] = useState(defaultStyle);
  const { isChannelActive, channelSorter, channelFromString, switchChannel, theme } =
    useChannelListCore(props);

  useEffect(() => {
    setStyle(Object.assign({}, defaultStyle, props.style));
  }, [setStyle, props.style]);

  const renderChannel: ListRenderItem<ChannelMetadataObject<ObjectCustom>> = ({ item }) => {
    const channel = item;

    if (props.channelRenderer) {
      return props.channelRenderer(channel);
    }

    return (
      <TouchableHighlight onPress={() => switchChannel(item)}>
        <View style={[style.channelNormal, isChannelActive(channel) ? style.channelActive : null]}>
          <Image
            style={style.channelThumb}
            source={{
              uri: channel.custom?.thumb as string,
            }}
          />
          <View>
            <Text style={style.channelName}>{channel.name}</Text>
            {channel.description && (
              <Text style={style.channelDescription}>{channel.description}</Text>
            )}
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
