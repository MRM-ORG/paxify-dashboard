import styled from "styled-components";
import Spacer from "../atoms/Spacer";

const Container = styled.div`
  padding: 20px;
`;

const Flex = styled.div`
  gap: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const Text = styled.div`
  font-family: "Inter", sans-serif;
`;

const Heading = styled(Text)`
  font-size: 1.5rem;
`;

const Subheading = styled(Text)`
  font-size: 1.25rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 12px;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Instructions: React.FC = () => {
  return (
    <Container>
      <Heading>Instructions</Heading>
      <Text>
        This page will walk you through the instructions on how to integrate
        Reelife by Paxify into your eCommerece store. If you have any questions
        or concerns, please contact us at our{" "}
        <a href="mailto:support@paxify.io">
          <b>Support Email</b>
        </a>
        . All plans come with FREE personalized installation support for your
        piece of mind 🎉
      </Text>
      <br />
      <Flex>
        <div>
          <Subheading>Step 1</Subheading>
          <Text>
            The first step is to choose a plan that best suits your needs. By
            default, you will be signed up for a generous ALWAYS FREE plan that
            allows you to gauge the effectiveness of Reelife in your store. If
            you would like to upgrade, you can do so by going to the
            Subscriptions tab from the left sidebar. After selecting one, you
            will be redirected to Stripe&reg; to complete the payment process.
            Stripe&reg; is a secure payment processor that allows you to perform
            transactions securely. We do not store any of your payment
            information on our servers.
          </Text>
        </div>
        <Image width="600px" src="/instructions/Step 1.png" alt="Step 1" />
      </Flex>
      <Flex>
        <Image width="600px" src="/instructions/Step 2.png" alt="Step 2" />
        <div>
          <Subheading>Step 2</Subheading>
          <Text>
            After opting for the right plan, you will be redirected to this
            dashboard. At this point, you are ready to register the store you
            need Reelife to be integrated with. To do so, click on the Add
            Stores tab from the left sidebar and fill out the form. Click on
            Validate to register your store with us.
          </Text>
        </div>
      </Flex>
      <Flex>
        <div>
          <Subheading>Step 3</Subheading>
          <Text>
            Click on Tooltip icon next to the store verification badge. It will
            open a modal disclosing the script that needs to be added to your
            website. Please follow the instructions based on your website
            (Shopify/ Others).
          </Text>
        </div>
        <Image width="600px" src="/instructions/Step 3.png" alt="Step 3" />
      </Flex>
      <Flex>
        <Image width="600px" src="/instructions/Step 4.png" alt="Step 4" />
        <div>
          <Subheading>Step 4</Subheading>
          <Text>
            Upon successful installation, you should see the green
            congratulatory message. You can now proceed to the Dashboard tab on
            your left to start creating stories and see the analytics.
          </Text>
        </div>
      </Flex>
      <i>
        In case you are facing any issues, please contact us at our{" "}
        <a href="mailto:support@paxify.io">
          <b>Official Support</b>.{" "}
        </a>
        Our team will be happy to assist you with the installation process. We
        do cater to custom installations as well in case you need any help with
        that. This carries NO additional cost.
      </i>
      <Spacer height={50} />
    </Container>
  );
};

export default Instructions;
