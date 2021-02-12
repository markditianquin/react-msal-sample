const constant = {
  baseURL: "http://localhost:5000/api/",
  azureBackend: "https://corebackend.azurewebsites.net/api/",
  names: {
    signUpSignIn: "B2C_1_signupsignin",
  },
  authorities: {
    signUpSignInFlow:
      "https://threetierapp.b2clogin.com/tfp/threetierapp.onmicrosoft.com/B2C_1_signupsignin",
  },
  knownAuthorities: "threetierapp.b2clogin.com",
  apiConfig: {
    b2cScopes: ["https://threetierapp.onmicrosoft.com/api/read.access"],
    webApi: "https://corebackend.azurewebsites.net/api",
  },
};

export default constant;
