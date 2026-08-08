import React from "react";
import PricingTable from "../components/pricing-table";

const BillingView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/20 p-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="space-y-2">
          <h1 className="font-heading text-2xl text-primary md:text-4xl">
            Plans & Billing
          </h1>
          <p className="text-xs font-bold text-muted-foreground md:text-base">
            Choose the plan that&apos;s right for you
          </p>
        </div>

        <div className="mt-8">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default BillingView;
