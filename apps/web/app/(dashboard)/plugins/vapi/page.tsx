import { PremiumFeatureOverlay } from "@/components/billing/ui/components/premium-feature-overlay";
import { VapiView } from "@/components/plugins/ui/views/vapi-view";
import { Show } from "@clerk/nextjs";

const Page = () => {
  return (
    <Show
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Show>
  );
};

export default Page;
