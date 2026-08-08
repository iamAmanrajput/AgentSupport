import React from "react";
import BrandLogo from "./brand-logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <BrandLogo />
      <p>© {new Date().getFullYear()} AgentSupport. All rights reserved.</p>
      <div className="flex gap-5">
        <Link href="#features" className="hover:text-foreground">
          Product
        </Link>
        <Link href="#pricing" className="hover:text-foreground">
          Pricing
        </Link>
        <Link href="#workflow" className="hover:text-foreground">
          Workflow
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
