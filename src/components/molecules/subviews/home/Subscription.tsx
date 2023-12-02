import { getUserSubscriptionStatus } from "@/apiCalls/auth";
import { cancelSubscription, createPaymentSession } from "@/apiCalls/stripe";
import { Column, Row } from "@/styles/common";
import { getUser } from "@/utils/auth";
import { THEME } from "@/utils/theme";
import getConfig from "next/config";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Toggle from "../../inputs/Toggle";
import LoadingPage from "../loading/LoadingPage";
import { getCustomerSubscriptions } from "@/apiCalls/tracking";
import ModalComponent from "@/components/atoms/Modal";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import DangerButton from "@/components/atoms/buttons/DangerButton";
import Spacer from "@/components/atoms/Spacer";

interface IProfileProps {}

interface ICardProps {
  plan: ISubscriptionPlan;
  interval: {
    label: string;
    value: string;
  };
  activeSubscription: any;
}

interface ISubscriptionPlan {
  id: number;
  type: string;
  name: string;
  highlight: boolean;
  prices: {
    monthly: {
      lookupKey: string;
      unitPrice: number;
      interval: {
        label: string;
        value: string;
      };
    };
    yearly: {
      lookupKey: string;
      unitPrice: number;
      interval: {
        label: string;
        value: string;
      };
    };
  } | null;
  features: {
    id: number;
    label: string;
  }[];
}

const INTERVALS = {
  monthly: {
    label: "Month",
    value: "monthly",
  },
  yearly: {
    label: "Year",
    value: "yearly",
  },
};

const SUBSCRIPTION_INTERVALS = {
  none: "-",
  month: "Monthly",
  year: "Yearly",
};

const PLANS: ISubscriptionPlan[] = [
  {
    id: 1,
    type: "free",
    name: "Basic",
    highlight: false,
    prices: null,
    features: [
      {
        id: 1,
        label: "Upto 3 Stories",
      },
      {
        id: 2,
        label: "Basic Analytics",
      },
      {
        id: 3,
        label: "2K Page Views per month",
      },
      {
        id: 4,
        label: "Paxify Branding",
      },
    ],
  },
  {
    id: 2,
    type: "paid",
    name: "Starter",
    highlight: true,
    prices: {
      monthly: {
        lookupKey: "basic_plan_monthly",
        unitPrice: 14.99,
        interval: INTERVALS.monthly,
      },
      yearly: {
        unitPrice: 149.99,
        interval: INTERVALS.yearly,
        lookupKey: "basic_plan_yearly",
      },
    },
    features: [
      {
        id: 1,
        label: "Unlimited Stories",
      },
      {
        id: 2,
        label: "100K Page Views per month",
      },
      {
        id: 3,
        label: "In-Depth Analytics",
      },
      {
        id: 4,
        label: "No Paxify Branding",
      },
    ],
  },
  {
    id: 3,
    type: "paid",
    name: "Professional",
    highlight: false,
    prices: {
      monthly: {
        lookupKey: "pro_plan_monthly",
        unitPrice: 24.99,
        interval: INTERVALS.monthly,
      },
      yearly: {
        unitPrice: 249.99,
        interval: INTERVALS.yearly,
        lookupKey: "pro_plan_yearly_1",
      },
    },
    features: [
      {
        id: 1,
        label: "Everything in Starter",
      },
      {
        id: 2,
        label: "Unlimited Views per month",
      },
      {
        id: 3,
        label: "Unlimited Customization",
      },
      {
        id: 4,
        label: "Dedicated Slack Support",
      },
    ],
  },
];

const Heading = styled.h1`
  font-size: 1.25rem;
  font-family: "Inter", sans-serif;
  margin: 20px 0;
  padding-left: 10px;
`;

const ModifiedColumn = styled(Column)`
  width: 100%;
  flex-wrap: nowrap;
`;

const Card = styled.form`
  display: flex;
  width: 350px;
  position: relative;
  padding: 20px 20px;
  min-height: 500px;
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${THEME.white2};
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  padding: 3rem 1.5rem;

  &:hover {
    box-shadow: 0 0 10px 0 ${THEME.body1};
  }
`;

const Button = styled.div<{ isDisabled?: boolean }>`
  padding: 15px 20px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.isDisabled ? THEME.background2 : THEME.positive};
  transition: all 0.5s ease-in-out;
  text-align: center;
  width: 100%;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.isDisabled ? THEME.background2 : THEME.positive400};
    color: ${THEME.white};
    transform: scale(1.05);
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0.1px solid;
  opacity: 0.2;
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

const TextTemplate = styled("p")`
  margin: 0;
  font-weight: 500;
  color: ${THEME.primary2};
`;

const MediumText = styled(TextTemplate)`
  font-size: 1.25rem;
  line-height: 1.75rem;
  opacity: 0.8;
`;

const BigText = styled(TextTemplate)<{ as?: "h4" | "h3" }>`
  font-size: ${({ as }) => (as === "h3" ? "2.25rem" : "3.75rem")};
  line-height: ${({ as }) => (as === "h4" ? "2.5rem" : "1rem")};
`;

const SmallText = styled(TextTemplate)`
  font-size: 1rem;
  line-height: 1.655;
  opacity: 0.7;
`;

const ToggleContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  padding: 20px 20px;
  grid-template-columns: 3fr 2.5fr 2.5fr 1.33fr 1.33fr 1.33fr;
`;

const TableHeader = styled(Grid)`
  text-align: center;
`;

const SubscriptionCard = styled(Grid)`
  border-radius: 12px;
  align-items: center;
  text-align: center;
  background-color: ${THEME.white2};
  transition: all 0.5s ease-in-out;
  margin-bottom: 10px;

  &:hover {
    box-shadow: 0 0 10px 0 ${THEME.body1};
  }
`;

const CancelButton = styled.div`
  padding: 15px 20px;
  border-radius: 12px;
  background-color: ${THEME.background2};
  transition: all 0.5s ease-in-out;
  text-align: center;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${THEME.danger};
    color: ${THEME.white};
    transform: scale(1.05);
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${THEME.white};
  border-radius: 12px;
  padding: 20px;
`;

const Subscription: React.FC<IProfileProps> = () => {
  const { publicRuntimeConfig } = getConfig();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [resources, setResources] = useState<any>(null);
  const [hasCustomerSubscription, setHasCustomerSubscription] = useState(false);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [showMonthlyPlans, setShowMonthlyPlans] = useState<boolean>(true);
  const [activeSubscriptions, setActiveSubscriptions] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [toCancelSubscriptionId, setToCancelSubscriptionId] = useState(null);

  const currentPlan = "Basic";
  const user = getUser();

  const SubscriptionPlan = ({
    plan,
    interval,
    activeSubscription,
  }: ICardProps) => {
    const handleSubscribe = () => {
      const user = getUser();
      if (!user) {
        return;
      }

      if (!plan.prices) {
        return;
      }

      setIsLoading(true);

      createPaymentSession({
        lookupKey: (plan.prices as any)[interval.value].lookupKey,
        userId: user?.uid,
        intendedPlan: plan.name,
      })
        .then((res) => {
          window.location.href = res.url;
        })
        .finally(() => setIsLoading(false));
    };

    const isFreePlanDisabled = activeSubscription.plan === plan.name;
    const isPaidPlanDisabled =
      activeSubscription.plan === plan.name &&
      activeSubscription.billingCycle === interval.label;

    return (
      <Card>
        <MediumText>{plan.name}</MediumText>
        {plan.prices ? (
          <Row alignItem="baseline">
            <BigText as="h3">$</BigText>
            <BigText>{(plan.prices as any)[interval.value].unitPrice}</BigText>
          </Row>
        ) : (
          <BigText>Free</BigText>
        )}

        {plan.prices ? (
          <SmallText>
            Per {(plan?.prices as any)?.[interval.value].interval.label}
          </SmallText>
        ) : (
          <SmallText>No Credit Card</SmallText>
        )}

        <Divider />

        {plan.features.map((feature) => (
          <React.Fragment key={feature.id}>
            <SmallText>{feature.label}</SmallText>
          </React.Fragment>
        ))}

        {plan.prices ? (
          <Button
            isDisabled={isPaidPlanDisabled}
            onClick={!isPaidPlanDisabled ? handleSubscribe : () => {}}>
            Subscribe
          </Button>
        ) : (
          <Button isDisabled={isFreePlanDisabled} onClick={() => {}}>
            {isFreePlanDisabled ? "Your Plan" : "Subscribe"}
          </Button>
        )}
      </Card>
    );
  };

  useEffect(() => {
    if (user) {
      getUserSubscriptionStatus(user?.uid)
        .then((res) => {
          setUserSubscription(res.plan);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!userSubscription) {
      return;
    }

    getCustomerSubscriptions(user?.uid as string, userSubscription.stripeId)
      .then((res) => {
        // console.log("res", res);
        setActiveSubscriptions(res.data);
      })
      .finally(() => setHasCustomerSubscription(true));
  }, [userSubscription]);

  const handleSubscriptionCancel = () => {
    setIsLoading(true);
    if (toCancelSubscriptionId === null) {
      return;
    }
    cancelSubscription(toCancelSubscriptionId)
      .then(() => {
        // Refresh the subscriptions
        getCustomerSubscriptions(user?.uid as string, userSubscription.stripeId)
          .then((res) => {
            // console.log("res", res);
            setActiveSubscriptions(res.data);
          })
          .finally(() => setIsLoading(false));
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
        setIsModalVisible(false);
      });
  };

  return (
    <>
      <Head>
        <title>Paxify | Billing</title>
        <meta name="description" content="Paxify analytics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ModifiedColumn style={{ padding: "24px", maxWidth: "100%" }} gap="20px">
        {userSubscription && (
          <>
            <ToggleContainer>
              <Toggle
                selected={showMonthlyPlans}
                toggleSelected={() => setShowMonthlyPlans(!showMonthlyPlans)}
              />
            </ToggleContainer>
            <Row gap="30px">
              {PLANS.map((plan) => (
                <SubscriptionPlan
                  key={plan.id}
                  plan={plan}
                  interval={
                    showMonthlyPlans ? INTERVALS.monthly : INTERVALS.yearly
                  }
                  activeSubscription={userSubscription}
                />
              ))}
            </Row>
          </>
        )}
        <Heading>Your Subscription</Heading>

        {hasCustomerSubscription && userSubscription?.isActive && (
          <div>
            <TableHeader>
              <div>Plan</div>
              <div>Start Date</div>
              <div>Renewal Date</div>
              <div>Amount</div>
              <div>Interval</div>
            </TableHeader>
            {activeSubscriptions?.map((subscription: any) => {
              const startDate = new Date(
                subscription.current_period_start * 1000
              );
              const endDate =
                subscription.current_period_end &&
                new Date(subscription.current_period_end * 1000);

              return (
                <SubscriptionCard key={subscription.id}>
                  <div>{subscription.plan.name}</div>
                  <div>
                    {startDate.getDate()}/{startDate.getMonth() + 1}/
                    {startDate.getFullYear()}
                  </div>
                  {endDate && (
                    <div>
                      {endDate.getDate()}/{endDate.getMonth() + 1}/
                      {endDate.getFullYear()}
                    </div>
                  )}
                  {!endDate && <div>-</div>}
                  <div>
                    ${Number(subscription.plan.amount / 100).toFixed(2)}
                  </div>
                  <div>
                    {/* @ts-ignore */}
                    {SUBSCRIPTION_INTERVALS[subscription.plan.interval]}
                  </div>
                  {endDate && (
                    <CancelButton
                      onClick={() => {
                        setToCancelSubscriptionId(subscription.id);
                        setIsModalVisible(true);
                      }}>
                      Cancel
                    </CancelButton>
                  )}
                </SubscriptionCard>
              );
            })}
          </div>
        )}
        <LoadingPage isLoading={isLoading} />
      </ModifiedColumn>
      {/* <LoadingPage isLoading={!resources} /> */}
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <ModalContainer>
          <Row gap="20px">
            <p>
              Are you sure you want to cancel your subscription? If you are
              facing any issues, please contact us at{" "}
              <a href="mailto:support@paxify.io">
                <b>support@paxify.io</b>
              </a>
            </p>
            <p>
              Your subscription will be cancelled at the end of the current
              billing cycle and you will be downgraded to the free plan.
            </p>
          </Row>
          <Spacer height={20} />
          <Row gap="20px">
            <DangerButton width="30%" onClick={handleSubscriptionCancel}>
              Yes
            </DangerButton>
            <PrimaryButton onClick={() => setIsModalVisible(false)} width="30%">
              No
            </PrimaryButton>
          </Row>
        </ModalContainer>
      </ModalComponent>
    </>
  );
};

export default Subscription;
