import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return <SignUp forceRedirectUrl="/conversations" />;
};

export default page;
