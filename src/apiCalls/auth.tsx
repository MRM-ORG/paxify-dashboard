import axios from "axios";
import { BACKEND_URL } from "../constants";

export async function registerUser(uid: string, payload: any): Promise<any> {
  const API = `${BACKEND_URL}/auth/register/${uid}`;

  return axios
    .post(API, payload)
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

export async function registerStore(uid: string, domain: any): Promise<any> {
  const API = `${BACKEND_URL}/auth/registerStore/${uid}`;

  return axios
    .post(API, { name: domain.name, domain: domain.store })
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

export async function fetchSummarizedEvents(
  uid: string,
  storeId: string
): Promise<any> {
  const API = `${BACKEND_URL}/firebase/eventSummaries/${uid}/${storeId}`;

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

export async function getUserSubscriptionStatus(uid: string): Promise<any> {
  const API = `${BACKEND_URL}/auth/plan/${uid}`;

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

export async function getUserProfile(uid: string): Promise<any> {
  const API = `${BACKEND_URL}/firebase/profile/${uid}`;

  return axios
    .get(API)
    .then((response) => {
      return response.data;
    })
    .then((responseJson) => {
      return Promise.resolve(responseJson.data);
    })
    .catch((error) => {
      const result = error.result;
      return Promise.reject(result);
    });
}

export async function updateUserProfile(profile: any): Promise<any> {
  const API = `${BACKEND_URL}/firebase/profile`;

  return axios
    .post(API, profile)
    .then((response) => {
      return response.data;
    })
    .then((responseJson) => {
      return Promise.resolve(responseJson.data);
    })
    .catch((error) => {
      const result = error.result;
      return Promise.reject(result);
    });
}

export async function deleteStore(uid: string, storeId: string): Promise<any> {
  const API = `${BACKEND_URL}/firebase/delete-store/${uid}/${storeId}`;

  return axios
    .delete(API)
    .then((response) => {
      return response.data;
    })
    .then((responseJson) => {
      return Promise.resolve(responseJson.data);
    })
    .catch((error) => {
      const result = error.result;
      return Promise.reject(result);
    });
}

export async function uploadStoryContent(file: File): Promise<any> {
  const API = `${BACKEND_URL}/firebase/upload-content`;

  const fileData = new FormData();
  fileData.append("file", file);

  try {
    const response = await axios.post(API, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return Promise.resolve(response.data);
  } catch (error: any) {
    const result = error.response ? error.response.data : error;
    return Promise.reject(result);
  }
}
