import { useEffect, useState, type ReactElement } from "react";

import { fetchSummarizedEvents, fetchUserStores } from "@/apiCalls/auth";
import DashboardLayout from "@/components/dashboard/Layout";
import Instances from "@/components/dashboard/home/Instances";
import OverViewTop from "@/components/dashboard/home/OverViewTop";
import Stories from "@/components/dashboard/home/Stories";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const [hasStores, setHasStores] = useState(false);
  const [summarizedEvents, setSummarizedEvents] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchUserStores(user?.uid)
      .then((stores) => {
        if (Array.isArray(stores)) {
          setHasStores(stores[0]?.verified);
        }

        fetchSummarizedEvents(user?.uid, stores[0]?.id).then((res) => {
          const events = res.data;
          setSummarizedEvents(events);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!hasStores) {
    return null;
  }

  return (
    <div className="md:py-4 md:px-10">
      <OverViewTop summarizedEvents={summarizedEvents} />
      <Instances summarizedEvents={summarizedEvents} />
      <Stories />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
