import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="AgentSupport"
        width={30}
        height={30}
        className="size-7 shrink-0"
      />

      <h1 className="font-heading text-xl font-bold tracking-tight">
        Agent
        <span className="cursive-text ml-1 text-primary">Support</span>
      </h1>
    </Link>
  );
};

export default BrandLogo;
