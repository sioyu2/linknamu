"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  clicks?: number;
  onClick: (id: string) => void;
};

export default function LinkCard({ link, clicks, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onClick(link.id)}
      className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <span>{link.title}</span>
      {typeof clicks === "number" && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {clicks.toLocaleString()} 클릭
        </span>
      )}
    </a>
  );
}
