"use client";
import React, { useEffect, useState } from "react";
import { WidgetHeader } from "../components/WidgetHeader";
import { LoaderIcon } from "lucide-react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import {
  selectContactSessionIdByOrg,
  setErrorMessage,
  setLoadingMessage,
  setOrganizationId,
  setScreen,
  setWidgetSettings,
} from "@/redux/slices/widgetSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type InitStep = "org" | "session" | "settings" | "vapi" | "done";

const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState<boolean>(false);

  const loadingMessage = useAppSelector((state) => state.widget.loadingMessage);

  const contactSessionId = useAppSelector(
    selectContactSessionIdByOrg(organizationId)
  );

  // step 1: Validate organization
  const validateOrganization = useAction(api.public.organizations.validate);

  useEffect(() => {
    if (step != "org") {
      return;
    }

    dispatch(setLoadingMessage("Finding organization ID..."));

    if (!organizationId) {
      dispatch(setErrorMessage("Organization ID is required"));
      dispatch(setScreen("error"));
      return;
    }

    dispatch(setLoadingMessage("Verifying organization..."));

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          dispatch(setOrganizationId(organizationId));
          setStep("session");
        } else {
          dispatch(setErrorMessage(result.reason || "Invalid configuration"));
          dispatch(setScreen("error"));
        }
      })
      .catch(() => {
        dispatch(setErrorMessage("Unable to verify organization"));
        dispatch(setScreen("error"));
      });
  }, [step, organizationId, validateOrganization, dispatch]);

  // Step 2: Validate session (if exists)
  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );

  useEffect(() => {
    if (step !== "session") {
      return;
    }

    dispatch(setLoadingMessage("Finding contact session ID..."));

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("settings");
      return;
    }

    dispatch(setLoadingMessage("Validating session..."));

    validateContactSession({
      contactSessionId: contactSessionId,
    })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("settings");
        dispatch(setScreen("selection"));
      })
      .catch(() => {
        setSessionValid(false);
        setStep("settings");
      });
  }, [step, contactSessionId, validateContactSession, dispatch]);

  // Step 3: Load Widget Settings
  const widgetSettings = useQuery(
    api.public.widgetSettings.getByOrganizationId,
    organizationId
      ? {
          organizationId,
        }
      : "skip"
  );
  useEffect(() => {
    if (step !== "settings") {
      return;
    }

    setLoadingMessage("Loading widget settings...");

    if (widgetSettings !== undefined) {
      dispatch(setWidgetSettings(widgetSettings));
      setStep("vapi");
    }
  }, [step, widgetSettings, setStep, dispatch]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }

    const hasValidSession = contactSessionId && sessionValid;
    dispatch(setScreen(hasValidSession ? "selection" : "auth"));
  }, [step, contactSessionId, sessionValid, dispatch]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || "loading!!!"}</p>
      </div>
    </>
  );
};

export default WidgetLoadingScreen;
