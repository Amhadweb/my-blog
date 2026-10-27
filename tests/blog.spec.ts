import { test, expect } from "@playwright/test";

test("Пользователь может войти и написать пост", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("Email").fill("test@log.com");
    await page.getByPlaceholder("Пароль").fill("password123");

    await page.getByRole("button", { name: "Войти"}).click();

    await expect(page).toHaveURL("/");

    await page.getByPlaceholder("Заголовок поста").fill("Тестовый пост");
    await page.getByPlaceholder("Текст поста...").fill("Это тест");

    await page.getByRole("button", { name: "Опубликовать"}).click();

    await expect(page.getByText("Тестовый пост")).toBeVisible();
    
})