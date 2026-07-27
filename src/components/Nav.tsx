import { useEffect, useState } from "react";
import { Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailRequestButton } from "@/components/EmailRequestButton";
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
  { href: "#team", label: "Über uns" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <nav className="mx-auto flex h-20 max-w-[88rem] items-center justify-between px-6">
        <a href="#top" className="rounded-md" aria-label="Leadsystems — Startseite">
          <Logo />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-6">
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
          <EmailRequestButton
            size="sm"
            className="rounded-full font-medium"
            wrapperClassName="items-center"
            changeClassName="text-mist/55 hover:text-mist"
          >
            E-Mail anfragen
            <Mail className="size-3.5" aria-hidden="true" />
          </EmailRequestButton>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
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
                <EmailRequestButton
                  size="lg"
                  className="mt-4 rounded-full"
                  onBeforeDialogOpen={() => setMobileOpen(false)}
                  changeClassName="text-mist/55 hover:text-mist"
                >
                  Per E-Mail anfragen
                  <Mail className="size-5" aria-hidden="true" />
                </EmailRequestButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
