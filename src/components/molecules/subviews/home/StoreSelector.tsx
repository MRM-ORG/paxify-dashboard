import {
  fetchUserStores,
  getStoreVerificationStatus,
  registerStore,
} from "@/apiCalls/auth";
import ModalComponent from "@/components/atoms/Modal";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import Copy from "@/components/atoms/icons/copy";
import CopyDone from "@/components/atoms/icons/copyDone";
import Tooltip from "@/components/atoms/icons/tooltip";
import {
  StoreRegisterForm,
  StoreRegisterSchema,
} from "@/components/schemas/StoreRegisterSchema";
import { Column, Row } from "@/styles/common";
import { THEME } from "@/utils/theme";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import FormikLabelledTextInput from "../../inputs/formik/FormikLabelledTextInput";
import LoadingPage from "../loading/LoadingPage";
import Switch from "@/components/atoms/Switch";
import Delete from "@/components/atoms/icons/delete";

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
  gap: 16px;
  max-width: 500px;
  flex-direction: column;
  align-items: flex-start;

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
  background-color: ${THEME.white};
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

const StoreSelector: React.FC<IStoreSelectorProps> = ({ user }) => {
  const [stores, setStores] = useState<any>([]);
  const [activeStore, setActiveStore] = useState<any>();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  let VERIFICATION_SCRIPT: any = null;

  try {
    const signInUser = JSON.parse(localStorage.getItem("user") as string);
    const { uid } = signInUser;

    VERIFICATION_SCRIPT = `<script>
          var uid = ${uid};
          var storeId = ${activeStore?.id};
</script>
<script src="https://cdn.jsdelivr.net/gh/MRM-ORG/builds@latest/reelife/auth.js"></script>`;
  } catch (error) {
    console.error(error);
    alert("An error occured, please try again later.");
  }

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const { uid } = user;

      fetchUserStores(uid).then((stores) => {
        setStores(stores);
      });
    } catch (error) {
      console.error(error);
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
    isCopied && navigator.clipboard.writeText(VERIFICATION_SCRIPT);

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
        <h1>Domain Management</h1>
        <p>
          Here are all the stores under your ownership. You can also add or
          remove stores, if that is covered under the subscription.
        </p>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ storeName: "", storeDomain: "" }}
          validationSchema={StoreRegisterSchema}
          onSubmit={(values: any) => {
            const storeName = values.storeName.trim();
            const storeDomain = values.storeDomain.trim();
            if (!storeDomain || !storeName) return;

            const loggedInUser = JSON.parse(
              localStorage.getItem("user") as string
            );
            const { uid } = loggedInUser;

            setIsLoading(true);

            registerStore(uid, storeName, storeDomain)
              .then(() => {
                const user = JSON.parse(localStorage.getItem("user") as string);
                const { uid } = user;

                fetchUserStores(uid).then((stores) => {
                  setStores(stores);
                });
              })
              .catch((err) => {
                alert(
                  "An error occured, please make sure your subscription allows you to add more stores."
                );
                console.error(err);
              })
              .finally(() => setIsLoading(false));

            values.storeName = "";
            values.storeDomain = "";
          }}>
          {({ values, errors }) => {
            // console.log(values, errors);
            return (
              <Form>
                <NewStore>
                  <FormikLabelledTextInput
                    type="text"
                    label={StoreRegisterForm.formField.store.label}
                    name={StoreRegisterForm.formField.store.name}
                    placeholder={StoreRegisterForm.formField.store.placeholder}
                  />
                  <FormikLabelledTextInput
                    type="text"
                    label={StoreRegisterForm.formField.domain.label}
                    name={StoreRegisterForm.formField.domain.name}
                    placeholder={StoreRegisterForm.formField.domain.placeholder}
                  />
                  <PrimaryButton
                    onClick={() => {}}
                    type="submit"
                    width="200px"
                    action="login"
                    background={THEME.buttonPrimary}>
                    Register Store
                  </PrimaryButton>
                </NewStore>
              </Form>
            );
          }}
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
                {store.verified ? "Verified" : "Pending Verified"}
              </VerificationBadge>
              {window?.innerWidth > 768 && (
                <Tooltip
                  onClick={() => {
                    setActiveStore(store);
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
      </Container>
      <ModalComponent
        isVisible={showInstructions}
        onClose={() => setShowInstructions(false)}>
        <Instructions>
          <h2>Verification Instructions</h2>
          <p>
            To verify domain ownership, please add the following script to the
            {" <head >"} element as far up as possible. Don’t add more than one
            script to your store.
          </p>
          <Script onClick={() => setIsCopied(true)}>
            <pre>{VERIFICATION_SCRIPT}</pre>
            {!isCopied ? <Copy /> : <CopyDone />}
          </Script>
          <p>
            Once completed, publish a new store version and then click on Verify
          </p>
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
