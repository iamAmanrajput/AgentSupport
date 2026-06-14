import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <Container>
        <nav className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-6 backdrop-blur-xl shadow-sm">
          {/* Logo */}
          <Link href="/">
            <span className="text-lg font-semibold font-mono flex items-center gap-2">
              <Image src={"logo.svg"} alt="logo" width={20} height={20} />
              AgentSupport_
            </span>
          </Link>

          <Button>Get Started</Button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
