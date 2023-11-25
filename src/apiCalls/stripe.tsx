import axios from "axios";
import { BACKEND_URL } from "../constants";

interface ICreatePaymentSession {
  lookupKey: string;
  userId: string;
  intendedPlan: string;
}

export async function createPaymentSession(
  payload: ICreatePaymentSession
): Promise<any> {
  const API = `${BACKEND_URL}/stripe/create-checkout-session`;

  return axios
    .post(API, payload)
    .then((response) => {
      return response.data;
    })
    .then((responseJson) => {
      return Promise.resolve(responseJson);
    })
    .catch((error) => {
      console.error("ERR:", error);
      const result = error.result;
      return Promise.reject(result);
    });
}

export async function cancelSubscription(subscriptionId: string): Promise<any> {
  const API = `${BACKEND_URL}/stripe/cancel-subscription/`;

  return axios
    .post(API, { subscriptionId })
    .then((response) => {
      return response.data;
    })
    .then((responseJson) => {
      return Promise.resolve(responseJson);
    })
    .catch((error) => {
      const result = error.result;
      return Promise.reject(result);
    });
}
