import axios from "axios";
import { BACKEND_URL } from "../constants";

export async function getStoreEvents(
  uid: string,
  domain: string
): Promise<any> {
  const API = `${BACKEND_URL}/firebase/tracking/${uid}/${domain}`;

  return axios
    .get(API)
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

export async function getCustomerSubscriptions(cid: string): Promise<any> {
  const API = `${BACKEND_URL}/stripe/subscriptions/${cid}`;

  return axios
    .get(API)
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
