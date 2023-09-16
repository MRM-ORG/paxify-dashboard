import { fetchUserStores } from "@/apiCalls/auth";
import Subscription from "@/components/molecules/subviews/home/Subscription";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { useState, useEffect } from "react";

export interface IStoryProps {
  id: string;
  value: string;
  label: string;
  verified: boolean;
}

export default function SubscriptionsPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeStore, setActiveStore] = useState<IStoryProps | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchUserStores(user.uid)
      .then((stores) => {
        const modifiedStores = stores.map((store: any) => ({
          id: store.id,
          label: store.name,
          value: store.domain,
          verified: store.verified,
        }));
        setStores(modifiedStores);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!stores?.length) return;

    setActiveStore(stores[0]);
  }, [stores]);

  const commonProps = {
    user: {
      stores,
      setStores,
    },
    activeStore,
    setActiveStore,
  };

  return (
    !isLoading && (
      <ProtectedAuthWrapper>
        <Subscription {...commonProps} />
      </ProtectedAuthWrapper>
    )
  );
}
