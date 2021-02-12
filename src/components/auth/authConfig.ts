import { Configuration, PopupRequest } from "@azure/msal-browser";
import constant from "../../constant";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "74cf5b4a-b0d3-411f-9751-ea1ec2f1d0a0",
    authority: constant.authorities.signUpSignInFlow,
    knownAuthorities: [constant.knownAuthorities],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["https://threetierapp.onmicrosoft.com/api/read.access"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const tokenRequest = {
  scopes: constant.apiConfig.b2cScopes,
};
