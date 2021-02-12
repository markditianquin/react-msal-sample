import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useMsal } from "@azure/msal-react";

import UserTable from "../components/user/UserTable";
import RegisterUser from "../containers/RegisterUser";
import { RootState } from "../store/reducers/user";
import * as actions from "../store/actions/user";
import { loginRequest } from "../components/auth/authConfig";
import { AccountInfo } from "@azure/msal-browser";
import { BlobView } from "./BlobAccess";

function UserList() {
  const [isBlobs, setIsBlobs] = useState(false);

  const myUsers = useSelector(
    (state: { users: RootState }) => state.users.users
  );

  const dispacth = useDispatch();

  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    const getallUsers = async () => {
      try {
        if (inProgress === "none" && accounts.length > 0) {
          //await instance.acquireTokenRedirect({ ...loginRequest });
          //await instance.loginPopup({ ...loginRequest });
          const token = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0] as AccountInfo,
          });

          //console.log(!token.accessToken);
          if (!token.accessToken) {
            instance.acquireTokenRedirect({ ...loginRequest });
          }

          //console.log("AccessToken is: " + token.accessToken);
          await dispacth(actions.getAllUsers(token.accessToken));
        }
      } catch (e) {
        console.log(e);
      }
    };
    //console.log("account is: " + accounts.length);
    //console.log("inProgress is: " + inProgress);
    getallUsers();
  }, [dispacth, accounts, inProgress, instance]);

  return (
    <div>
      <RegisterUser />
      <UserTable users={myUsers} />

      <button
        onClick={() => {
          setIsBlobs((state) => {
            return !state;
          });
        }}
      >
        GetBlobs
      </button>
      {isBlobs ? (
        <>
          <BlobView />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserList;
