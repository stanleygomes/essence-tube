import Link from "next/link";

const pageLinks = [
  { href: "/login", label: "login" },
  { href: "/", label: "home" },
  { href: "/terms", label: "terms" },
  { href: "/privacy", label: "privacy" },
];

export default function DefaultPageHeader() {
  return (
    <header className="w-full border-b-4 border-black bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-main text-xs font-bold uppercase">
            logo
          </div>
          <span className="text-2xl font-bold">EssenceTube</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-bold">
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-2 hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
