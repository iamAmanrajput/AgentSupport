"use client";
import React, { useState } from "react";
import { WidgetHeader } from "../components/WidgetHeader";
import { Button } from "@workspace/ui/components/button";
import {
  ChevronRightIcon,
  MessageSquareTextIcon,
  MicIcon,
  PhoneIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  hasVapiSecretsSelector,
  selectContactSessionIdByOrg,
  setConversationId,
  setErrorMessage,
  setScreen,
} from "@/redux/slices/widgetSlice";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { WidgetFooter } from "../components/WidgetFooter";

const WidgetSelectionScreen = () => {
  const [isPending, setIsPending] = useState(false);
  const { organizationId, widgetSettings } = useAppSelector(
    (state) => state.widget
  );
  const hasVapiSecrets = useAppSelector(hasVapiSecretsSelector);
  const dispatch = useAppDispatch();

  const contactSessionId = useAppSelector(
    selectContactSessionIdByOrg(organizationId)
  );

  const createConversation = useMutation(api.public.conversations.create);

  const handleNewConversation = async () => {
    if (!organizationId) {
      dispatch(setScreen("error"));
      dispatch(setErrorMessage("Missing Organization ID"));
      return;
    }
    if (!contactSessionId) {
      dispatch(setScreen("auth"));
      return;
    }

    try {
      const conversationId = await createConversation({
        contactSessionId,
        organizationId,
      });

      dispatch(setConversationId(conversationId));
      dispatch(setScreen("chat"));
    } catch {
      dispatch(setScreen("auth"));
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto p-4">
        <Button
          className="h-16 w-full justify-between"
          variant="outline"
          onClick={handleNewConversation}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareTextIcon className="size-4" />
            <span>Start chat</span>
          </div>
          <ChevronRightIcon />
        </Button>
        {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
          <Button
            className="h-16 w-full justify-between"
            variant="outline"
            onClick={() => dispatch(setScreen("voice"))}
            disabled={isPending}
          >
            <div className="flex items-center gap-x-2">
              <MicIcon className="size-4" />
              <span>Start voice call</span>
            </div>
            <ChevronRightIcon />
          </Button>
        )}
        {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
          <Button
            className="h-16 w-full justify-between"
            variant="outline"
            onClick={() => dispatch(setScreen("contact"))}
            disabled={isPending}
          >
            <div className="flex items-center gap-x-2">
              <PhoneIcon className="size-4" />
              <span>Call us</span>
            </div>
            <ChevronRightIcon />
          </Button>
        )}
      </div>
      <WidgetFooter />
    </>
  );
};

export default WidgetSelectionScreen;
