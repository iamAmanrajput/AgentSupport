import { PremiumFeatureOverlay } from "@/components/billing/ui/components/premium-feature-overlay";
import { CustomizationView } from "@/components/customization/ui/views/customization-view";
import { Show } from "@clerk/nextjs";

const Page = () => {
  return (
    <Show
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Show>
  );
};

export default Page;
