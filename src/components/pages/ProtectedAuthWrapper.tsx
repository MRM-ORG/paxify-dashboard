import { isUserVerified } from "@/utils/auth";
import { isChromiumBasedBrowser } from "@/utils/helpers";
import { navigateNewPage } from "@/utils/navigate";
import {
  DASHBOARD_ANALYTICS,
  DASHBOARD_PROFILE,
  DASHBOARD_STORES,
  DASHBOARD_SUBSCRIPTIONS,
  INSTRUCTIONS,
  MAIN_DASHBOARD,
  USER_LOGIN,
} from "@/utils/routes";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../molecules/Header";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProtectedAdminPageWrapperProps {
  children: React.ReactNode;
}

const RightPane = styled.div`
  overflow: auto;
  display: flex;
  height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 9.5fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WarningToast = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  padding: 12px;
  text-align: center;
  font-size: 1.25rem;
  background-color: #d5c72f;
`;

const ProtectedAuthWrapper: React.FC<IProtectedAdminPageWrapperProps> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;

    if (path === DASHBOARD_STORES()) {
      setActiveTab(0);
    } else if (path === DASHBOARD_ANALYTICS()) {
      setActiveTab(1);
    } else if (path === DASHBOARD_SUBSCRIPTIONS()) {
      setActiveTab(3);
    } else if (path === INSTRUCTIONS()) {
      setActiveTab(5);
    }
  }, []);

  const handleNavigation = (currentTab: any) => {
    setActiveTab(currentTab);
    const redirectURL = mapTabToRoute(currentTab);
    redirectURL && navigateNewPage(redirectURL());
  };

  const mapTabToRoute = (tab: any) => {
    if (tab === 0) {
      return DASHBOARD_STORES;
    } else if (tab === 2) {
      return DASHBOARD_PROFILE;
    } else if (tab === 3) {
      return DASHBOARD_SUBSCRIPTIONS;
    } else if (tab === 5) {
      return INSTRUCTIONS;
    } else {
      return MAIN_DASHBOARD;
    }
  };

  useEffect(() => {
    console.info("Checking for chromium based browser");

    if (!isChromiumBasedBrowser()) {
      toast.warn("For best experience, we recommend using Chrome browser. ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, []);

  useEffect(() => {
    // Check firebase auth status here
    const user = localStorage.getItem("user");

    if (!user) {
      navigateNewPage(USER_LOGIN());
    } else if (!isUserVerified()) {
      alert("Please verify your email, before proceeding.");
      navigateNewPage(USER_LOGIN());
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    !isLoading && (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          transition={Bounce}
        />
        <Grid>
          <Header onClick={handleNavigation} activeTab={activeTab} />
          <RightPane>{props.children}</RightPane>
        </Grid>
      </div>
    )
  );
};

export default ProtectedAuthWrapper;
