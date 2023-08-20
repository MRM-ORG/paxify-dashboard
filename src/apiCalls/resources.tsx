import axios from "axios";
import { BACKEND_URL } from "../constants";

export async function fetchDomainResourcesForMonth(
  domain: string
): Promise<any> {
  const API = `${BACKEND_URL}/firebase/resources/${domain}`;

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
