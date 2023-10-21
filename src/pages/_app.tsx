import type { ReactElement, ReactNode } from 'react';
// import {Inter} from 'next/font/google'
import type { NextPage } from 'next';
import { ConfigProvider } from 'antd';
import theme from '../theme/theme'; // Assuming you have your custom theme defined here
import type { AppProps } from 'next/app';
import "../styles/globals.css"

// Define a type for NextPage components with layout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// const inter = Inter({ subsets: ['latin'],weight: ['100','200','300','400','500','600','700','800','900'] })

// Extend AppProps to include a Component property with layout
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// MyApp component is the main entry point for your Next.js app
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // Wrap the Component with ConfigProvider to apply the theme
  return (
    <main>
      <ConfigProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </main>
  );
}
