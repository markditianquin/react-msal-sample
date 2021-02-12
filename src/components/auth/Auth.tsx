import React, { useState, useEffect } from "react";
import {
  MsalProvider,
  MsalAuthenticationTemplate,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useAccount,
} from "@azure/msal-react";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";
import { PageLayout } from "./ui";
import { ProfileData, callMsGraph } from "./graph";

import { ErrorBoundary } from "./ErrorBoundary";

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    if (account) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: account,
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
    }
  }

  return (
    <>
      <h5 className="card-title">
        Welcome {account ? account.name : "unknown"}
      </h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <button onClick={RequestProfileData}>
          Request Profile Information
        </button>
      )}
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

const MainContent = (props: any) => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    const callLoginAcuireTokenRedirect = async () => {
      //await instance.acquireTokenRedirect({ ...loginRequest });
    };

    callLoginAcuireTokenRedirect();
  }, []);

  return (
    <div className="App">
      {/* <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate> */}
      {/* <ErrorBoundary>
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Redirect}
          loadingComponent={InProgressComponent}
          errorComponent={ErrorComponent}
        >
          {props.children}
        </MsalAuthenticationTemplate>
      </ErrorBoundary> */}

      {/* <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate> */}
      {props.children}
    </div>
  );
};

export default function Auth(props: any) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <MainContent>{props.children}</MainContent>
      </PageLayout>
    </MsalProvider>
  );
}
