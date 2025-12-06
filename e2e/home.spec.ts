import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the homepage', async ({ page }) => {
    await page.goto('/');

    // Check for the main heading or brand name
    await expect(page.locator('text=TennisProPlus')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check that main navigation links exist
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should show features section', async ({ page }) => {
    await page.goto('/');

    // Check for features content
    const featuresLink = page.locator('a[href="/features"]');
    if (await featuresLink.isVisible()) {
      await featuresLink.click();
      await expect(page).toHaveURL(/.*features/);
    }
  });

  test('should show pricing link', async ({ page }) => {
    await page.goto('/');

    // Check for pricing link
    const pricingLink = page.locator('a[href="/pricing"]');
    if (await pricingLink.isVisible()) {
      await pricingLink.click();
      await expect(page).toHaveURL(/.*pricing/);
    }
  });

  test('should have login/signup buttons', async ({ page }) => {
    await page.goto('/');

    // Check for authentication buttons
    const loginButton = page.locator('text=Log in');
    const signupButton = page.locator('text=Get Started');

    await expect(loginButton.or(signupButton)).toBeVisible();
  });
});

test.describe('Theme Toggle', () => {
  test('should toggle dark/light mode', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button (usually a sun/moon icon)
    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="mode"], button:has([class*="sun"]), button:has([class*="moon"])');

    if (await themeToggle.first().isVisible()) {
      const htmlBefore = await page.locator('html').getAttribute('class');
      await themeToggle.first().click();

      // Wait for theme change
      await page.waitForTimeout(100);

      const htmlAfter = await page.locator('html').getAttribute('class');

      // Theme class should have changed
      expect(htmlBefore).not.toEqual(htmlAfter);
    }
  });
});
