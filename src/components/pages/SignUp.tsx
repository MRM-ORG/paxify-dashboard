import { registerUser } from "@/apiCalls/auth";
import { webAuth } from "@/firebase/firebase";
import { Column, Row } from "@/styles/common";
import { navigateNewPage } from "@/utils/navigate";
import { isMobileDevice } from "@/utils/responsive";
import { HOME_PAGE, USER_LOGIN } from "@/utils/routes";
import { GenericText, H2 } from "@/utils/text";
import { THEME } from "@/utils/theme";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import Spacer from "../atoms/Spacer";
import HyperlinkButton from "../atoms/buttons/HyperlinkButton";
import PrimaryButton from "../atoms/buttons/PrimaryButton";
import FormikLabelledTextInput from "../molecules/inputs/formik/FormikLabelledTextInput";
import {
  SignUpForm,
  SignUpValidationSchema,
} from "../schemas/SignUpValidationSchema";
import { LogoContainer } from "./Login";
import { sendFirebaseVerificationEmail } from "@/utils/auth";

const Container = styled(Row)`
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
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
    padding: 12px 32px 12px;
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

const SignUpContainer = styled(Column)`
  gap: 32px;
  width: 400px;

  @media (max-width: 768px) {
    padding: 0 24px;
    width: 100%;
  }
`;

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async (values: any) => {
    setIsLoading(true);
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    createUserWithEmailAndPassword(webAuth, values.email, values.password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        const uid = user.uid;
        const payload = {
          name: values.name.trim(),
          email: values.email.trim(),
        };

        registerUser(uid, payload).then(() => {
          sendFirebaseVerificationEmail();
          localStorage.setItem("user", JSON.stringify(user));
          alert(
            "We have sent you a verification email. Please verify your email to continue."
          );
          navigateNewPage(USER_LOGIN());
        });
      })
      .catch((error: any) => {
        console.error(error);
        alert(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Head>
        <title>Paxify | Sign Up</title>
        <meta name="description" content="Paxify dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <LeftPane>
          <LogoContainer>
            <Image
              src="/logo/reelife.png"
              alt="Paxify Logo"
              width={125}
              height={45}
            />
            By Paxify
          </LogoContainer>
          {!isMobileDevice() && (
            <Label>
              <GenericText color={THEME.white} fontSize="36px" fontWeight="500">
                Multipurpose tool to succeed your business
              </GenericText>
            </Label>
          )}
        </LeftPane>
        <RightPane>
          <SignUpContainer>
            <H2 color={THEME.primary}>Sign Up</H2>
            <Formik
              onSubmit={onSignUp}
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignUpValidationSchema}>
              <Form>
                <FormikLabelledTextInput
                  type="text"
                  label={SignUpForm.formField.name.label}
                  name={SignUpForm.formField.name.name}
                  placeholder={SignUpForm.formField.name.placeholder}
                />
                <Spacer height={16} />
                <FormikLabelledTextInput
                  type="text"
                  label={SignUpForm.formField.email.label}
                  name={SignUpForm.formField.email.name}
                  placeholder={SignUpForm.formField.email.placeholder}
                />
                <Spacer height={16} />
                <FormikLabelledTextInput
                  type="password"
                  label={SignUpForm.formField.password.label}
                  name={SignUpForm.formField.password.name}
                  placeholder={SignUpForm.formField.password.placeholder}
                />
                <Spacer height={16} />
                <FormikLabelledTextInput
                  type="password"
                  label={SignUpForm.formField.confirmPassword.label}
                  name={SignUpForm.formField.confirmPassword.name}
                  placeholder={SignUpForm.formField.confirmPassword.placeholder}
                />
                <Spacer height={25} />
                <Row gap="2px">
                  <div>Already have an account?</div>
                  <HyperlinkButton
                    onClick={() => navigateNewPage(USER_LOGIN())}>
                    Sign In
                  </HyperlinkButton>
                </Row>
                <Spacer height={20} />
                <PrimaryButton
                  isDisabled={isLoading}
                  onClick={() => {}}
                  type="submit"
                  action="login"
                  background={THEME.buttonPrimary}>
                  Sign Up
                </PrimaryButton>
              </Form>
            </Formik>
          </SignUpContainer>
        </RightPane>
      </Container>
    </>
  );
};

export default SignUp;
