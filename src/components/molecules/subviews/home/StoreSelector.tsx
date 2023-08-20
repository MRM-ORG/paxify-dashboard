import { fetchUserStores, registerStore } from "@/apiCalls/auth";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Column, Row } from "@/styles/common";
import { transformDomain } from "@/utils/helpers";
import { THEME } from "@/utils/theme";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import FormikLabelledTextInput from "../../inputs/formik/FormikLabelledTextInput";

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
  max-width: 500px;
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

const StoreSelector: React.FC<IStoreSelectorProps> = ({ user }) => {
  const [stores, setStores] = useState<any>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const { uid } = user;
      setActiveUser(uid);

      fetchUserStores(uid).then((stores) => {
        setStores(stores);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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
          initialValues={{ store: "" }}
          onSubmit={(values: any) => {
            const store = values.store.trim();
            if (!store) return;

            const loggedInUser = JSON.parse(
              localStorage.getItem("user") as string
            );
            const { uid } = loggedInUser;

            registerStore(uid, store)
              .then(() => {
                setStores([
                  ...user?.stores,
                  {
                    label: store,
                    value: transformDomain(store),
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
                label="Add a Store"
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

        <RegisteredDomains>My Existing Stores</RegisteredDomains>
        {stores?.map((store: any) => (
          <Row key={store.label} gap="90px">
            <p>{store.label}</p>
            <p>{store.accessToken}</p>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default StoreSelector;
