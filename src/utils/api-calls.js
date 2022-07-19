import axios from "axios";
import { BASE_URL } from "./api-urls";

const apiInstance = axios.create({ baseURL: BASE_URL });

export const getCall = async (
  endpoint,
  dataObj,
  headerObj,
  onSuccess,
  onError
) => {
  return apiInstance
    .get(
      endpoint,
      {
        headers: headerObj,
      },
      dataObj
    )
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};

export const postCall = async (
  endpoint,
  dataObj,
  headerObj,
  onSuccess,
  onError
) => {
  return apiInstance
    .post(endpoint, dataObj, {
      headers: headerObj,
    })
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};
