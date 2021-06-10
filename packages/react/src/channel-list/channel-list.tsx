import React, { FC } from "react";
import { ChannelMetadataObject, ObjectCustom } from "pubnub";
import { ChannelListProps, useChannelListCore } from "@pubnub/chat-components-common";
import "./channel-list.scss";

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

  const renderChannel = (channel: ChannelMetadataObject<ObjectCustom>) => {
    if (props.channelRenderer) return props.channelRenderer(channel);
    const channelActive = isChannelActive(channel);
    const activeClass = channelActive ? "pn-channel--active" : "";

    return (
      <div
        key={channel.id}
        className={`pn-channel ${activeClass}`}
        onClick={() => switchChannel(channel)}
      >
        {channel.custom?.thumb && (
          <img
            className="pn-channel__thumb"
            src={channel.custom?.thumb as string}
            alt="Channel thumb"
          />
        )}
        <div className="pn-channel__title">
          <p className="pn-channel__name">{channel.name}</p>
          {channel.description && <p className="pn-channel__description">{channel.description}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className={`pn-channel-list pn-channel-list--${theme}`}>
      {(props.channels as string[]).map(channelFromString).sort(channelSorter).map(renderChannel)}
      <>{props.children}</>
    </div>
  );
};
