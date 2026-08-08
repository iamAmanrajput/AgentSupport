import { OrganizationList } from "@clerk/nextjs";

const Page = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/conversations"
      afterSelectOrganizationUrl="/conversations"
      hidePersonal
      skipInvitationScreen
    />
  );
};

export default Page;
