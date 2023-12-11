import {
  deleteStore,
  fetchUserStores,
  getStoreVerificationStatus,
  registerStore,
} from "@/apiCalls/auth";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Column, Row } from "@/styles/common";
import { getLiquidFileContents, transformDomain } from "@/utils/helpers";
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
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

interface IStoreSelectorProps {}

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

const Heading = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Steps = styled.div`
  max-height: 500px;
  overflow: auto;
`;

const StoreSelector: React.FC<IStoreSelectorProps> = () => {
  const [stores, setStores] = useState<any>([]);
  const [activeStore, setActiveStore] = useState<any>();
  const [activeUser, setActiveUser] = useState<any>();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [shopify, setIsShopify] = useState(true);
  const [deleteStoreModal, setDeleteStoreModal] = useState(false);

  let VERIFICATION_SCRIPT_MANUAL: any = null;

  try {
    const signInUser = JSON.parse(localStorage.getItem("user") as string);
    const { uid } = signInUser;

    VERIFICATION_SCRIPT_MANUAL = `<script>
    var uid = '${uid}', storeId = '${activeStore?.id}';
  </script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paxify-llc/builds@latest/reelife/paxify-reelife.min.css">
  <style>
    #paxify div:empty { display: block; }
    .container { width: 100%; height: 110px; }
    .skeleton { border-radius: 100%; width: 70px; height: 70px; float: left; margin: 20px 20px 20px 0; background-color: #eee; }
    @media (min-width: 769px) { .container { display: flex; align-items: center; justify-content: center; } }
  </style>
  <script id="authScript" src="https://cdn.jsdelivr.net/gh/paxify-llc/builds@latest/reelife/auth.js" defer></script>
  <script defer id="paxifyReelife" src="https://cdn.jsdelivr.net/gh/paxify-llc/builds@latest/reelife/paxify-reelife.js"></script>
  <script>
    document.getElementById('paxifyReelife').onload = function () {
      new ReelsInitializer({ uid: uid, storeId: storeId, elementId: 'paxify' }).render();
    };
  </script>
  <div id="paxify">
    <div class="container">
      <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>
      <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>
      <div class="skeleton"></div><div class="skeleton"></div>
    </div>
  </div>
  `;
  } catch (error) {
    console.error(error);
    alert("An error occured, please try again later.");
  }

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

  const handleStoreDeletion = () => {
    const signInUser = JSON.parse(localStorage.getItem("user") as string);
    const { uid } = signInUser;

    if (!uid || !activeStore?.id) return;
    deleteStore(uid, activeStore.id).then(() => {
      setStores(stores.filter((store: any) => store.id !== activeStore.id));
      setDeleteStoreModal(false);
    });
  };

  useEffect(() => {
    // We don't need to make this call if modal is open or if store is already verified
    if (showInstructions) return;
    if (isVerified) return;

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
  }, [showInstructions]);

  useEffect(() => {
    isCopied && navigator.clipboard.writeText(VERIFICATION_SCRIPT_MANUAL);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);

  const handleLiquidFileDownload = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const { uid } = user;
    const storeId = activeStore.id;
    const fileContent = getLiquidFileContents(uid, storeId);

    // Create a Blob containing the file content
    const blob = new Blob([fileContent], { type: "text/plain" });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "paxify-reelife.liquid"; // Set the desired file name

    // Trigger a click event on the anchor element to start the download
    a.click();

    // Clean up by revoking the Blob URL
    URL.revokeObjectURL(blobUrl);
  };

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
              .then((res) => {
                setStores([
                  ...stores,
                  {
                    name,
                    domain: store,
                    id: res.store.id,
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
                    setIsShopify(true);
                    setShowInstructions(true);
                  }}
                />
              )}
            </Row>
            {/* <Switch id={store.id} toggled={store.verified} onClick={() => {}}>
              Status
            </Switch> */}
            <Delete
              onClick={() => {
                setActiveStore(store);
                setDeleteStoreModal(true);
              }}
            />
          </Store>
        ))}
      </Container>
      <ModalComponent
        isVisible={showInstructions}
        onClose={() => setShowInstructions(false)}>
        <Instructions>
          <h2>Installation Instructions</h2>

          <TabbedSelector
            tabs={["Shopify Store", "Other Store - Manual Installation"]}
            onChange={() => setIsShopify(!shopify)}
          />

          {!shopify && (
            <Steps>
              <p>
                You can now seamlessly integrate Reelife in your Shopify Online
                Store. Copy this script and head over to Shopify Theme
                Customizer.
              </p>
              <br />
              <Script onClick={() => setIsCopied(true)}>
                <Code>{VERIFICATION_SCRIPT_MANUAL}</Code>
                {!isCopied ? <Copy /> : <CopyDone />}
              </Script>
              <br />
              <p>
                Add a block <b>Custom Liquid</b> by clicking on{" "}
                <b>Add Section</b>.
              </p>
              <br />
              <br />
              <img
                width="100%"
                src="/instructions/Theme Customizer Step 1.png"
                alt="Theme Customizer Step 1"
              />
              <br />
              <p>
                Past the script copied earlier in the <b>Custom Liquid </b>{" "}
                section. Note that this script is specific to your store and
                should not be shared with anyone else.
              </p>
              <br />
              <img
                width="100%"
                src="/instructions/Theme Customizer Step 2.png"
                alt="Theme Customizer Step 2"
              />
              <br />
              <p>
                Once added, you can adjust the padding and background by
                changing the options as per your needs. Click Save and open the
                website for the changes to take effect.
              </p>
              <p>
                After completing the above steps, click on the Verify button to
                check the status of integration. If it is successful, you can
                now go to the Dashboard tab to create your first story and start
                using Reelife in your store.
              </p>
              <br />
              <PrimaryButton width="200px" onClick={checkIfStoreVerified}>
                Verify
              </PrimaryButton>
            </Steps>
          )}

          {shopify && (
            <>
              <p>
                At the moment, installing Reelife by Paxify in Non-Shopify
                stores needs to be done manually.
                <br /> The process needs to be done by someone who has access to
                the store codebase.
                <br /> You can contact us at our{" "}
                <a href="mailto:support@paxify.io">
                  <b>Offical Support</b>{" "}
                </a>{" "}
                for FREE consultation and assistance.
              </p>
              <p>
                To verify domain ownership, please add the following script to
                the <b> head</b> tag. Don’t add more than one script to your
                store.
              </p>

              <PrimaryButton width="200px" onClick={checkIfStoreVerified}>
                Verify
              </PrimaryButton>
            </>
          )}

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
      <ModalComponent
        isVisible={deleteStoreModal}
        onClose={() => setDeleteStoreModal(false)}>
        <Instructions>
          <Heading>Are you sure?</Heading>
          <p>
            Do you really want to delete the store <b>{activeStore?.name}</b>?
            All your associated stories, analytics and other data will be lost.
            This action cannot be undone.
          </p>
          <Row gap="20px">
            <PrimaryButton
              background={THEME.danger}
              width="200px"
              onClick={handleStoreDeletion}>
              Delete
            </PrimaryButton>
            <PrimaryButton
              width="200px"
              background={THEME.primary}
              onClick={() => setDeleteStoreModal(false)}>
              Cancel
            </PrimaryButton>
          </Row>
        </Instructions>
      </ModalComponent>
      <LoadingPage isLoading={isLoading} />
    </>
  );
};

export default StoreSelector;
