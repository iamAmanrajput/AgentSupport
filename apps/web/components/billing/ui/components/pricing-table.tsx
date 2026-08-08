"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 px-4 py-12">
      <div className="w-full max-w-5xl">
        <ClerkPricingTable
          for="organization"
          newSubscriptionRedirectUrl="/pricing"
          appearance={{
            variables: {
              colorPrimary: "#069669",
            },
            elements: {
              pricingTable: "gap-6",

              pricingTableCard:
                "shadow-sm border border-muted-foreground/10 rounded-xl transition-shadow hover:shadow-md",

              pricingTableCardHeader: "bg-background rounded-t-xl",
              pricingTableCardBody: "bg-background",

              pricingTableCardFooter:
                "bg-background rounded-b-xl border-t border-muted-foreground/10",

              pricingTableCardTitle: "text-lg font-semibold",
              pricingTableCardDescription: "text-sm text-muted-foreground",
              pricingTableCardFee: "text-3xl font-bold text-primary",

              pricingTableCardFeaturedBadge:
                "bg-primary! text-primary-foreground rounded-full px-2.5 py-0.5 text-xs font-medium",

              pricingTableCardFeatures: "gap-3",
              pricingTableCardFeaturesListItem: "text-sm",

              pricingTableCardActionButton:
                "rounded-lg font-medium shadow-sm transition-transform hover:scale-[1.02] bg-primary! text-primary-foreground hover:bg-primary/90!",
            },
          }}
        />
      </div>
    </div>
  );
};

export default PricingTable;
