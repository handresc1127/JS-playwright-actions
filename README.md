# JS-playwright-actions
JS playwright actions


Creation Steps
1. `npm init playwright@latest` to init the playwrig project
2. `npx playwright install` to install and download browsers
3.  `npx playwright test` to run hidding the browser
    `npx playwright test --ui` to run showing the browser
    `npx playwright test rockerbox.spec.ts --debug` to debug
    `npx playwright test --trace on` to record every step
    `USER_NAME=me PASSWORD=secret npx playwright test` to run with secrets
4. `npx playwright show-report` to see the HTML test report
5. `npx playwright codegen https://www.laworks.net/wotc/MainMenu.aspx` record URL


# Generate Token
https://github.com/settings/tokens
