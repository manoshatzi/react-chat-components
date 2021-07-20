import { ReactNode } from "react";
import { UUIDMetadataObject, ObjectCustom } from "pubnub";
import { usePubNub } from "pubnub-react";
import { useAtom } from "jotai";
import { ThemeAtom } from "../state-atoms";

export interface MemberListCoreProps {
  children?: ReactNode;
  /** Pass a list of members, including metadata, to render on the list */
  members: UUIDMetadataObject<ObjectCustom>[] | string[];
  /** Provide custom user renderer to override themes and CSS variables. */
  memberRenderer?: (member: UUIDMetadataObject<ObjectCustom>) => JSX.Element;
}

export const useMemberListCore = (props: MemberListCoreProps) => {
  const pubnub = usePubNub();
  const [theme] = useAtom(ThemeAtom);

  /*
  /* Helper functions
  */

  const isOwnMember = (uuid: string) => {
    return pubnub.getUUID() === uuid;
  };

  const memberSorter = (a, b) => {
    if (isOwnMember(a.id)) return -1;
    if (isOwnMember(b.id)) return 1;

    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  };

  const memberFromString = (member: UUIDMetadataObject<ObjectCustom> | string) => {
    if (typeof member === "string") {
      return {
        id: member,
        name: member,
      };
    }
    return member;
  };

  return {
    isOwnMember,
    memberSorter,
    memberFromString,
    theme,
  };
};
