import { encrypt, decrypt } from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";

const SESSION_ACCESS_TOKEN = "accessToken";
const SESSION_ACCOUNTS = "accounts";
const SECRET_KEY = "secretKey";

export const getAccessToken = () => {
  return sessionStorage.getItem(SESSION_ACCESS_TOKEN) || "";
};

export const getAccountInfo = () => {
  const data = sessionStorage.getItem(SESSION_ACCOUNTS);

  if (data) {
    try {
      return JSON.parse(decrypt(data, SECRET_KEY).toString(utf8));
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  return {};
};

export const saveAccessToken = (token) => {
  sessionStorage.setItem(SESSION_ACCESS_TOKEN, token || "");
};

export const saveAccountInfo = (account) => {
  sessionStorage.setItem(SESSION_ACCOUNTS, encrypt(JSON.stringify(account), SECRET_KEY).toString());
};

export const createParametersRequest = (values) => {
  const parameters = {
    body: JSON.stringify(values),
  };
  return parameters;
};
