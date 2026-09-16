import decode from "jwt-decode";
import { Base64 } from "js-base64";
import { setAuthorization } from "./api";

export const encodeData = (payload) => {
  try {
    let dataString = Base64.btoa(encodeURI(JSON.stringify(payload)));
    return dataString;
  } catch (error) {
    return null;
  }
};

export const decodeData = (token) => {
  try {
    let payload = JSON.parse(decodeURI(Base64.atob(token)));
    return payload;
  } catch (error) {
    return null;
  }
};

export function login(token, appId = "") {
  localStorage.setItem("accessToken", token);
  setAuthorization();
  return true;
}

export function astroLogin(token, appId = "") {
  localStorage.setItem("astroToken", token);
  setAuthorization();
  return true;
}

// export function astroSignup(token, appId = "") {
//   localStorage.setItem("astro", token);
//   setAuthorization();
//   return true;
// }

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("astroToken");

  setAuthorization();
  // window.location.href = `${window.location.origin}/`;
  return true;
}

export function isAuth() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const astroToken = localStorage.getItem("astroToken");

    if (accessToken) {
      return accessToken;
    } else if (astroToken) {
      return astroToken;
    }

    return false;
  } catch (err) {
    return false;
  }
}
