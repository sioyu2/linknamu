import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-10 sm:py-16">
      <div className="mb-6 flex justify-end">
        <ThemeToggle />
      </div>
      <ProfileHeader profile={profile} />
      <section className="mt-8" aria-label="링크 목록">
        <LinkList links={links} />
      </section>
      <footer className="mt-auto pt-12 text-center text-xs text-neutral-400">
        🌳 링크나무
      </footer>
    </main>
  );
}
