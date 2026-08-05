"use client";

import { useMediaQuery } from "usehooks-ts";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ContactPanel } from "../components/contact-panel";

export const ConversationIdLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <ResizablePanelGroup className="h-full flex-1" orientation="horizontal">
      <ResizablePanel defaultSize={isDesktop ? "60%" : "100%"}>
        <div className="flex h-full flex-col">{children}</div>
      </ResizablePanel>

      {isDesktop && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize="40%" minSize="40%" maxSize="40%">
            <ContactPanel />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};
