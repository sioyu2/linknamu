"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // null = 클릭 수를 불러오지 못함(DB 미설정 등) → 숫자 숨김
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    fetch("/api/click")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts: Counts } | null) => setCounts(data?.counts ?? null))
      .catch(() => setCounts(null));
  }, []);

  const handleClick = (id: string) => {
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 사용
    const body = JSON.stringify({ id });
    if (!navigator.sendBeacon?.("/api/click", new Blob([body], { type: "application/json" }))) {
      fetch("/api/click", { method: "POST", body, keepalive: true }).catch(() => {});
    }
    setCounts((prev) => (prev ? { ...prev, [id]: (prev[id] ?? 0) + 1 } : prev));
  };

  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            clicks={counts ? (counts[link.id] ?? 0) : undefined}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
}
