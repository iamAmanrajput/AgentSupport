import Link from "next/link";
import { Container } from "@/components/layout/container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between border-t border-border">
          {/* Brand */}
          <div>
            <Link href="/">
              <span className="text-lg font-semibold font-mono flex items-center gap-2">
                <Image src={"logo.svg"} alt="logo" width={20} height={20} />
                AgentSupport_
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              AI-powered customer support platform that helps teams respond
              faster and deliver better customer experiences.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 text-sm">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>

            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>

            <Link
              href="#faq"
              className="text-muted-foreground hover:text-foreground"
            >
              FAQ
            </Link>

            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AgentSupport. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
