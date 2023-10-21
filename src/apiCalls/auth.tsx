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
  console.log({domain})
  let name;
  const parts = domain.split(".");
  if (parts.length >= 2) {
    name = parts[1];
    console.log(name); // This will log "devcastles"
  } else {
    console.log("Invalid URL");
  }

  return axios
    .post(API, {name, domain })
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
