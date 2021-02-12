import React, { useCallback, useEffect } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useAccount,
  MsalAuthenticationTemplate,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { ErrorBoundary } from "./ErrorBoundary";
import { InteractionType } from "@azure/msal-browser";

const SignInSignOutButton = () => {
  const { instance, accounts } = useMsal();

  const account = useAccount(accounts[0] || {});

  return (
    <>
      <AuthenticatedTemplate>
        <h5 className="card-title">
          Welcome {account ? account.name : "unknown"}
        </h5>
        <button onClick={() => instance.logout()} className="ml-auto">
          Sign Out
        </button>
      </AuthenticatedTemplate>
      {/* <UnauthenticatedTemplate>
        <button onClick={() => instance.loginPopup(loginRequest)}>
          Sign in using Popup
        </button>
        <button onClick={() => instance.loginRedirect(loginRequest)}>
          Sign in using Redirect
        </button>
      </UnauthenticatedTemplate> */}
    </>
  );
};

const InProgressComponent = ({ inProgress }: any) => {
  return <h5>{inProgress} In Progress</h5>;
};

const ErrorComponent = ({ error }: any) => {
  return (
    <h5>
      This is a protected page and the following error occurred during
      authentication: <strong>{error.errorCode}</strong>
    </h5>
  );
};

export const PageLayout = (props: any) => {

  return (
    <>
      {/* <AuthenticatedTemplate>
        <div>
          <SignInSignOutButton />
        </div>
        {props.children}
      </AuthenticatedTemplate> */}
      <ErrorBoundary>
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Redirect}
          loadingComponent={InProgressComponent}
          errorComponent={ErrorComponent}
        >
          <div>
            <SignInSignOutButton />
          </div>
          {props.children}
        </MsalAuthenticationTemplate>
      </ErrorBoundary>
    </>
  );
};
