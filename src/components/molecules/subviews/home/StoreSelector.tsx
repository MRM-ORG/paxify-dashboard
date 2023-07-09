import { Column, Row } from "@/styles/common";
import { Form, Formik } from "formik";
import { useState } from "react";
import FormikLabelledTextInput from "../../inputs/formik/FormikLabelledTextInput";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { THEME } from "@/utils/theme";
import { styled } from "styled-components";
import { transformDomain } from "@/utils/helpers";

interface IStoreSelectorProps {
  user: {
    stores: any[];
    setStores: (stores: string[]) => void;
  };
}

const NewStore = styled(Row)`
  gap: 25px;
  max-width: 500px;
  flex-wrap: nowrap;
  align-items: flex-end;
`;

const RegisteredDomains = styled.div`
  margin-top: 20px;
  font-weight: 600;
`;

const StoreSelector: React.FC<IStoreSelectorProps> = ({ user }) => {
  return (
    <Column gap="10px">
      <h1>My Stores</h1>
      <p>
        Here are all the stores under your ownership. You can also add or remove
        stores, if that is covered under the subscription.
      </p>
      <Formik
        initialValues={{ store: "" }}
        onSubmit={(values: any) => {
          user.setStores([
            ...user.stores,
            {
              label: values.store,
              value: transformDomain(values.store),
            },
          ]);
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
      {user.stores?.map((store) => (
        <p key={store.value}>{store.label}</p>
      ))}
    </Column>
  );
};

export default StoreSelector;
