import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewBlogForm } from "../components/NewBlogForm";
import { beforeEach } from "vitest";

describe("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const blog = {
    title: "Titulo de ejemplo",
    author: "Autor de ejemplo",
    url: "ejemplo.com",
    likes: 0, //porque es un nuevo objeto
  };

  let createNewBlog;

  beforeEach(() => {
    createNewBlog = vi.fn();
    render(<NewBlogForm createNewBlog={createNewBlog} />);
  });

  test("The form calls the handlerEvent correctly", async () => {
    let input;

    input = screen.getByLabelText("title", { exact: false });
    await userEvent.type(input, blog.title);

    input = screen.getByLabelText("author", { exact: false });
    await userEvent.type(input, blog.author);

    input = screen.getByLabelText("url", { exact: false });
    await userEvent.type(input, blog.url);

    const sendButton = screen.getByText("Create"); //getByText no tiene el atributo exact
    await userEvent.click(sendButton);

    expect(createNewBlog.mock.calls).toHaveLength(1);
    expect(createNewBlog.mock.calls[0][0]).toEqual(blog);
  });
});
