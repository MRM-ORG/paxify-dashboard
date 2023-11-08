import * as Yup from "yup";

export const SignUpForm = {
  formId: "SignUpForm",
  formField: {
    email: {
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      requiredErrorMsg: "Email is required",
    },
    password: {
      name: "password",
      label: "Password",
      placeholder: "Enter Password",
      requiredErrorMsg: "Password is required",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      requiredErrorMsg: "Password is required",
    },
  },
};

const {
  formField: { email, password, confirmPassword },
} = SignUpForm;

export const SignUpValidationSchema = Yup.object({
  email: Yup.string().required(email.requiredErrorMsg),
  password: Yup.string().required(password.requiredErrorMsg),
  confirmPassword: Yup.string().required(confirmPassword.requiredErrorMsg),
});
