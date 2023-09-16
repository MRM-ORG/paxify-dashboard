import axios from "axios";
import { BACKEND_URL } from "../constants";

export async function registerUser(
  name: string,
  email: string,
  uid: string
): Promise<any> {
  const API = `${BACKEND_URL}/auth/register/${uid}`;

  return axios
    .post(API, { name, email })
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

export async function registerStore(
  uid: string,
  name: string,
  domain: string
): Promise<any> {
  const API = `${BACKEND_URL}/auth/registerStore/${uid}`;

  return axios
    .post(API, { name, domain })
    .then((response) => {
      return response.data;
    })
    .then((responseJson) => {
      return Promise.resolve(responseJson);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export async function fetchUserStores(uid: string): Promise<any> {
  const API = `${BACKEND_URL}/auth/stores/${uid}`;

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

export async function getStoreVerificationStatus(
  uid: string,
  storeId: string
): Promise<any> {
  const API = `${BACKEND_URL}/auth/store/${uid}/${storeId}`;

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
