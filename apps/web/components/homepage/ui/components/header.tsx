"use client";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import BrandLogo from "./brand-logo";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <BrandLogo />

      {/* Navigation */}
      <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
        <Link href="#features" className="transition-colors hover:text-primary">
          Features
        </Link>

        <Link href="#workflow" className="transition-colors hover:text-primary">
          Workflow
        </Link>

        <Link href="#pricing" className="transition-colors hover:text-primary">
          Pricing
        </Link>
        <Link href="#faq" className="transition-colors hover:text-primary">
          Faq
        </Link>
      </nav>

      {/* CTA */}
      <Button onClick={() => router.push("/sign-up")} size="sm">
        Get Started
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </header>
  );
};

export default Header;
