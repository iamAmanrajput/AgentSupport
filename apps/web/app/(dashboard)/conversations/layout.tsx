import { ConversationsLayout } from "@/components/dashboard/ui/layouts/conversations-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ConversationsLayout>{children}</ConversationsLayout>;
};

export default Layout;
