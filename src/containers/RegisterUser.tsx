import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useMsal } from "@azure/msal-react";

import * as actions from "../store/actions/user";
import { loginRequest, tokenRequest } from "../components/auth/authConfig";

const RegisterUser = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  const [registerState, setRegisterState] = useState({
    displayName: "",
    email: "",
  });

  const dispatch = useDispatch();

  const setValue = (name: string, event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setRegisterState((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const register = async () => {
    if (account && inProgress == "none") {
      try {
        const token = await instance.acquireTokenSilent({
          ...loginRequest,
          account: account,
        });
  
        if (!token.accessToken) {
          await instance.acquireTokenRedirect(loginRequest);
          console.log("Rederecting to get the access token");
          await register();
        }
        await dispatch(actions.registerUser(registerState, token.accessToken));
        await dispatch(actions.getAllUsers(token.accessToken));

      } catch (e) {
        console.log("something went wrong");
      }
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await register();

    setRegisterState({ displayName: "", email: "" });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Display Name: </label>
        <input
          type="text"
          placeholder="Display Name"
          onChange={setValue.bind(null, "displayName")}
          value={registerState.displayName}
          required
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Email"
          onChange={setValue.bind(null, "email")}
          value={registerState.email}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterUser;
