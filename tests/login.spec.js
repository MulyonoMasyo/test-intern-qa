const { test, expect } = require("@playwright/test");

test.describe("Positive case", () => {
  test("User login menggunakan username yang valid", async ({ page }) => {
    await page.goto("https://studio.assemblrworld.com/explore");
    await page.getByText("Login / Register").click();
    await expect(page.getByText("Log into Assemblr")).toBeVisible();
    await page.getByLabel("Email or Username*").fill("testingintern1");
    await page.getByLabel("Password*").fill("123456");
    await page.getByText("Sign in", { exact: true }).click();
    await page.waitForTimeout(5000);
    await expect(
      page.getByRole("link", { name: "Your Projects" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Blr Coin 1,000" })
    ).toBeVisible();
  });
  test("User login menggunakan email yang valid", async ({ page }) => {
    await page.goto("https://studio.assemblrworld.com/explore");
    await page.getByText("Login / Register").click();
    await expect(page.getByText("Log into Assemblr")).toBeVisible();
    await page.getByLabel("Email or Username*").fill("testing@gmail.com");
    await page.getByLabel("Password*").fill("123456");
    await page.getByText("Sign in", { exact: true }).click();
    await page.waitForTimeout(5000);

    await expect(
      page.getByRole("link", { name: "Your Projects" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Blr Coin 1,000" })
    ).toBeVisible();
  });
});

test.describe("Negative case", () => {
  test("User login menggunakan username yang belum terdaftar", async ({
    page,
  }) => {
    await page.goto("https://studio.assemblrworld.com/explore");
    await page.getByText("Login / Register").click();
    await expect(page.getByText("Log into Assemblr")).toBeVisible();
    await page.getByLabel("Email or Username*").fill("hanya testing");
    await page.getByLabel("Password*").fill("123");
    await page.getByText("Sign in", { exact: true }).click();
    await page.waitForTimeout(5000);

    await expect(page.getByText("Username not found")).toBeVisible();
  });

  test("User login menggunakan username yang sudah terdaftar tapi menggunakan password yang salah", async ({
    page,
  }) => {
    await page.goto("https://studio.assemblrworld.com/explore");
    await page.getByText("Login / Register").click();
    await expect(page.getByText("Log into Assemblr")).toBeVisible();
    await page.getByLabel("Email or Username*").fill("testingintern1");
    await page.getByLabel("Password*").fill("123");
    await page.getByText("Sign in", { exact: true }).click();
    await page.waitForTimeout(5000);

    await expect(page.getByText("Wrong password")).toBeVisible();
  });

  test("User login menggunakan email yang belum terdaftar", async ({
    page,
  }) => {
    await page.goto("https://studio.assemblrworld.com/explore");
    await page.getByText("Login / Register").click();
    await expect(page.getByText("Log into Assemblr")).toBeVisible();
    await page.getByLabel("Email or Username*").fill("hanyatesting@gmail.com");
    await page.getByLabel("Password*").fill("123");
    await page.getByText("Sign in", { exact: true }).click();
    await page.waitForTimeout(5000);

    await expect(page.getByText("User not found")).toBeVisible();
  });

  test("User login menggunakan email yang terdaftar tapi menggunakan password yang salah", async ({
    page,
  }) => {
    await page.goto("https://studio.assemblrworld.com/explore");
    await page.getByText("Login / Register").click();
    await expect(page.getByText("Log into Assemblr")).toBeVisible();
    await page.getByLabel("Email or Username*").fill("testing@gmail.com");
    await page.getByLabel("Password*").fill("123");
    await page.getByText("Sign in", { exact: true }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("Wrong password")).toBeVisible();
  });
});
