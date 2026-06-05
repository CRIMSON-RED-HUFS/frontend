"use client";

import { useEffect, useMemo, useState } from "react";
import { MEMBERS } from "../constants/members";

const DEFAULT_SESSION = "VOCAL";
const DEFAULT_GENERATION = "41ST";

function matchesSession(member, selectedSession) {
  return selectedSession === "ALL" || member.session === selectedSession;
}

function matchesGeneration(member, selectedGeneration) {
  if (selectedGeneration === "OB") {
    return member.generation === "OB" || member.isActive === false;
  }

  return member.generation === selectedGeneration;
}

export function useMemberFilter() {
  const [selectedSession, setSelectedSession] = useState(DEFAULT_SESSION);
  const [selectedGeneration, setSelectedGeneration] = useState(DEFAULT_GENERATION);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const filteredMembers = useMemo(
    () =>
      MEMBERS.filter(
        (member) => matchesSession(member, selectedSession) && matchesGeneration(member, selectedGeneration),
      ),
    [selectedGeneration, selectedSession],
  );

  useEffect(() => {
    if (filteredMembers.length === 0) {
      setSelectedMemberId(null);
      return;
    }

    setSelectedMemberId((currentId) => {
      if (currentId && filteredMembers.some((member) => member.id === currentId)) {
        return currentId;
      }

      return filteredMembers[0].id;
    });
  }, [filteredMembers]);

  const selectedMember = useMemo(
    () => filteredMembers.find((member) => member.id === selectedMemberId) ?? filteredMembers[0] ?? null,
    [filteredMembers, selectedMemberId],
  );

  return {
    filteredMembers,
    selectedGeneration,
    selectedMember,
    selectedMemberId,
    selectedSession,
    setSelectedGeneration,
    setSelectedMemberId,
    setSelectedSession,
  };
}
