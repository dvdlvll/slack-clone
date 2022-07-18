import axios from "axios";
import { BASE_URL } from "./api-urls";

export const getCall = async (
  endpoint,
  dataObj,
  headerObj,
  onSuccess,
  onError
) => {
  return axios
    .get(`${BASE_URL}${endpoint}`, dataObj, {
      headers: headerObj,
    })
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
  return axios
    .post(`${BASE_URL}${endpoint}`, dataObj, {
      headers: headerObj,
    })
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};
