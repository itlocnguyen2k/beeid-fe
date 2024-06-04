import { createContext, useContext } from "react";
import { from, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { mergeMap, switchMap } from "rxjs/operators";
import { getAccessToken } from "../utils/sessionStorageHelper";
import { history } from "../history";
import { t } from "i18next";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const project = (response) => {
  if (response.status === 401) {
    sessionStorage.clear();
    history.push("/login");
    return throwError(() => new Error(t("message.server_error")));
  }

  if (response.status === 403) {
    history.push("/forbidden");
    return throwError(() => new Error(t("message.server_error")));
  }

  if (response.status !== 200 && response.status !== 400) {
    history.push("/errors");
    return throwError(() => new Error(t("message.server_error")));
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && (contentType.includes("octet-stream") || contentType.includes("application/csv"))) {
    return from(response.blob());
  }

  return from(response.json());
};

export const HttpContext = createContext({
  get: (input, init) => {
    const headers = new Headers(init?.headers);
    const token = getAccessToken();
    if (token && !headers.has("Authorization")) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    return fromFetch(`${input.startsWith("http") ? "" : API_BASE_URL}${input}`, {
      method: "GET",
      headers: headers,
      body: init?.body,
    }).pipe(switchMap(project));
  },
  put: (input, init) => {
    const headers = new Headers(init?.headers);
    const token = getAccessToken();
    if (token && !headers.has("Authorization")) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    if (!headers.has("Content-Type") && !(init?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    return fromFetch(`${input.startsWith("http") ? "" : API_BASE_URL}${input}`, {
      method: "PUT",
      headers: headers,
      body: init?.body,
    }).pipe(mergeMap(project));
  },
  post: (input, init) => {
    const headers = new Headers(init?.headers);
    const token = getAccessToken();
    if (token && !headers.has("Authorization")) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    if (!headers.has("Content-Type") && !(init?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    return fromFetch(`${input.startsWith("http") ? "" : API_BASE_URL}${input}`, {
      method: "POST",
      headers: headers,
      body: init?.body,
    }).pipe(mergeMap(project));
  },
  delete: (input, init) => {
    const headers = new Headers(init?.headers);
    const token = getAccessToken();
    if (token && !headers.has("Authorization")) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    if (!headers.has("Content-Type") && !(init?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    return fromFetch(`${input.startsWith("http") ? "" : API_BASE_URL}${input}`, {
      method: "DELETE",
      headers: headers,
      body: init?.body,
    }).pipe(mergeMap(project));
  },
});

export const useHttp = () => useContext(HttpContext);
