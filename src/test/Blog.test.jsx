import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

describe("Blog", () => {
  const blog = {
    id: "1",
    title: "Titulo de ejemplo",
    author: "Autor de ejemplo",
    url: "ejemplo.com",
    likes: 3,
  };
  let container;
  let mockUpdateBlog;

  beforeEach(() => {
    mockUpdateBlog = vi.fn();
    container = render(
      <Blog
        blog={blog}
        deleteBlog={null}
        ownedByUser={false}
        updateBlog={mockUpdateBlog}
      ></Blog>,
    ).container;
  });

  test("initially title is rendered", () => {
    expect(container).toHaveTextContent("Titulo de ejemplo");
  });

  test("initially author is rendered", () => {
    expect(container).toHaveTextContent("Autor de ejemplo");
  });

  test("initially url is not rendered", () => {
    expect(container).not.toHaveTextContent("ejemplo.com");
  });

  test("initially likes not defined", () => {
    expect(container).not.toHaveTextContent("3");
  });

  test("blog's url and number of likes are shown when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Details", { exact: false }); //exact:false es que no necesitamos coincidencia exacta del texto
    await user.click(button);

    expect(container).toHaveTextContent("ejemplo.com");
    expect(container).toHaveTextContent("3");
  });

  test("when the like button is clicked twice, the event handler is called twice", async () => {
    const detailsButton = await screen.findByText("Details");
    await userEvent.click(detailsButton);

    const likeButton = await screen.findByText("Like");

    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
  });
});
