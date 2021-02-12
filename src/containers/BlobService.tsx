import {
  ChainedTokenCredential,
  InteractiveBrowserCredential,
  TokenCredential,
  AuthorizationCodeCredential,
  AccessToken,
  GetTokenOptions,
} from "@azure/identity";
import {
  BlobServiceClient,
  BlobItem,
  BlobDownloadResponseParsed,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

class a implements TokenCredential {
  getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return new Promise<AccessToken | null>(() => {});
  }
}

const signInOptions = {
  // the client id is the application id, from your earlier app registration
  clientId: "132ba004-94cd-4420-80d6-f0001965ca28",
  // this is your tenant id - the id of your azure ad tenant. available from your app registration overview
  tenantId: "d5dd256b-71b6-4fbf-98ce-40ba1f822737",
};

const SignIn = new InteractiveBrowserCredential(signInOptions);

const accountKey = process.env.ACCOUNT_KEY || "";

const accountName = "clientbackendstorage";
//const SignIn = new StorageSharedKeyCredential(accountName, accountKey);

export const blobStorageClient = new BlobServiceClient(
  // this is the blob endpoint of your storage acccount. Available from the portal
  // they follow this format: <accountname>.blob.core.windows.net for Azure global
  // the endpoints may be slightly different from national clouds like US Gov or Azure China
  `https://${accountName}.blob.core.windows.net/`,
  SignIn
);
