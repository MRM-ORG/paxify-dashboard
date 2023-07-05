import { THEME } from "@/utils/theme";
import { Inter } from "next/font/google";
import Head from "next/head";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { webAuth } from "@/firebase/firebase";
import { navigateNewPage } from "@/utils/navigate";
import { USER_LOGIN } from "@/utils/routes";
import { signOutUser } from "@/utils/auth";

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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${THEME.background0};
`;

const BottomBar = styled.div`
  padding: 24px 20px;
  cursor: pointer;
`;

const TopBar = styled.div`
  padding: 24px 20px;
`;

const Divider = styled.hr`
  border: 0.1px solid ${THEME.background0};
`;

const Home: React.FC = () => {
  const handleUserSignOut = () => {
    signOutUser();
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
            <div>Stores</div>
          </TopBar>
          <div>
            <Divider />
            <BottomBar onClick={handleUserSignOut}>Sign Out</BottomBar>
          </div>
        </LeftPane>
        <RightPane>
          <h1>Welcome to Paxify</h1>
        </RightPane>
      </Grid>
    </>
  );
};

export default Home;
