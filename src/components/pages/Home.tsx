import { signOutUser } from "@/utils/auth";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ManageProfile from "../molecules/subviews/home/Profile";
import StoreSelector from "../molecules/subviews/home/StoreSelector";
import Subscription from "../molecules/subviews/home/Subscription";
import ViewAnalytics from "../molecules/subviews/home/ViewAnalytics";

const Home: React.FC = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [storeEvents, setStoreEvents] = useState<any>(null);

  const _renderActiveStep = () => {
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

    switch (activeStep) {
      case 0:
        return <StoreSelector {...commonProps} />;
      case 1:
        return <ViewAnalytics {...viewAnalyticsProps} />;
      case 2:
        return <ManageProfile />;
      case 3:
        return <Subscription />;
      default:
        return <h1>Coming Soon...</h1>;
    }
  };

  return (
    <>
      <Head>
        <title>Paxify | Dashboard</title>
        <meta name="description" content="Paxify dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <>{_renderActiveStep()}</>
    </>
  );
};

export default Home;
