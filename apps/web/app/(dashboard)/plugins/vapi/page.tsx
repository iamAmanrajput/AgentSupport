// import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";
import { VapiView } from "@/components/plugins/ui/views/vapi-view";
// import { Protect } from "@clerk/nextjs";

const Page = () => {
  return (
    // <Protect
    //   condition={(has) => has({ plan: "pro" })}
    //   fallback={
    //     <PremiumFeatureOverlay>
    //       <VapiView />
    //     </PremiumFeatureOverlay>
    //   }
    // >
    //   <VapiView />
    // </Protect>
    <VapiView />
  );
};

export default Page;
