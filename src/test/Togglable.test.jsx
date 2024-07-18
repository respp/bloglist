import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "../components/Togglable";

describe("<Togglable />", () => {
  let container;
  let mockHandler = vi.fn();

  beforeEach(() => {
    container = render(
      <Togglable firstButtonLabel="Details" secondButtonLabel="Hide">
        <div className="blog-details">Url:</div>
      </Togglable>,
    ).container;
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("renders its children", async () => {
    await screen.findAllByText("Url:");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Details");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
    screen.debug();
  });
});
