import React, { FC } from "react";
import { MemberListCoreProps, useMemberListCore } from "@pubnub/chat-components-common";
import "./member-list.scss";

export type MemberListProps = MemberListCoreProps;

/**
 * Renders a list of members. It can represent all users of the application, only members of
 * the current channel, users currently subscribed/present on the channel or whatever else is passed
 * into it. Custom memberRenderer can be used to modify how the users are rendered, so for example
 * presence indicators can be added.
 */
export const MemberList: FC<MemberListProps> = (props: MemberListProps) => {
  const { isOwnMember, memberSorter, memberFromString, theme } = useMemberListCore(props);

  const renderMember = (member) => {
    if (props.memberRenderer) return props.memberRenderer(member);
    const youString = isOwnMember(member.id) ? "(You)" : "";

    return (
      <div key={member.id} className="pn-member">
        <div className="pn-member__avatar">
          {member.profileUrl && <img src={member.profileUrl} alt="User avatar" />}
          {!member.profileUrl && <div className="pn-member__avatar-placeholder" />}
        </div>
        <div className="pn-member__main">
          <p className="pn-member__name">
            {member.name} {youString}
          </p>
          <p className="pn-member__title">{member.custom?.title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`pn-member-list pn-member-list--${theme}`}>
      {(props.members as string[]).map(memberFromString).sort(memberSorter).map(renderMember)}
      <>{props.children}</>
    </div>
  );
};
