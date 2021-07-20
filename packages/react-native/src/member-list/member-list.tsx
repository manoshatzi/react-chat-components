import React, { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { MemberListCoreProps, useMemberListCore, toPascal } from "@pubnub/chat-components-common";
import defaultStyle from "./member-list.style";

export type MemberListProps = MemberListCoreProps & {
  style?: StyleSheet;
};

/**
 * Renders a list of members. It can represent all users of the application, only members of
 * the current channel, users currently subscribed/present on the channel or whatever else is passed
 * into it. Custom memberRenderer can be used to modify how the users are rendered, so for example
 * presence indicators can be added.
 */
export const MemberList: FC<MemberListProps> = (props: MemberListProps) => {
  const { isOwnMember, memberSorter, memberFromString, theme } = useMemberListCore(props);
  const [style, setStyle] = useState(defaultStyle(theme));

  useEffect(() => {
    setStyle(Object.assign({}, defaultStyle(theme), props.style));
  }, [setStyle, props.style, theme]);

  const renderMember = ({ item }) => {
    const member = item;

    if (props.memberRenderer) return props.memberRenderer(member);
    const youString = isOwnMember(member.id) ? "(You)" : "";

    return (
      <View style={style.member}>
        {member.profileUrl && (
          <Image style={style.memberThumb} source={{ uri: member.profileUrl }} />
        )}
        <View>
          <Text style={style.memberName}>
            {member.name} {youString}
          </Text>
          <Text style={style.memberDescription}>{member.custom?.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={style.memberListWrapper}>
      <FlatList
        style={[style.memberList, style[`memberList${toPascal(theme)}`]]}
        data={(props.members as string[]).map(memberFromString).sort(memberSorter)}
        renderItem={renderMember}
        keyExtractor={(member) => member.id}
      />
      <>{props.children}</>
    </View>
  );
};
