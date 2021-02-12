import React from "react";

import UserList from "./containers/UserList";

import Auth from "./components/auth/Auth";

function App() {
  return (
    <Auth>
      <UserList />
    </Auth>
  );
}

export default App;
