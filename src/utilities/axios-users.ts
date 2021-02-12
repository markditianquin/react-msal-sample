import axios from "axios";

import constant from "../constant";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? constant.baseURL
      : constant.azureBackend,
});

export default instance;
