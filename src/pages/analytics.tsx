import StoreSelector from "@/components/molecules/subviews/home/StoreSelector";
import ViewAnalytics from "@/components/molecules/subviews/home/ViewAnalytics";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";
import { fetchCurrentUserStores } from "@/utils/firebaseHelpers";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [storeEvents, setStoreEvents] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchCurrentUserStores(user.uid)
      .then((stores) => {
        console.log(stores);
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
      value: stores[0].value,
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
