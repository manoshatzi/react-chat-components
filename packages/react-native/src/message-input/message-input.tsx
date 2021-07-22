import React, { FC, useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { MessageInputCoreProps, useMessageInputCore } from "@pubnub/chat-components-common";
import defaultStyle from "./message-input.style";

export type MessageInputProps = MessageInputCoreProps & {
  style?: StyleSheet;
};

/**
 * Allows users to compose messages using text and emojis
 * and automatically publish them on PubNub channels upon sending.
 */
export const MessageInput: FC<MessageInputProps> = (props: MessageInputProps) => {
  const { handleInputChange, sendMessage, text, theme } = useMessageInputCore(props);
  const [style, setStyle] = useState(defaultStyle(theme));

  useEffect(() => {
    setStyle(Object.assign({}, defaultStyle(theme), props.style));
  }, [setStyle, props.style, theme]);

  return (
    <View style={style.inputWrapper}>
      <TextInput style={style.input} onChangeText={(e) => handleInputChange(e)} value={text} />
      <Pressable style={style.inputButton} onPress={sendMessage}>
        {typeof props.sendButton == "string" ? (
          <Text style={style.inputButtonText}>{props.sendButton}</Text>
        ) : (
          props.sendButton
        )}
      </Pressable>
    </View>
  );
};

MessageInput.defaultProps = {
  placeholder: "Type Message",
  sendButton: "Send",
  senderInfo: false,
  typingIndicator: false,
};
