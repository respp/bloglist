const { test, expect, beforeEach, describe } = require("@playwright/test");
import { createNewBlog, likeBlog, loginWith } from "./helper";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Playwright :( :)",
        username: "play",
        password: "test",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("form")).toBeVisible();
  });

  describe("Login correctly", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "play", "test");

      await expect(page.getByTestId("logged")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("play");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Wrong Username or Password")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "play", "test");
    });

    test("a new blog can be created", async ({ page }) => {
      await createNewBlog(
        page,
        "blog creado en playwright",
        "codegen ;)",
        "codegen.com",
      );

      await expect(
        page.getByRole("heading", {
          name: 'a new blog "blog creado en playwright"',
        }),
      ).toBeVisible();
    });

    describe("when blog was created", () => {
      beforeEach(async ({ page }) => {
        await createNewBlog(
          page,
          "blog creado en playwright",
          "codegen ;)",
          "codegen.com",
        );
      });

      test("a blog can be viewed", async ({ page }) => {
        await page.getByRole("button", { name: "Details" }).click();
        await expect(
          page.getByText("Url: codegen.com Likes: 0Like"),
        ).toBeVisible();
      });

      test("a blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "Details" }).click();
        await page.getByRole("button", { name: "remove" }).click();
        page.on("dialog", async (dialog) => {
          console.log(dialog.message()); // Log the dialog message
          await dialog.accept(); // Accept the confirm dialog
        });
        await expect(
          page.getByRole("button", { name: "Details" }),
        ).not.toBeVisible();
      });

      test("blog sorted by likes", async ({ page }) => {
        await createNewBlog(page, "blog with 2 likes", "me", "blog1.com");
        await createNewBlog(page, "blog with 4 likes", "me", "blog4.com");
        await createNewBlog(page, "blog with 8 likes", "me", "blog8.com");

        await page
          .getByTestId("blogs")
          .locator("div")
          .filter({ hasText: '"blog with 2 likes" by' })
          .getByRole("button")
          .click();
        const blogWithTwoLikes = await page.getByRole("button", {
          name: "Like",
        });

        await likeBlog(blogWithTwoLikes, 2);

        await page
          .getByTestId("blogs")
          .locator("div")
          .filter({ hasText: '"blog with 4 likes" by' })
          .getByRole("button")
          .click();
        const blogWithFourLikes = await page
          .getByRole("button", { name: "Like" })
          .nth(1);

        await likeBlog(blogWithFourLikes, 4);

        await page
          .getByTestId("blogs")
          .locator("div")
          .filter({ hasText: '"blog with 8 likes" by' })
          .getByRole("button")
          .click();
        const blogWithEightLikes = await page
          .getByRole("button", { name: "Like" })
          .nth(2);

        await likeBlog(blogWithEightLikes, 8);

        await page.waitForTimeout(2000);

        await page.goto("http://localhost:5173/");

        await expect(
          page.getByTestId("blogs").locator("div").nth(0),
        ).toContainText(/"blog with 8 likes" by/);
        await expect(
          page.getByTestId("blogs").locator("div").nth(1),
        ).toContainText(/"blog with 4 likes" by/);
        await expect(
          page.getByTestId("blogs").locator("div").nth(2),
        ).toContainText(/"blog with 2 likes" by/);
      });
    });
  });
});
