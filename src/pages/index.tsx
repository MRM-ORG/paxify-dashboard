import StoreSelector from "@/components/molecules/subviews/home/StoreSelector";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { useState } from "react";

export default function HomePage() {
  console.log("HOME PAGE");

  return (
    <ProtectedAuthWrapper>
      <StoreSelector />
    </ProtectedAuthWrapper>
  );
}
