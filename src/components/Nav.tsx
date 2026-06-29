import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "#story", label: "So funktioniert's" },
  { href: "#funktionen", label: "Funktionen" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`dark fixed inset-x-0 top-0 z-50 text-mist transition-colors duration-300 ${
        scrolled
          ? "border-b border-mist/10 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="rounded-md" aria-label="Leadsystems — Startseite">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-mist/80 transition-colors hover:text-mist"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="rounded-full font-medium">
            <a href="#erstgespraech">Erstgespräch buchen</a>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-mist hover:bg-mist/10 hover:text-mist"
                aria-label="Menü öffnen"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="dark border-mist/10 bg-ink text-mist">
              <SheetHeader>
                <SheetTitle className="text-left text-mist">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-2 flex flex-col gap-1 px-4">
                {LINKS.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="rounded-lg px-2 py-3 text-lg text-mist/85 transition-colors hover:bg-mist/5 hover:text-mist"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild size="lg" className="mt-4 rounded-full">
                    <a href="#erstgespraech">Erstgespräch buchen</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
