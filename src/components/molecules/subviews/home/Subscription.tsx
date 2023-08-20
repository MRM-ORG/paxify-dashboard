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

const Subscription: React.FC<IProfileProps> = () => {
  const { publicRuntimeConfig } = getConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [resources, setResources] = useState<any>(null);

  const currentPlan = "Basic";

  useEffect(() => {
    fetchDomainResourcesForMonth("localhost:5173").then((res) => {
      setResources(res);
    });
  }, []);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (selectedPlan === "Premium") {
      setIsLoading(true);
      const response = await fetch(
        `${publicRuntimeConfig.STRIPE_BACKEND_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lookup_key: "reels_pro",
          }),
        }
      ).then((res) => {
        setIsLoading(false);
        return res.json();
      });
      const { url } = response;

      window.location.href = url;
    }

    if (selectedPlan === "Enterprise") {
      // Open mail client with subject line "Enterprise Plan"
      window.location.href = `mailto:paxifydev@gmail.com?subject=Enterprise Plan&body=Hi, Paxify, I'm interested in the Enterprise Plan for Reels Life.`;
    }
  };

  return (
    <>
      <Head>
        <title>Paxify | Billing</title>
        <meta name="description" content="Paxify analytics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ModifiedColumn style={{ padding: "24px", maxWidth: "100%" }} gap="20px">
        <Heading>Billing & Resource Monitoring</Heading>

        {resources && (
          <ResourceContainer>
            <Row gap="15px">
              <Resource>Stores</Resource>
              <UsageBar consumed={resources["stores"]} available={1} />
            </Row>

            <Row gap="15px">
              <Resource>Components</Resource>
              <UsageBar consumed={resources["components"]} available={3} />
            </Row>

            <Row gap="15px">
              <Resource>Page Views</Resource>
              <UsageBar consumed={resources["pageViews"]} available={50000} />
            </Row>

            <Row gap="15px">
              <Resource>API Calls</Resource>
              <UsageBar consumed={resources["apiCalls"]} available={200000} />
            </Row>
          </ResourceContainer>
        )}

        <strong>
          <i>*Metrics reset at the start of every month</i>
        </strong>

        <H2>Current Plan</H2>
        <Row gap="20px">
          <Container>
            {SUBSCRIPTIONS.map((subscription) => (
              <Card onSubmit={handleFormSubmit} key={subscription.id}>
                <Column>
                  <Row>
                    <div>{subscription?.name}</div>
                  </Row>
                  <Row>
                    {!subscription?.isEnterprise && <div> $</div>}
                    <Price>{subscription?.price}</Price>
                    {!subscription?.isEnterprise && <div>/mo</div>}
                  </Row>
                </Column>
                <Divider />
                {/* <Column gap="2px">
                  {subscription?.features.map((feature: any) => (
                    <Row key={feature.id}>{feature?.label}</Row>
                  ))}
                </Column> */}
                <input type="hidden" name="lookup_key" value="pro_plan" />
                <Subscribe
                  onClick={() => {
                    // setSelectedPlan(subscription.name);
                    window.location.href = subscription?.cta?.href;
                  }}
                  // disable={currentPlan === subscription.name}
                  id="checkout-and-portal-button"
                  type="submit">
                  <Button>
                    {currentPlan === subscription.name
                      ? "Learn More"
                      : subscription?.cta?.label}
                  </Button>
                </Subscribe>
              </Card>
            ))}
          </Container>
        </Row>
        <LoadingPage isLoading={isLoading} />
      </ModifiedColumn>
      <LoadingPage isLoading={!resources} />
    </>
  );
};

export default Subscription;
