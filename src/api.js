import axios from "axios";

axios.defaults.baseURL = "https://slackapi.avionschool.com/api/v1/";

//axios.create

export const userSessionAPI = (data) => {
  return axios({
    method: "post",
    url: data.url,
    data: {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    },
  });
};

export const getListsAPI = (data) => {
  return axios({
    method: "GET",
    url: data.url,
    headers: {
      "access-token": data["access-token"],
      client: data.client,
      expiry: data.expiry,
      uid: data.uid,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const getMessagesAPI = (data) => {
  return axios({
    method: "GET",
    url: `messages?receiver_id=${data.user_id}&receiver_class=${data.receiver_class}`,
    params: {
      receiver_id: data.user_id,
      receiver_class: data.receiver_class,
    },
    headers: {
      "access-token": data["access-token"],
      client: data.client,
      expiry: data.expiry,
      uid: data.uid,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const createChannelAPI = (data) => {
  return axios({
    method: "POST",
    url: "channels",
    data: {
      name: data.name,
      user_ids: data.user_ids,
    },
    headers: {
      "access-token": data["access-token"],
      client: data.client,
      expiry: data.expiry,
      uid: data.uid,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const sendMessageAPI = (data) => {
  return axios({
    method: "POST",
    url: data.url,
    data: {
      receiver_id: data.receiver_id,
      receiver_class: data.receiver_class,
      body: data.message,
    },
    headers: {
      "access-token": data["access-token"],
      client: data.client,
      expiry: data.expiry,
      uid: data.uid,
    },
  });
};

export const addUserChannelAPI = (data) => {
  return axios({
    method: "POST",
    url: "channel/add_member",
    data: {
      id: data.channel_id,
      member_id: data.member_id,
    },
    headers: {
      "access-token": data["access-token"],
      client: data.client,
      expiry: data.expiry,
      uid: data.uid,
    },
  });
};
