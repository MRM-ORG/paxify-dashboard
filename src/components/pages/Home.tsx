import { Column, Row } from "@/styles/common";
import { signOutUser } from "@/utils/auth";
import { THEME } from "@/utils/theme";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Analytics from "../atoms/icons/analytics";
import Stores from "../atoms/icons/stores";
import StoreSelector from "../molecules/subviews/home/StoreSelector";
import ViewAnalytics from "../molecules/subviews/home/ViewAnalytics";
import Logo from "../atoms/icons/logo";
import Logout from "../atoms/icons/logout";
import Profile from "../atoms/icons/profile";
import ManageProfile from "../molecules/subviews/home/Profile";

const inter = Inter({ subsets: ["latin"] });

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
`;

const LeftPane = styled.div`
  display: flex;
  height: 100vh;
  color: ${THEME.white};
  flex-direction: column;
  justify-content: space-between;
  background-color: ${THEME.background1};
`;

const RightPane = styled.div`
  overflow: auto;
  height: 100vh;
  display: flex;
  padding: 24px;
  background-color: ${THEME.background0};
`;

const BottomBar = styled(Row)`
  padding: 24px 20px;
  justify-content: space-between;
`;

const TopBar = styled(Column)`
  padding: 24px 10px;
`;

const Divider = styled.hr`
  border: 0.1px solid ${THEME.background0};
`;

const Option = styled(Row)<{ isActive?: boolean }>`
  gap: 7.5px;
  cursor: pointer;
  font-weight: 600;
  padding: 10px 10px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  color: ${({ isActive }) => (isActive ? THEME.blue1 : THEME.white)};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarOptions = [
  {
    id: 0,
    title: "My Stores",
    icon: <Stores />,
  },
  {
    id: 1,
    title: "Analytics",
    icon: <Analytics />,
  },
  {
    id: 2,
    title: "Profile",
    hide: true,
  },
];

const Home: React.FC = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const handleUserSignOut = () => {
    signOutUser();
  };

  const _renderActiveStep = () => {
    const commonProps = {
      user: {
        stores,
        setStores,
      },
    };

    switch (activeStep) {
      case 0:
        return <StoreSelector {...commonProps} />;
      case 1:
        return <ViewAnalytics {...commonProps} />;
      case 2:
        return <ManageProfile />;
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid className={inter.className}>
        <LeftPane>
          <TopBar>
            {SidebarOptions.map(
              (option) =>
                !option?.hide && (
                  <Option
                    isActive={activeStep === option.id}
                    onClick={() => setActiveStep(option.id)}
                    key={option.id}>
                    {option.icon}
                    <div>{option.title}</div>
                  </Option>
                )
            )}
          </TopBar>
          <div>
            <Divider />
            <BottomBar>
              <Logo
                fill={THEME.white}
                width="100"
                height="25"
                fontSize="60"
                xPosition="55%"
              />
              <Row gap="10px">
                <Profile
                  fill={activeStep === 2 ? THEME.blue1 : THEME.white}
                  onClick={() => setActiveStep(2)}
                />
                <Logout onClick={handleUserSignOut} />
              </Row>
            </BottomBar>
          </div>
        </LeftPane>
        <RightPane>{_renderActiveStep()}</RightPane>
      </Grid>
    </>
  );
};

export default Home;
