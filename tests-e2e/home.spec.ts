import { test, expect } from '@playwright/test';

test('homepage has title and hero section', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Almir/i);
  await expect(page.getByRole('heading', { name: /Almir/i })).toBeVisible();
});
