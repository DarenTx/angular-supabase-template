import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the Angular PWA heading', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Angular PWA');
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.locator('.hero__subtitle')).toContainText(
      'Build steps performed to scaffold this project',
    );
  });

  test('should render all 7 build steps', async ({ page }) => {
    const steps = page.locator('.step');
    await expect(steps).toHaveCount(7);
  });

  test('should display step numbers 1 through 7', async ({ page }) => {
    const numbers = page.locator('.step__number');
    await expect(numbers).toHaveCount(7);
    for (let i = 0; i < 7; i++) {
      await expect(numbers.nth(i)).toHaveText(String(i + 1));
    }
  });

  test('first step should reference Angular CLI verification', async ({ page }) => {
    const firstStepTitle = page.locator('.step__title').first();
    await expect(firstStepTitle).toContainText('Verified Angular CLI');
  });

  test('last step should reference build verification', async ({ page }) => {
    const lastStepTitle = page.locator('.step__title').last();
    await expect(lastStepTitle).toContainText('Verified the build');
  });

  test('steps with commands should show a code block', async ({ page }) => {
    const codeBlocks = page.locator('.step__command');
    // Steps 1-4, 6, 7 have commands (6 total)
    await expect(codeBlocks).toHaveCount(6);
  });

  test('should have a web app manifest link (PWA)', async ({ page }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', 'manifest.webmanifest');
  });

  test('page title should be set', async ({ page }) => {
    await expect(page).toHaveTitle(/Dhh/i);
  });
});
