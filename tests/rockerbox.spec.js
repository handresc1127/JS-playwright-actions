import { test, expect } from '@playwright/test';
const https = require('https');
const fs = require('fs');
const unzipper = require('unzipper');

test('test', async ({ page }) => {

  const file = fs.createWriteStream('fileExample.zip');
  var fileName = '';
  https.get('https://backend-dev-k8s.rockerbox.tech/api/internal/v1/submitter/louisiana', function(response) {
    response.pipe(file);

    // Once the file is fully downloaded, unzip it
    file.on('finish', () => {
      file.close(() => {
        fs.createReadStream('fileExample.zip')
          .pipe(unzipper.Parse())
          .on('entry', (entry) => {
            fileName = entry.path;
            console.log('Extracted file:', fileName);

            // Extract each file to the root directory
            entry.pipe(fs.createWriteStream(fileName));
          })
          .on('error', (err) => {
            console.error('Error while unzipping the file:', err);
          })
          .on('close', () => {
            console.log('All files unzipped successfully');
          });
      });
    });
  });


  file.on('error', (err) => {
    console.error('Error while downloading the file:', err);
  });

  
  await page.goto('https://www.laworks.net/wotc/Default.aspx');
  await page.locator('#ctl00_txtUsername').fill(process.env.USER_NAME);
  await page.locator('#ctl00_txtPassword').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Batch Upload' }).click();
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.locator('#ctl00_MainContent_fileBatchUpload').setInputFiles(fileName);
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.locator('#ctl00_MainContent_doUpload div').click();
});
