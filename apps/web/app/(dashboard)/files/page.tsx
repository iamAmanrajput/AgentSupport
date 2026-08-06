import { Show } from "@clerk/nextjs";
import { FilesView } from "@/components/files/ui/views/files-view";
import { PremiumFeatureOverlay } from "@/components/billing/ui/components/premium-feature-overlay";

const Page = () => {
  return (
    <Show
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <FilesView />
        </PremiumFeatureOverlay>
      }
    >
      <FilesView />
    </Show>
  );
};

export default Page;
