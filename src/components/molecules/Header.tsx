import { Column, Row } from "@/styles/common";
import { signOutUser } from "@/utils/auth";
import { isMobileDevice } from "@/utils/responsive";
import { THEME } from "@/utils/theme";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { LegacyRef, useRef, useState } from "react";
import styled from "styled-components";
import Spacer from "../atoms/Spacer";
import Analytics from "../atoms/icons/analytics";
import Card from "../atoms/icons/card";
import Logo from "../atoms/icons/logo";
import Logout from "../atoms/icons/logout";
import Profile from "../atoms/icons/profile";
import Stores from "../atoms/icons/stores";
import { LogoContainer } from "../pages/Login";
import Image from "next/image";

interface IHeaderProps {
  activeTab: number;
  onClick: (item: any) => void;
}

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
  background-color: ${THEME.background1};
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
  {
    id: 3,
    title: "Resource Usage",
    icon: <Card />,
  },
];

const Header: React.FC<IHeaderProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const handleUserSignOut = () => {
    signOutUser();
  };

  return (
    <LeftPane id="header">
      {!isMobileDevice() && (
        <TopBar>
          {SidebarOptions.map(
            (option) =>
              !option?.hide && (
                <Option
                  isActive={props.activeTab === option.id}
                  onClick={() => props.onClick(option.id)}
                  key={option.id}>
                  {option.icon}
                  <div>{option.title}</div>
                </Option>
              )
          )}
        </TopBar>
      )}
      <div id="mobileHeader" style={{ zIndex: 1 }}>
        {!isMobileDevice() && <Divider />}

        <BottomBar>
          <LogoContainer>
            <Image
              src="/logo/reelife.png"
              alt="Paxify Logo"
              width={125}
              height={45}
            />
            By Paxify
          </LogoContainer>

          {!isMobileDevice() && (
            <Row gap="10px">
              <Profile
                fill={props.activeTab === 2 ? THEME.blue1 : THEME.white}
                onClick={() => props.onClick(2)}
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
                    ? "translateY(180px)"
                    : "translateY(-250px)",
                }}>
                <MobileNavMenu role="list">
                  {SidebarOptions.map(
                    (option) =>
                      !option.hide && (
                        <Option
                          key={option.id}
                          isActive={props.activeTab === option.id}
                          onClick={() => props.onClick(option.id)}>
                          {option.icon}
                          <div>{option.title}</div>
                        </Option>
                      )
                  )}
                  <Spacer height={5} />
                  <Divider />
                  <Spacer height={5} />
                  <Option gap="10px" onClick={() => props.onClick(2)}>
                    <Row gap="10px">
                      <Profile
                        fill={props.activeTab === 2 ? THEME.blue1 : THEME.white}
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
  );
};

export default Header;
