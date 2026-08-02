"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

import { WidgetHeader } from "../components/WidgetHeader";
import {
  visitorFormSchema,
  visitorFormSchemaType,
} from "../../schemas/authSchema";
import { WidgetFooter } from "../components/WidgetFooter";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { setContactSessionId, setScreen } from "@/redux/slices/widgetSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const WidgetAuthScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<visitorFormSchemaType>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const dispatch = useAppDispatch();
  const organizationId = useAppSelector((state) => state.widget.organizationId);

  const createContactSession = useMutation(api.public.contactSessions.create);

  const onSubmit: SubmitHandler<visitorFormSchemaType> = async (values) => {
    if (!organizationId) {
      return;
    }

    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    };

    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });

    dispatch(
      setContactSessionId({
        organizationId: organizationId!,
        contactSessionId,
      })
    );
    dispatch(setScreen("selection"));
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can we help you today?</p>
        </div>
      </WidgetHeader>

      <form
        className="flex flex-1 flex-col gap-y-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <FieldLabel htmlFor="name" className="font-medium">
            Full Name
          </FieldLabel>
          <Input
            {...register("name")}
            className="h-10 bg-background placeholder:text-muted-foreground/60"
            placeholder="Enter your full name"
            type="text"
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="font-medium">
            Email Address
          </FieldLabel>
          <Input
            {...register("email")}
            className="h-10 bg-background placeholder:text-muted-foreground/60"
            placeholder="Enter your email address"
            type="email"
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Button disabled={isSubmitting} size="lg" type="submit">
          Continue
        </Button>
      </form>
      <WidgetFooter />
    </>
  );
};

export default WidgetAuthScreen;
