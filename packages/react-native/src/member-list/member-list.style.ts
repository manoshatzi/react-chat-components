import { StyleSheet } from "react-native";
import { Themes } from "@pubnub/chat-components-common";

export const lightColors = {
  memberListBackground: "#ffffff",
  memberBackground: "transparent",
  memberNameColor: "#585858",
  memberDescriptionColor: "#9b9b9b",
};

export const darkColors = {
  memberListBackground: "#292b2f",
  memberBackground: "transparent",
  memberNameColor: "#dcddde",
  memberDescriptionColor: "#929292",
};

export default (theme: Themes | ""): StyleSheet => {
  const colors = ["light", "support", "event"].includes(theme) ? lightColors : darkColors;

  return StyleSheet.create({
    memberListWrapper: {
      flex: 1,
    },
    memberList: {
      backgroundColor: colors.memberListBackground,
    },
    member: {
      alignItems: "center",
      backgroundColor: colors.memberBackground,
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    memberName: {
      color: colors.memberNameColor,
      fontSize: 17,
      fontWeight: "500",
    },
    memberDescription: {
      color: colors.memberDescriptionColor,
      fontSize: 15,
      paddingTop: 5,
    },
    memberThumb: {
      borderRadius: 50,
      height: 36,
      marginRight: 24,
      width: 36,
    },
  });
};
