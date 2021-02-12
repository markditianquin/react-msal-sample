import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import UserTable from "../UserTable";

let container: any = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container.remove();
  container = null;
});

it("do something", () => {
  act(() => {
    render(
      <UserTable
        users={[{ displayName: "some", email: "some@email.com", id: 1 }]}
      />,
      container
    );
  });

  expect(container.querySelector("table > thead > tr > td").textContent).toBe(
    "Id"
  );
});
