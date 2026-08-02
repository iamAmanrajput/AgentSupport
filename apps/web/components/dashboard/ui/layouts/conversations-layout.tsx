import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ConversationsPanel } from "../components/conversation-panel";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

export function ConversationsLayout({ children }: ConversationsLayoutProps) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize="30%" minSize="20%" maxSize="30%">
        <ConversationsPanel />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize="70%">
        <div className="h-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
