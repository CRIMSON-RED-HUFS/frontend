"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_GENERATION, DEFAULT_SESSION, MEMBERS } from "../constants/members";

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
  const effectiveSelectedMemberId = selectedMember?.id ?? null;

  return {
    filteredMembers,
    selectedGeneration,
    selectedMember,
    selectedMemberId: effectiveSelectedMemberId,
    selectedSession,
    setSelectedGeneration,
    setSelectedMemberId,
    setSelectedSession,
  };
}
