import { Column, Row } from "@/styles/common";
import { signOutUser } from "@/utils/auth";
import { THEME } from "@/utils/theme";
import { Inter } from "next/font/google";
import Head from "next/head";
import { LegacyRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Analytics from "../atoms/icons/analytics";
import Stores from "../atoms/icons/stores";
import StoreSelector from "../molecules/subviews/home/StoreSelector";
import ViewAnalytics from "../molecules/subviews/home/ViewAnalytics";
import Logo from "../atoms/icons/logo";
import Logout from "../atoms/icons/logout";
import Profile from "../atoms/icons/profile";
import ManageProfile from "../molecules/subviews/home/Profile";
import { isMobileDevice } from "@/utils/responsive";
import Spacer from "../atoms/Spacer";

const inter = Inter({ subsets: ["latin"] });

const navLinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

const UIContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPane = styled.div`
  display: flex;
  height: 100vh;
  color: ${THEME.white};
  flex-direction: column;
  justify-content: space-between;
  background-color: ${THEME.background1};

  @media (max-width: 768px) {
    height: fit-content;
  }
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

const MobileMenuButton = styled.div`
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  user-select: text;
  -webkit-user-select: text;
`;

const MobileBurgerLine = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${THEME.white};
  margin-top: 5px;
  margin-bottom: 5px;
  transition: transform 300ms ease-out;
`;

const MobileNavMenuFlex = styled.div`
  position: absolute;
  width: 90%;
  flex-direction: column;
  padding: 30px 40px;
  padding-bottom: 22px;
  background-color: ${THEME.primary};
  transition: transform 300ms ease-out;
`;

const MobileNavMenu = styled.div`
  z-index: 1;
  margin: 0;
  width: 100%;
  grid-column-gap: 50px;
  grid-row-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
  padding-left: 0;
  display: block;
  list-style: none;
`;

const MobileNavLink = styled.a`
  height: auto;
  min-width: 100%;
  display: inline-block;
  color: ${THEME.white};
  padding: 6px 0;
  margin-left: 25px;
  font-size: 16px;
  text-decoration: none;
  transition: opacity 200ms ease-in-out;
  z-index: 10;

  &:hover {
    color: ${THEME.primary1};
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
  const [isExpanded, setIsExpanded] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [storeEvents, setStoreEvents] = useState<any>(null);

  useEffect(() => {
    // Function to handle clicks outside the header
    const handleClickOutside = (event: any) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    // Add event listener to handle clicks outside the header
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

      <UIContainer className={inter.className}>
        <LeftPane>
          {!isMobileDevice() && (
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
          )}
          <div style={{ zIndex: 1 }}>
            {!isMobileDevice() && <Divider />}

            <BottomBar>
              <Logo
                fill={THEME.white}
                width="100"
                height="25"
                fontSize="60"
                xPosition="55%"
              />
              {!isMobileDevice() && (
                <Row gap="10px">
                  <Profile
                    fill={activeStep === 2 ? THEME.blue1 : THEME.white}
                    onClick={() => setActiveStep(2)}
                  />
                  <Logout onClick={handleUserSignOut} />
                </Row>
              )}
              {isMobileDevice() && (
                <>
                  <MobileMenuButton
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    ref={headerRef as LegacyRef<HTMLDivElement>}
                    aria-label="menu"
                    role="button"
                    tabIndex={0}
                    aria-controls="w-nav-overlay-1"
                    aria-haspopup="menu"
                    aria-expanded={isExpanded}>
                    <div>
                      <MobileBurgerLine
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isExpanded
                            ? "translate3d(0px, 8px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-45deg) skew(0deg, 0deg)"
                            : "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        }}
                      />
                      <MobileBurgerLine
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isExpanded
                            ? "translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
                            : "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        }}
                      />
                      <MobileBurgerLine
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isExpanded
                            ? "translate3d(0px, -8px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(45deg) skew(0deg, 0deg)"
                            : "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        }}
                      />
                    </div>
                  </MobileMenuButton>
                  <MobileNavMenuFlex
                    style={{
                      transform: isExpanded
                        ? "translateY(150px)"
                        : "translateY(-150px)",
                    }}>
                    <MobileNavMenu role="list">
                      {SidebarOptions.map(
                        (option) =>
                          !option.hide && (
                            <Option
                              key={option.id}
                              isActive={activeStep === option.id}
                              onClick={() => setActiveStep(option.id)}>
                              {option.icon}
                              <div>{option.title}</div>
                            </Option>
                          )
                      )}
                      <Spacer height={5} />
                      <Divider />
                      <Spacer height={5} />
                      <Option gap="10px" onClick={() => setActiveStep(2)}>
                        <Row gap="10px">
                          <Profile
                            fill={activeStep === 2 ? THEME.blue1 : THEME.white}
                          />
                          <div>Profile</div>
                        </Row>
                      </Option>
                      <Option onClick={handleUserSignOut}>
                        <Row gap="10px">
                          <Logout />
                          <div>Logout</div>
                        </Row>
                      </Option>
                    </MobileNavMenu>
                  </MobileNavMenuFlex>
                </>
              )}
            </BottomBar>
          </div>
        </LeftPane>
        <RightPane>{_renderActiveStep()}</RightPane>
      </UIContainer>
    </>
  );
};

export default Home;
