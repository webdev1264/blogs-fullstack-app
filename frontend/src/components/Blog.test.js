import React from "react";
import Blog from "./Blog";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let container;
let addLike;

describe("<Blog />", () => {
  beforeEach(() => {
    const blog = {
      title: "Blog for testing",
      url: "https://unknown.un",
      likes: 10,
      user: {
        id: "1234567890",
        name: "Andrii",
        userName: "andrik1264",
      },
    };
    addLike = jest.fn();
    container = render(<Blog blog={blog} handleAddLike={addLike} />).container;
  });
  test("only blog's title displayed by default", () => {
    screen.getByText("Blog for testing");

    const title = container.querySelector(".title");
    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");
    const userName = container.querySelector(".user-name");

    expect(title).toBeNull();
    expect(url).toBeNull();
    expect(likes).toBeNull();
    expect(userName).toBeNull();
  });

  test("blog's url and likes are shown if show button is clicked", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("view");

    await user.click(button);

    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");
    const userName = container.querySelector(".user-name");

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(userName).toBeDefined();
  });

  test("if liked button clicked twice, event handler function is called twice", async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(addLike.mock.calls).toHaveLength(2);
  });
});
