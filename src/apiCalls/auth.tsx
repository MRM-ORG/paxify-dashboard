import axios from "axios";
import { BACKEND_URL } from "../constants";

export async function registerUser(uid: string): Promise<any> {
  const API = `${BACKEND_URL}/auth/register/${uid}`;

  return axios
    .post(API)
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

export async function registerStore(uid: string, domain: string): Promise<any> {
  const API = `${BACKEND_URL}/auth/registerStore/${uid}`;

  return axios
    .post(API, { domain })
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
