"use client";

import React, { use } from "react";
import WidgetView from "@/components/widget/ui/views/WidgetView";

interface Props {
  searchParams: Promise<{
    organizationId?: string;
  }>;
}

const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);

  return <WidgetView organizationId={organizationId ?? null} />;
};

export default Page;
