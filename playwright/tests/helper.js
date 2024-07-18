const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createNewBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "Create Blog" }).click();
  await page.getByLabel("title:").click();
  await page.getByLabel("title:").fill(title);
  await page.getByLabel("author:").click();
  await page.getByLabel("author:").fill(author);
  await page.getByLabel("url:").click();
  await page.getByLabel("url:").fill(url);
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByText(title);
};

const likeBlog = async (blog, likes) => {
  for (let i = 0; i < likes; i++) {
    await blog.click();
  }
};

export { loginWith, createNewBlog, likeBlog };
