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

  if (!organizationId) {
    return null;
  }

  return <WidgetView organizationId={organizationId} />;
};

export default Page;
