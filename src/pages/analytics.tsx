import { fetchUserStores } from "@/apiCalls/auth";
import ViewAnalytics from "@/components/molecules/subviews/home/ViewAnalytics";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
    id: string;
    verified: boolean;
  } | null>(null);
  const [storeEvents, setStoreEvents] = useState<any>(null);

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
      label: stores[0].name,
      value: stores[0].domain,
      id: stores[0].id,
      verified: stores[0].verified,
    });
  }, [stores]);

  const commonProps = {
    user: {
      stores,
      setStores,
    },
  };

  const viewAnalyticsProps = {
    storeEvents,
    setStoreEvents,
    activeStore,
    setActiveStore,
    ...commonProps,
  };

  return (
    !isLoading && (
      <ProtectedAuthWrapper>
        <ViewAnalytics {...viewAnalyticsProps} />
      </ProtectedAuthWrapper>
    )
  );
}
