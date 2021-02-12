import React from "react";

import "./UserTable.scss";
import { IUser } from "../../models/IUser";

interface IUserTable {
  users: Array<IUser>;
}
const UserTable = ({ users }: IUserTable) => {
  //console.log(users);
  return (
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Email</td>
          <td>UserName</td>
        </tr>
      </thead>
      <tbody>
        {users.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.email}</td>
            <td>{row.displayName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
