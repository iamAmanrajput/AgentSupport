import Image from "next/image";
import React from "react";

const ConversationsViews = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-y-4 bg-secondary/50">
      <div className="flex flex-1 items-center justify-center gap-x-2">
        <Image
          src="/logo.svg"
          alt="AgentSupport"
          width={35}
          height={35}
          className="size-7 shrink-0"
        />

        <h1 className="font-heading text-xl font-bold tracking-tight">
          Agent
          <span className="cursive-text ml-1 text-primary">Support</span>
        </h1>
      </div>
    </div>
  );
};

export default ConversationsViews;
