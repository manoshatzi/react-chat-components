import React, { FC } from "react";
import { useMessageInputCore, MessageInputCoreProps } from "@pubnub/chat-components-common";
import "./message-input.scss";

export type MessageInputProps = MessageInputCoreProps;

/**
 * Allows users to compose messages using text and emojis
 * and automatically publish them on PubNub channels upon sending.
 */
export const MessageInput: FC<MessageInputProps> = (props: MessageInputProps) => {
  const {
    emojiPickerShown,
    handleInputChange,
    handleKeyPress,
    inputRef,
    picker,
    pickerRef,
    sendMessage,
    setEmojiPickerShown,
    text,
    theme,
  } = useMessageInputCore(props);

  const renderEmojiPicker = () => {
    return (
      <>
        <div className="pn-msg-input__icon" onClick={() => setEmojiPickerShown(true)}>
          ☺
        </div>

        {emojiPickerShown && (
          <div className="pn-msg-input__emoji-picker" ref={pickerRef}>
            {picker}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`pn-msg-input pn-msg-input--${theme}`}>
      <div className="pn-msg-input__wrapper">
        <div className="pn-msg-input__spacer">
          <textarea
            className="pn-msg-input__textarea"
            placeholder={props.placeholder}
            rows={1}
            value={text}
            onChange={(e) => handleInputChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
            ref={inputRef}
          />
        </div>

        {props.emojiPicker && renderEmojiPicker()}

        {!props.hideSendButton && (
          <button className="pn-msg-input__send" onClick={() => sendMessage()}>
            {props.sendButton}
          </button>
        )}
      </div>
    </div>
  );
};

MessageInput.defaultProps = {
  hideSendButton: false,
  placeholder: "Type Message",
  sendButton: "Send",
  senderInfo: false,
  typingIndicator: false,
};
