import * as Yup from "yup";

export const StoreRegisterForm = {
  formId: "StoreRegisterForm",
  formField: {
    store: {
      name: "storeName",
      label: "Store Name",
      placeholder: "Name to identify store",
      requiredErrorMsg: "Name is required",
    },
    domain: {
      name: "storeDomain",
      label: "Store Domain",
      placeholder: "https://www.example.com",
      requiredErrorMsg: "Domain is required",
    },
  },
};

const {
  formField: { store, domain },
} = StoreRegisterForm;

export const StoreRegisterSchema = Yup.object({
  storeName: Yup.string().required(store.requiredErrorMsg),
  storeDomain: Yup.string().required(domain.requiredErrorMsg),
});
