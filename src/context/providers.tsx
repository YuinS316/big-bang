import React from "react";
import { HydrateClient } from "~/trpc/server";
import { TRPCReactProvider } from "~/trpc/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <HydrateClient>{children}</HydrateClient>
    </TRPCReactProvider>
  );
};

export default Providers;
