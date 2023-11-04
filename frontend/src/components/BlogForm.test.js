import React from "react";
import BlogForm from "./BlogForm";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<BlogForm/>", () => {
  test("on form submit the blog with right details is created", async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn();
    const { container } = render(<BlogForm handleCreateBlog={createBlog} />);

    const createButton = screen.getByText("create");

    const titleInput = container.querySelector("#title");
    const authorInput = container.querySelector("#author");
    const urlInput = container.querySelector("#url");

    await user.type(titleInput, "New blog for testing");
    await user.type(authorInput, "Andrii");
    await user.type(urlInput, "http://someurl.ur");

    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "New blog for testing",
      author: "Andrii",
      url: "http://someurl.ur",
    });
  });
});
