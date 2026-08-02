"use client";
// useThreadMessages is a React hook that fetches and updates thread messages in real time.
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import React from "react";
import { WidgetHeader } from "../components/WidgetHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import {
  selectContactSessionIdByOrg,
  setConversationId,
  setScreen,
} from "@/redux/slices/widgetSlice";
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";

import { AIResponse } from "@workspace/ui/components/ai/response";

import {
  AISuggestion,
  AISuggestions,
} from "@workspace/ui/components/ai/suggestion";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
} from "@workspace/ui/components/field";
import { Controller } from "react-hook-form";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { DicebearAvatar } from "@workspace/ui/components/dicebar-avatar";

const formSchema = z.object({
  message: z.string().min(1, "Message is required").trim(),
});

const WidgetChatScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const { conversationId, organizationId } = useAppSelector(
    (state) => state.widget
  );
  const contactSessionId = useAppSelector(
    selectContactSessionIdByOrg(organizationId)
  );
  const dispatch = useAppDispatch();

  const onBack = () => {
    dispatch(setConversationId(null));
    dispatch(setScreen("selection"));
  };

  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId
      ? {
          threadId: conversation.threadId,
          contactSessionId,
        }
      : "skip",
    { initialNumItems: 10 }
  );

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });

  const createMessage = useAction(api.public.messagesAction.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!conversation || !contactSessionId) {
      return;
    }
    form.reset();

    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    });
  };

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button size="icon" onClick={onBack} variant="transparent">
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button size="icon" variant="transparent">
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <AIConversation>
        <AIConversationContent>
          <InfiniteScrollTrigger
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            ref={topElementRef}
          />
          {toUIMessages(messages.results ?? []).map((message) => (
            <AIMessage
              key={message.id}
              from={message.role === "user" ? "user" : "assistant"}
            >
              <AIMessageContent>
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <AIResponse key={index}>{part.text}</AIResponse>;
                  }

                  return null;
                })}
              </AIMessageContent>
              {message.role === "assistant" && (
                <DicebearAvatar
                  imageUrl="/logo.svg"
                  seed="assistant"
                  size={32}
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
      </AIConversation>

      <AIInput
        className="rounded-none border-x-0 border-b-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <AIInputTextarea
                  {...field}
                  disabled={conversation?.status === "resolved"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    conversation?.status === "resolved"
                      ? "This conversation has been resolved."
                      : "Type your message..."
                  }
                />
              </FieldContent>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <AIInputToolbar>
          <AIInputTools />

          <AIInputSubmit
            type="submit"
            status="ready"
            disabled={
              conversation?.status === "resolved" || !form.formState.isValid
            }
          />
        </AIInputToolbar>
      </AIInput>
    </>
  );
};

export default WidgetChatScreen;
