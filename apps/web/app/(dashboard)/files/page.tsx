// import { Protect } from "@clerk/nextjs";

// import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";
import { FilesView } from "@/components/files/ui/views/files-view";

const Page = () => {
  return (
    // <Protect
    //   condition={(has) => has({ plan: "pro" })}
    //   fallback={
    //     <PremiumFeatureOverlay>
    //       <FilesView />
    //     </PremiumFeatureOverlay>
    //   }
    // >
    //   <FilesView />
    // </Protect>
    <FilesView />
  );
};

export default Page;
