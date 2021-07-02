import { StyleSheet } from "react-native";

export default StyleSheet.create({
  channelListWrapper: {
    flex: 1,
  },
  channelList: {
    backgroundColor: "white",
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
    padding: 20,
  },
  channelActive: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  channelName: {
    color: "#585858",
    fontSize: 15,
  },
  channelDescription: {
    color: "#585858",
    fontSize: 15,
  },
  channelThumb: {
    borderRadius: 50,
    height: 36,
    marginRight: 20,
    width: 36,
  },
});
