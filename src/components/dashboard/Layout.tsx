import React, { useEffect, useState } from "react";
import { items } from "@/constants";
import { usePathname } from "next/navigation";
import { Layout, Menu, Button, Grid, Avatar } from "antd";
import { fetchUserStores, getUserSubscriptionStatus } from "@/apiCalls/auth";
import { navigateNewPage } from "@/utils/navigate";
import { UserOutlined } from "@ant-design/icons";
import { DASHBOARD_STORES, DASHBOARD_SUBSCRIPTIONS } from "@/utils/routes";
import ModalComponent from "../atoms/Modal";
import styled from "styled-components";
import LoadingPage from "../molecules/subviews/loading/LoadingPage";
import { useRouter } from "next/router";
import { getUser } from "@/utils/auth";

const Container = styled.div`
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  & button {
    background: #1890ff;
  }
`;

const { Header, Content, Footer, Sider } = Layout;

const { useBreakpoint } = Grid;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const screens = useBreakpoint();
  const [hasStores, setHasStores] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const pathParts = pathname.split("/").filter((part) => part !== "");
  const lastPart = pathParts[pathParts.length - 1];

  const replacedLastPart = lastPart.replace(/_/g, " ");

  const capitalizedWords = replacedLastPart.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const finalResult = capitalizedWords.join(" ");

  const user = getUser();

  useEffect(() => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    getUserSubscriptionStatus(user?.uid)
      .then((res) => {
        // console.log("STORES:", res);
        setHasSubscription(res.plan.isActive);
        if (res.plan.isActive) {
          fetchUserStores(user?.uid)
            .then((res) => {
              setHasStores(JSON.stringify(res) !== "{}");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingPage isLoading={isLoading} />;
  }

  return (
    <>
      {hasStores && hasSubscription && (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            breakpoint={screens.md ? undefined : "lg"}
            collapsedWidth={screens.md ? undefined : "0"}
            collapsible
            theme="light"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu
              defaultSelectedKeys={[pathname]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: "white",
                borderBottom: "1px solid #e8e8e8",
              }}>
              <div className="flex justify-between">
                <div className="pl-10">
                  <span style={{ fontWeight: "bold", fontSize: "27px" }}>
                    {finalResult}
                  </span>
                </div>
                <div className="flex flex-row pr-10">
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push("/dashboard/settings")}>
                    <Avatar
                      shape="square"
                      icon={<UserOutlined className="mt-2" />}
                      className="h-[35px] w-[37px]"
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <span style={{ fontWeight: "600" }}>
                      {user && user.email
                        ? user.email.split("@")[0]
                        : "Profile"}
                    </span>
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            </Header>
            <Content>{children}</Content>
            <Footer style={{ textAlign: "center" }}>© 2023 Reellife</Footer>
          </Layout>
        </Layout>
      )}
      <ModalComponent isVisible={!hasStores} onClose={() => {}}>
        <Container>
          <h1>No Store Found</h1>
          <p>
            You don&apos;t have any store. Please create a store to continue
            using Reellife.
          </p>
          <Button
            type="primary"
            onClick={() => navigateNewPage(DASHBOARD_STORES())}>
            Create Store
          </Button>
        </Container>
      </ModalComponent>
      <ModalComponent isVisible={!hasSubscription} onClose={() => {}}>
        <Container>
          <h1>No Subscription Found</h1>
          <p>
            Your subscription has expired. Please renew your subscription to
            continue using Reellife.
          </p>
          <Button
            type="primary"
            onClick={() => navigateNewPage(DASHBOARD_SUBSCRIPTIONS())}>
            Renew Subscription
          </Button>
        </Container>
      </ModalComponent>
    </>
  );
};

export default DashboardLayout;
