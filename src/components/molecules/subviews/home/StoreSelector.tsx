import {
  fetchUserStores,
  getStoreVerificationStatus,
  registerStore,
} from "@/apiCalls/auth";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Column, Row } from "@/styles/common";
import { transformDomain } from "@/utils/helpers";
import { THEME } from "@/utils/theme";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import FormikLabelledTextInput from "../../inputs/formik/FormikLabelledTextInput";
import TabbedSelector from "../layoutSelector/TabbedSelector";
import LoadingPage from "../loading/LoadingPage";
import ModalComponent from "../../../atoms/Modal";
import Tooltip from "../../../atoms/icons/tooltip";
import Copy from "../../../atoms/icons/copy";
import CopyDone from "../../../atoms/icons/copyDone";
import Switch from "../../../atoms/Switch";
import Delete from "../../../atoms/icons/delete";

interface IStoreSelectorProps {
  user: {
    stores: any[];
    setStores: (stores: string[]) => void;
  };
}

const Container = styled(Column)`
  gap: 10px;
  padding: 24px;
  max-width: 100%;
`;

const NewStore = styled(Row)`
  gap: 25px;
  max-width: 700px;
  flex-wrap: nowrap;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const RegisteredDomains = styled.div`
  margin-top: 20px;
  font-weight: 600;
`;

const Store = styled(Row)`
  padding: 12px 24px;
  border-radius: 8px;
  width: 100%;
  justify-content: space-between;
  background-color: ${THEME.background0};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  }
`;

const VerificationBadge = styled.div<{ isVerified: boolean }>`
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 18px;
  background-color: ${(props) => (props.isVerified ? "green" : "orange")};
`;

const Instructions = styled(Column)`
  gap: 16px;
  padding: 20px;
`;

const Script = styled(Row)`
  padding: 20px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  justify-content: space-between;
  flex-wrap: nowrap;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
`;

const Success = styled.div`
  color: green;
`;

const Code = styled.code`
  max-width: 90%;
`;

const StoreSelector: React.FC<IStoreSelectorProps> = ({ user }) => {
  // return null;

  const [stores, setStores] = useState<any>([]);
  const [activeStore, setActiveStore] = useState<any>();
  const [activeUser, setActiveUser] = useState<any>();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTabShopify, setActiveTabShopify] = useState(true);

  let VERIFICATION_SCRIPT_SHOPIFY: any = null;
  let VERIFICATION_SCRIPT_MANUAL: any = null;

  try {
    const signInUser = JSON.parse(localStorage.getItem("user") as string);
    const { uid } = signInUser;

    VERIFICATION_SCRIPT_SHOPIFY = `<script>var uid = '${uid}'; var storeId = '${activeStore?.id}';</script><script id="authScript" src={{ "https://cdn.jsdelivr.net/gh/paxify-llc/builds/reelife/auth.js" }} defer="defer"></script>`;
    VERIFICATION_SCRIPT_MANUAL = `<script>var uid = '${uid}'; var storeId = '${activeStore?.id}';</script><script id="authScript" src="https://cdn.jsdelivr.net/gh/paxify-llc/builds/reelife/auth.js"></script>`;
  } catch (error) {
    console.error(error);
    alert("An error occured, please try again later.");
  }

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const { uid } = user;
      setIsLoading(true);
      setActiveUser(uid);

      fetchUserStores(uid).then((stores) => {
        if (Array.isArray(stores)) {
          setStores(stores);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkIfStoreVerified = () => {
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user") as string);
    const { uid } = user;

    getStoreVerificationStatus(uid, activeStore.id)
      .then((res) => {
        setIsVerified(res.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsVerified(null);

    if (!showInstructions) {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const { uid } = user;

      fetchUserStores(uid).then((stores) => {
        setStores(stores);
      });
    }
  }, [showInstructions]);

  useEffect(() => {
    isCopied && navigator.clipboard.writeText(VERIFICATION_SCRIPT_SHOPIFY);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);

  return (
    <>
      <Head>
        <title>Paxify | My Stores</title>
        <meta name="description" content="Paxify dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <h1>My Stores</h1>
        <p>
          Here are all the stores under your ownership. You can also add or
          remove stores, if that is covered under the subscription.
        </p>
        <Formik
          initialValues={{ name: "", store: "" }}
          onSubmit={(values: any) => {
            const store = values.store.trim();
            const name = values.name.trim();

            console.log(stores);

            if (stores && stores.length > 0) {
              alert("You can only add one store at the moment.");
              return;
            }

            if (!store) return;

            const loggedInUser = JSON.parse(
              localStorage.getItem("user") as string
            );
            const { uid } = loggedInUser;

            registerStore(uid, { name, store })
              .then(() => {
                setStores([
                  ...user?.stores,
                  {
                    name,
                    domain: store,
                  },
                ]);
              })
              .catch((err) => {
                alert(err);
                console.error(err);
              });

            values.store = "";
          }}>
          <Form>
            <NewStore>
              <FormikLabelledTextInput
                type="text"
                label="Label"
                name="name"
                placeholder="What do you call this store?"
              />
              <FormikLabelledTextInput
                type="text"
                label="Domain Name"
                name="store"
                placeholder="Enter store domain"
              />
              <PrimaryButton
                onClick={() => {}}
                type="submit"
                width="200px"
                action="login"
                background={THEME.buttonPrimary}>
                Validate
              </PrimaryButton>
            </NewStore>
          </Form>
        </Formik>

        {JSON.stringify(stores) !== "{}" && (
          <RegisteredDomains>Registered Stores</RegisteredDomains>
        )}

        {Object.values(stores).map((store: any) => (
          <Store key={store.label}>
            <p>{store.name}</p>
            <p>{store.domain}</p>
            <Row gap="5px">
              <VerificationBadge isVerified={store.verified}>
                {store.verified ? "Verified" : "Pending Verification"}
              </VerificationBadge>
              {window?.innerWidth > 768 && (
                <Tooltip
                  onClick={() => {
                    setActiveStore(store);
                    setActiveTabShopify(true);
                    setShowInstructions(true);
                  }}
                />
              )}
            </Row>
            <Switch id={store.id} toggled={store.verified} onClick={() => {}}>
              Status
            </Switch>
            <Delete onClick={() => {}} />
          </Store>
        ))}

        {/* <RegisteredDomains>My Existing Stores</RegisteredDomains>
        {stores?.map((store: any) => (
          <Row key={store.label} gap="90px">
            <p>{store.label}</p>
            <p>{store.accessToken}</p>
          </Row>
        ))}
        {stores?.map((store: any) => (
          <Row key={store?.id} gap="90px">
            <p>{store?.name}</p>
            <p>{store?.domain}</p>
          </Row>
        ))} */}
      </Container>
      <ModalComponent
        isVisible={showInstructions}
        onClose={() => setShowInstructions(false)}>
        <Instructions>
          <h2>Domain Verification</h2>

          <TabbedSelector
            tabs={["Shopify", "Others"]}
            onChange={() => setActiveTabShopify(!activeTabShopify)}
          />

          <p>
            To verify domain ownership, please add the following script to the
            {!activeTabShopify ? (
              <>
                <b> theme.liquid</b> file.
              </>
            ) : (
              <>
                <b> {`<head >`}</b> tag as far up as possible.
              </>
            )}{" "}
            Don’t add more than one script to your store.
          </p>

          {activeTabShopify && (
            <Script onClick={() => setIsCopied(true)}>
              <Code>{VERIFICATION_SCRIPT_SHOPIFY}</Code>
              {!isCopied ? <Copy /> : <CopyDone />}
            </Script>
          )}

          {!activeTabShopify && (
            <Script onClick={() => setIsCopied(true)}>
              <Code>{VERIFICATION_SCRIPT_MANUAL}</Code>
              {!isCopied ? <Copy /> : <CopyDone />}
            </Script>
          )}
          <p>Once completed, visit the store and then click on Verify</p>
          <PrimaryButton width="200px" onClick={checkIfStoreVerified}>
            Verify
          </PrimaryButton>
          {isVerified !== null && !isVerified && (
            <Error>
              <>
                <strong>
                  {activeStore.name} ({activeStore.domain})
                </strong>{" "}
                is not verified yet. Please ensure you have added the script to
                your store by following the instructions above.
              </>
            </Error>
          )}
          {isVerified && (
            <Success>
              <>
                Congratulations! 🎉{" "}
                <strong>
                  {activeStore.name} ({activeStore.domain})
                </strong>{" "}
                is successfully verified. You can now start using Reelife by
                Paxify in your store🚀.
              </>
            </Success>
          )}
        </Instructions>
      </ModalComponent>
      <LoadingPage isLoading={isLoading} />
    </>
  );
};

export default StoreSelector;
