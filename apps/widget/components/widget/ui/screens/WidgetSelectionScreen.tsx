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
          <p className="flex items-center gap-2 font-heading text-3xl">
            Hi there!
          </p>

          <p className="text-lg font-medium">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-3 overflow-y-auto p-4">
        <Button
          className="group h-16 w-full justify-between rounded-2xl border border-border/60 bg-background px-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md"
          variant="outline"
          onClick={handleNewConversation}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <MessageSquareTextIcon className="size-4.5" />
            </div>

            <span className="font-medium">Start chat</span>
          </div>

          <ChevronRightIcon className="size-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Button>

        {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
          <Button
            className="group h-16 w-full justify-between rounded-2xl border border-border/60 bg-background px-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md"
            variant="outline"
            onClick={() => dispatch(setScreen("voice"))}
            disabled={isPending}
          >
            <div className="flex items-center gap-x-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <MicIcon className="size-4.5" />
              </div>

              <span className="font-medium">Start voice call</span>
            </div>

            <ChevronRightIcon className="size-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Button>
        )}

        {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
          <Button
            className="group h-16 w-full justify-between rounded-2xl border border-border/60 bg-background px-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md"
            variant="outline"
            onClick={() => dispatch(setScreen("contact"))}
            disabled={isPending}
          >
            <div className="flex items-center gap-x-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <PhoneIcon className="size-4.5" />
              </div>

              <span className="font-medium">Call us</span>
            </div>

            <ChevronRightIcon className="size-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Button>
        )}
      </div>
      <WidgetFooter />
    </>
  );
};

export default WidgetSelectionScreen;
