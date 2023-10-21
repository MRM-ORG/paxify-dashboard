import StoreSelector from "@/components/molecules/subviews/home/StoreSelector";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { useState } from "react";

export default function HomePage() {
  const [stores, setStores] = useState<any[]>([]);

  const commonProps = {
    user: {
      stores,
      setStores,
    },
  };

  return (
    // <ProtectedAuthWrapper>
    // </ProtectedAuthWrapper>
      <StoreSelector {...commonProps} />
  );
}
