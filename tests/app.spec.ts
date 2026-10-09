import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Bazar-Dor tests', () => {
  test('homepage displays header date, ticker and commodities', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('text=বাজার দর').first()).toBeVisible();
    await expect(page.locator('text=📅')).toBeVisible();
    await expect(page.locator('text=দাম এক নজরে').first()).toBeVisible();

    const ticker = page.locator('.ticker-track');
    await expect(ticker).toBeVisible();
    const tickerLinks = page.locator('.ticker-track a[href^="/product/"]');
    await expect(tickerLinks.first()).toBeVisible();

    const cards = page.locator('a[href^="/product/"]');
    await expect(cards.first()).toBeVisible();
  });

  test('category page filter and price sort', async ({ page }) => {
    await page.goto(`${BASE_URL}/category/chal`);

    await expect(page.locator('h1')).toContainText('চাল');

    const cards = page.locator('a[href^="/product/"]');
    await expect(cards.first()).toBeVisible();

    const sortSelect = page.locator('#category-sort');
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption('price-asc');
  });

  test('redirects unauthenticated user to signin with callback', async ({ page }) => {
    await page.goto(`${BASE_URL}/product/1`);

    await page.waitForURL(/\/signin\?callbackURL=/, { timeout: 10000 });
    expect(page.url()).toContain('callbackURL=');
    await expect(page.locator('h1')).toContainText('সাইন ইন', { timeout: 10000 });
  });

  test('user signup, product redirect, profile update, and signout', async ({ page }) => {
    test.setTimeout(60000);
    const unique = Date.now();
    const testEmail = `pw_user_${unique}@example.com`;
    const testName = 'সাকিব আল হাসান';
    const updatedName = 'সাকিব আল হাসান (আপডেট)';
    const testPassword = 'password123';

    await page.goto(`${BASE_URL}/product/1`);
    await page.waitForURL(/\/signin/, { timeout: 10000 });

    await page.click('text=নিবন্ধন করুন');
    await page.waitForURL(/\/signup/, { timeout: 10000 });
    expect(page.url()).toContain('callbackURL=');

    await page.fill('input[placeholder="রহিম আহমেদ"]', testName);
    await page.fill('input[placeholder="example@mail.com"]', testEmail);
    await page.fill('input[placeholder="কমপক্ষে ৬ অক্ষর"]', testPassword);
    await page.click('button[type="submit"]');

    await page.waitForURL(/\/product\/1/, { timeout: 15000 });
    expect(page.url()).toContain('/product/1');

    await expect(page.locator('text=সর্বনিম্ন দাম').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=সর্বাধিক দাম').first()).toBeVisible();
    await expect(page.locator('text=দামের ইতিহাস').first()).toBeVisible();

    const avatar = page.locator('#nav-user-avatar');
    await expect(avatar).toBeVisible({ timeout: 10000 });

    await page.goto(`${BASE_URL}/profile`);
    await expect(page.locator('#profile-user-name')).toContainText(testName, { timeout: 10000 });
    await expect(page.locator(`text=${testEmail}`).first()).toBeVisible();

    await page.click('#update-info-btn');
    await page.waitForURL(/\/profile\/update/, { timeout: 10000 });
    const nameInput = page.locator('#update-name-input');
    await nameInput.fill(updatedName);
    await page.click('#update-info-submit');

    await page.waitForURL(/\/profile$/, { timeout: 10000 });
    await expect(page.locator('#profile-user-name')).toContainText(updatedName, { timeout: 10000 });

    await page.locator('button:has-text("সাইন আউট")').first().click();
    await page.waitForURL(BASE_URL + '/', { timeout: 10000 });

    await expect(page.locator('text=সাইন ইন').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=সাইন আপ').first()).toBeVisible();
  });

  test('direct signup without callbackURL redirects to homepage', async ({ page }) => {
    test.setTimeout(60000);
    const unique = Date.now();
    const testEmail = `pw_direct_${unique}@example.com`;
    const testName = 'সরাসরি ব্যবহারকারী';
    const testPassword = 'password123';

    await page.goto(`${BASE_URL}/signup`);
    await page.fill('input[placeholder="রহিম আহমেদ"]', testName);
    await page.fill('input[placeholder="example@mail.com"]', testEmail);
    await page.fill('input[placeholder="কমপক্ষে ৬ অক্ষর"]', testPassword);
    await page.click('button[type="submit"]');

    await page.waitForURL(BASE_URL + '/', { timeout: 15000 });
    expect(page.url()).toBe(`${BASE_URL}/`);

    const avatar = page.locator('#nav-user-avatar');
    await expect(avatar).toBeVisible({ timeout: 10000 });
  });
});
