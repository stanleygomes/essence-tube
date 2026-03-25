import Link from "next/link";

const pageLinks = [
  { href: "/", label: "home" },
  { href: "/terms", label: "terms" },
  { href: "/privacy", label: "privacy" },
];

export default function DefaultPageHeader() {
  return (
    <header className="fixed left-0 right-0 top-6 z-50 flex justify-center px-8">
      <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 border-4 border-transparent bg-[#1c1c1c] px-6 py-4 shadow-[6px_6px_0px_0px_#0a0a0a]">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 items-center justify-center border-4 border-white bg-main text-xs font-bold uppercase text-white">
              my app logo
            </div>
          </Link>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-bold">
          <div className="flex items-center gap-4">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white underline-offset-2 hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/login"
            className="no-underline border-2 border-white bg-white px-5 py-1.5 text-black transition-colors hover:bg-main hover:border-main hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            login
          </Link>
        </nav>
      </div>
    </header>
  );
}
