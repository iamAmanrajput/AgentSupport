import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return <SignIn forceRedirectUrl="/conversations" />;
};

export default page;
