"use client";
import React from "react";
import { WidgetHeader } from "../components/WidgetHeader";
import { AlertTriangleIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const WidgetErrorScreen = () => {
  const errorMessage = useAppSelector((state) => state.widget.errorMessage);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon />
        <p className="text-sm">{errorMessage || "Invalid configuration"}</p>
      </div>
    </>
  );
};

export default WidgetErrorScreen;
