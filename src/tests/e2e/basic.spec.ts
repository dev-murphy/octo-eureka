import { test, expect } from "@playwright/test";

test.describe("Basic Functions", () => {
  test("can add todo", async ({ page }) => {
    await page.goto("http://octo-eureka.netlify.app/");

    await expect(page).toHaveTitle(/Octo Eureka/);

    await expect(page.getByTestId("add-todo-btn")).toBeDisabled();

    await page.getByTestId("todo-title-input").fill("This is a simple todo");
    await page.getByTestId("add-todo-btn").click();

    await expect(page.getByTestId("todo-item-0")).toBeVisible();
    await expect(page.getByTestId("todo-item-0")).toHaveText(
      "This is a simple todo"
    );
  });
});
