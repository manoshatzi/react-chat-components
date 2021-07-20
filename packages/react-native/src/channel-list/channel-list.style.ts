import { StyleSheet } from "react-native";
import { Themes } from "@pubnub/chat-components-common";

export const lightColors = {
  channelListBackground: "#ffffff",
  channelBackground: "transparent",
  channelPressedBackground: "#5babfc",
  channelActiveBackground: "#f0f3f7",
  channelNameColor: "#585858",
  channelNamePressedColor: "#ffffff",
  channelNameActiveColor: "#585858",
  channelDescriptionColor: "#9b9b9b",
  channelDescriptionPressedColor: "#ffffff",
  channelDescriptionActiveColor: "#9b9b9b",
};

export const darkColors = {
  channelListBackground: "#292b2f",
  channelBackground: "transparent",
  channelPressedBackground: "#de2440",
  channelActiveBackground: "#2f3136",
  channelNameColor: "#dcddde",
  channelNamePressedColor: "#ffffff",
  channelNameActiveColor: "#dcddde",
  channelDescriptionColor: "#929292",
  channelDescriptionPressedColor: "#ffffff",
  channelDescriptionActiveColor: "#9b9b9b",
};

export default (theme: Themes | ""): StyleSheet => {
  const colors = ["light", "support", "event"].includes(theme) ? lightColors : darkColors;

  return StyleSheet.create({
    channelListWrapper: {
      flex: 1,
    },
    channelList: {
      backgroundColor: colors.channelListBackground,
    },
    channel: {
      alignItems: "center",
      backgroundColor: colors.channelBackground,
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    channelActive: {
      backgroundColor: colors.channelActiveBackground,
    },
    channelPressed: {
      backgroundColor: colors.channelPressedBackground,
    },
    channelName: {
      color: colors.channelNameColor,
      fontSize: 17,
      fontWeight: "500",
    },
    channelNamePressed: {
      color: colors.channelNamePressedColor,
    },
    channelNameActive: {
      color: colors.channelNameActiveColor,
    },
    channelDescription: {
      color: colors.channelDescriptionColor,
      fontSize: 15,
      paddingTop: 5,
    },
    channelDescriptionPressed: {
      color: colors.channelDescriptionPressedColor,
    },
    channelDescriptionActive: {
      color: colors.channelDescriptionActiveColor,
    },
    channelThumb: {
      borderRadius: 50,
      height: 36,
      marginRight: 24,
      width: 36,
    },
  });
};
