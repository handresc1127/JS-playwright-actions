import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.laworks.net/wotc/Default.aspx');
  await page.locator('#ctl00_txtUsername').fill(process.env.USER_NAME);
  await page.locator('#ctl00_txtPassword').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Batch Upload' }).click();
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.locator('#ctl00_MainContent_fileBatchUpload').setInputFiles('fileExample.xls');
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.locator('#ctl00_MainContent_doUpload div').click();
});