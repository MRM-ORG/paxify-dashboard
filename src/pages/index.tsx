import StoreSelector from "@/components/molecules/subviews/home/StoreSelector";
import Home from "@/components/pages/Home";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { useState } from "react";

export default function HomePage() {
  const [stores, setStores] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [storeEvents, setStoreEvents] = useState<any>(null);

  const commonProps = {
    user: {
      stores,
      setStores,
    },
  };

  return (
    <ProtectedAuthWrapper>
      <StoreSelector {...commonProps} />
    </ProtectedAuthWrapper>
  );
}
