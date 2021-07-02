import { ReactNode } from "react";
import { useAtom } from "jotai";
import { ChannelMetadataObject, ObjectCustom } from "pubnub";
import { ThemeAtom, CurrentChannelAtom } from "../state-atoms";

export interface ChannelListCoreProps {
  children?: ReactNode;
  /** Pass a list of channels, including metadata, to render on the list */
  channels: ChannelMetadataObject<ObjectCustom>[] | string[];
  /** Provide custom channel renderer to override default themes and CSS variables. */
  channelRenderer?: (channel: ChannelMetadataObject<ObjectCustom>) => JSX.Element;
  /** A callback run when user clicked one of the channels. Can be used to switch current channel. */
  onChannelSwitched?: (channel: ChannelMetadataObject<ObjectCustom>) => unknown;
}

export const useChannelListCore = (props: ChannelListCoreProps) => {
  const [currentChannel] = useAtom(CurrentChannelAtom);
  const [theme] = useAtom(ThemeAtom);

  /*
  /* Helper functions
  */
  const isChannelActive = (ch: ChannelMetadataObject<ObjectCustom>) => {
    return currentChannel === ch.id;
  };

  const channelSorter = (
    a: ChannelMetadataObject<ObjectCustom>,
    b: ChannelMetadataObject<ObjectCustom>
  ) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  };

  const channelFromString = (channel: ChannelMetadataObject<ObjectCustom> | string) => {
    if (typeof channel === "string") {
      return {
        id: channel,
        name: channel,
      };
    }
    return channel;
  };

  /*
  /* Commands
  */

  const switchChannel = (channel: ChannelMetadataObject<ObjectCustom>) => {
    if (props.onChannelSwitched) {
      props.onChannelSwitched(channel);
    }
  };

  return {
    isChannelActive,
    channelSorter,
    channelFromString,
    switchChannel,
    theme,
  };
};
