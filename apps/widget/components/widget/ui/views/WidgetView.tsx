"use client";

import React from "react";
import WidgetAuthScreen from "../screens/WidgetAuthScreen";
import WidgetErrorScreen from "../screens/WidgetErrorScreen";
import WidgetLoadingScreen from "../screens/WidgetLoadingScreen";
import WidgetSelectionScreen from "../screens/WidgetSelectionScreen";
import { useAppSelector } from "@/redux/hooks";
import WidgetChatScreen from "../screens/WidgetChatScreen";
import WidgetInboxScreen from "../screens/WidgetInboxScreen";
import { WidgetVoiceScreen } from "../screens/WidgetVoiceScreen";
import { WidgetContactScreen } from "../screens/WidgetContactScreen";

interface Props {
  organizationId: string | null;
}

const WidgetView = ({ organizationId }: Props) => {
  const screen = useAppSelector((state) => state.widget.screen);

  const screenComponents = {
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
    auth: <WidgetAuthScreen />,
    voice: <WidgetVoiceScreen />,
    inbox: <WidgetInboxScreen />,
    selection: <WidgetSelectionScreen />,
    chat: <WidgetChatScreen />,
    contact: <WidgetContactScreen />,
  };
  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};

export default WidgetView;
