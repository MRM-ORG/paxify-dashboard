import { Column, Row } from "@/styles/common";
import styled from "styled-components";
import getConfig from "next/config";
import { THEME } from "@/utils/theme";
import { useEffect, useState } from "react";
import LoadingPage from "../loading/LoadingPage";
import Head from "next/head";
import { OFFICIAL_WEBSITE_PRICING } from "@/utils/routes";
import { H2, H3 } from "@/utils/text";
import UsageBar from "@/components/atoms/UsageBar";
import { fetchDomainResourcesForMonth } from "@/apiCalls/resources";

interface IProfileProps {}

const SUBSCRIPTIONS = [
  {
    id: 1,
    name: "Basic",
    price: 0,
    isEnterprise: false,
    cta: {
      label: "Sign Up!",
      href: OFFICIAL_WEBSITE_PRICING(),
    },
    features: [
      {
        id: 1,
        label: (
          <span>
            Upto <strong>5</strong> Stories
          </span>
        ),
      },
      {
        id: 2,
        label: (
          <span>
            <strong>1</strong> Component
          </span>
        ),
      },
      {
        id: 3,
        label: (
          <span>
            Ability to customize <strong>1</strong> Store or Business
          </span>
        ),
      },
      {
        id: 4,
        label: (
          <span>
            Limited <strong>tracking</strong>
          </span>
        ),
      },
      {
        id: 5,
        label: (
          <span>
            Limited <strong>customization</strong>
          </span>
        ),
      },
      {
        id: 6,
        label: (
          <span>
            <strong>50K</strong> page views
          </span>
        ),
      },
      {
        id: 7,
        label: (
          <span>
            Support via <strong>email</strong>
          </span>
        ),
      },
      {
        id: 8,
        label: <span>Paxify Logo</span>,
      },
    ],
  },
  // {
  //   id: 2,
  //   name: "Premium",
  //   price: 25,
  //   cta: {
  //     label: "Sign Up!",
  //     href: "#",
  //   },
  //   promo: "Most Popular",
  //   features: [
  //     {
  //       id: 1,
  //       label: (
  //         <span>
  //           <strong>Unlimited</strong> Stories
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 2,
  //       label: (
  //         <span>
  //           Deeper <strong>insights</strong> & <strong>analytics</strong>
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 3,
  //       label: (
  //         <span>
  //           Ability to customize <strong>1</strong> Store or Business
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 4,
  //       label: (
  //         <span>
  //           <strong>Customization</strong> to match your brand
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 5,
  //       label: (
  //         <span>
  //           Add Stories on <strong>multiple</strong> pages of your website
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 6,
  //       label: (
  //         <span>
  //           <strong>1M</strong> page views
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 7,
  //       label: (
  //         <span>
  //           Priority support via <strong>chat</strong> and{" "}
  //           <strong>email</strong>
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 8,
  //       label: (
  //         <span>
  //           <strong>No </strong>Paxify Logo
  //         </span>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "Enterprise",
  //   isEnterprise: true,
  //   price: "Custom",
  //   cta: {
  //     label: "Contact Us!",
  //     href: "#",
  //   },
  //   features: [
  //     {
  //       id: 1,
  //       label: (
  //         <span>
  //           <strong>Everything</strong> in Pro Plan
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 2,
  //       label: (
  //         <span>
  //           Customize <strong>all</strong> Stores or Businesses under your brand
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 3,
  //       label: (
  //         <span>
  //           Richer <strong>insights</strong> for <strong>all</strong> of your
  //           stories
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 4,
  //       label: (
  //         <span>
  //           <strong>Personalized</strong> help with installation process
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 5,
  //       label: (
  //         <span>
  //           <strong>Custom</strong> page views
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 6,
  //       label: (
  //         <span>
  //           Dedicated <strong>Slack&reg; </strong> support
  //         </span>
  //       ),
  //     },
  //   ],
  // },
];

const Container = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Heading = styled.h1``;

const ModifiedColumn = styled(Column)`
  width: 100%;
  flex-wrap: nowrap;
`;

const Card = styled.form`
  display: flex;
  width: 350px;
  position: relative;
  padding: 20px 20px;
  border-radius: 12px;
  // flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 ${THEME.primary};
  }
`;

const Subscribe = styled.button<{ disable?: boolean }>`
  bottom: 20px;
  // position: absolute;
  max-height: 50px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: ${({ disable }) => (disable ? "none" : "1px solid")};
  cursor: ${({ disable }) => (disable ? "not-allowed" : "pointer")};
  background: ${({ disable }) => (disable ? THEME.background2 : THEME.white)};
  font-size: 16px;
  transition: all 0.5s ease-in-out;

  &:hover {
    scale: ${({ disable }) => (disable ? "1" : "1.1")};
    color: ${({ disable }) => !disable && THEME.white};
    font-weight: ${({ disable }) => (disable ? "400" : "600")};
    background: ${({ disable }) =>
      disable ? THEME.background2 : THEME.primary};
  }
`;

const Button = styled.div`
  padding: 15px 20px;
`;

const Divider = styled.hr`
  height: 75%;
  margin: 10px 0;
`;

const Price = styled.div`
  font-size: 40px;
`;

const ResourceContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 450px) {
    & > div {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const Resource = styled.div`
  min-width: 100px;
`;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Subscription: React.FC<IProfileProps> = () => {
  const { publicRuntimeConfig } = getConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [resources, setResources] = useState<any>(null);

  const currentPlan = "Basic";

  return (
    <>
      <Head>
        <title>Paxify | Billing</title>
        <meta name="description" content="Paxify analytics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ModifiedColumn style={{ padding: "24px", maxWidth: "100%" }} gap="20px">
        <Heading>Manage Subscription</Heading>

        <stripe-pricing-table
          pricing-table-id="prctbl_1O9Z7aAZBT51e6S41rqDFNZf"
          publishable-key="pk_test_51NXppaAZBT51e6S4cKWQ0uRZbEduqv5fgb3mv4dZmo5BGTY5JZwHQa4Xo6s0xFxEh41SbgM54kCaR11fTbNsVq5q00mOJX4TpX"></stripe-pricing-table>

        <LoadingPage isLoading={isLoading} />
      </ModifiedColumn>
      {/* <LoadingPage isLoading={!resources} /> */}
    </>
  );
};

export default Subscription;
