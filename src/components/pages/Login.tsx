import { Column, Row } from "@/styles/common";
import { navigateNewPage } from "@/utils/navigate";
import { isMobileDevice } from "@/utils/responsive";
import { HOME_PAGE, USER_REGISTER } from "@/utils/routes";
import { GenericText, H2 } from "@/utils/text";
import { THEME } from "@/utils/theme";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form, Formik } from "formik";
import Head from "next/head";
import styled from "styled-components";
import Spacer from "../atoms/Spacer";
import HyperlinkButton from "../atoms/buttons/HyperlinkButton";
import PrimaryButton from "../atoms/buttons/PrimaryButton";
import FormikLabelledTextInput from "../molecules/inputs/formik/FormikLabelledTextInput";

import { webAuth } from "@/firebase/firebase";
import {
  LoginForm,
  LoginValidationSchema,
} from "../schemas/LoginValidationSchema";
import { use, useEffect, useState } from "react";
import Logo from "../atoms/icons/logo";
import { signInUser } from "@/utils/auth";

const Container = styled(Row)`
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const Pane = styled(Column)`
  height: 100vh;
`;

const LeftPane = styled(Pane)`
  width: 34.5%;
  min-width: 350px;
  padding: 48px 64px 64px;
  justify-content: space-between;
  background-color: ${THEME.background1};

  @media (max-width: 768px) {
    width: 100%;
    height: fit-content;
    padding: 8px 32px;
  }
`;

const RightPane = styled(Pane)`
  min-width: 65.5%;
  align-items: center;
  justify-content: center;
  background-color: ${THEME.background0};

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex: 2;
  }
`;

const Label = styled.div`
  max-width: 320px;
`;

const SignInContainer = styled(Column)`
  gap: 32px;
  width: 400px;

  @media (max-width: 768px) {
    padding: 0 24px;
    width: 100%;
  }
`;

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigateNewPage(HOME_PAGE());
    }
  }, []);

  const onLogin = async (values: any) => {
    setIsLoading(true);
    await signInUser(values.email, values.password);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Paxify | Login</title>
        <meta name="description" content="Paxify dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <LeftPane>
          <Logo fill="white" width="150px" />
          {!isMobileDevice() && (
            <Label>
              <GenericText color={THEME.white} fontSize="36px" fontWeight="500">
                Multipurpose tool to succeed your business
              </GenericText>
            </Label>
          )}
        </LeftPane>
        <RightPane>
          <SignInContainer>
            <H2 color={THEME.primary}>Sign In</H2>
            <Formik
              onSubmit={onLogin}
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginValidationSchema}>
              <Form>
                <FormikLabelledTextInput
                  type="text"
                  label={LoginForm.formField.email.label}
                  name={LoginForm.formField.email.name}
                  placeholder={LoginForm.formField.email.placeholder}
                />
                <Spacer height={16} />
                <FormikLabelledTextInput
                  type="password"
                  label={LoginForm.formField.password.label}
                  name={LoginForm.formField.password.name}
                  placeholder={LoginForm.formField.password.placeholder}
                />
                <Spacer height={25} />
                <Column gap="15px">
                  <HyperlinkButton onClick={() => alert("TODO")}>
                    Forget Password?
                  </HyperlinkButton>
                  <Row gap="2px">
                    <div>Don&apos;t have an account?</div>
                    <HyperlinkButton
                      onClick={() => navigateNewPage(USER_REGISTER())}>
                      Create One!
                    </HyperlinkButton>
                  </Row>
                </Column>
                <Spacer height={20} />
                <PrimaryButton
                  isDisabled={isLoading}
                  onClick={() => {}}
                  type="submit"
                  action="login"
                  background={THEME.buttonPrimary}>
                  Sign In
                </PrimaryButton>
              </Form>
            </Formik>
          </SignInContainer>
        </RightPane>
      </Container>
    </>
  );
};

export default Login;
