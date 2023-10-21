import { navigateNewPage } from "@/utils/navigate";
import {
  DASHBOARD_ANALYTICS,
  DASHBOARD_STORES,
  DASHBOARD_SUBSCRIPTIONS,
  HOME_PAGE,
  USER_LOGIN,
} from "@/utils/routes";
import { THEME } from "@/utils/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../molecules/Header";

interface IProtectedAdminPageWrapperProps {
  children: React.ReactNode;
}

const RightPane = styled.div`
  overflow: auto;
  height: 100vh;
  display: flex;
  background-color: ${THEME.background0};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 9.5fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
    } else if (tab === 1) {
      return DASHBOARD_ANALYTICS;
    } else {
      return DASHBOARD_SUBSCRIPTIONS;
    }
  };

  useEffect(() => {
    // Check firebase auth status here
    const user = localStorage.getItem("user");
    if (!user) {
      navigateNewPage(USER_LOGIN());
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    !isLoading && (
      <Grid>
        <Header onClick={handleNavigation} activeTab={activeTab} />
        <RightPane>{props.children}</RightPane>
      </Grid>
    )
  );
};

export default ProtectedAuthWrapper;
