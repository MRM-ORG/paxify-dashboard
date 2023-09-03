import { fetchUserStores } from "@/apiCalls/auth";
import Subscription from "@/components/molecules/subviews/home/Subscription";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { useState, useEffect } from "react";

export default function SubscriptionsPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchUserStores(user.uid)
      .then((stores) => {
        setStores(stores);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!stores?.length) return;

    setActiveStore({
      label: stores[0].label,
      value: stores[0].domain,
    });
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
