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
    <ResizablePanelGroup orientation="horizontal" className="h-full flex-1">
      <ResizablePanel defaultSize="30%" minSize="20%" maxSize="30%">
        <ConversationsPanel />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel className="h-full" defaultSize="70%">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
