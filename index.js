const puppeteer = require('puppeteer');
const PushBullet = require('pushbullet');
const { URL } = require('url');

const {
    PUSHBULLET_API_KEY,
    PUSHBULLET_DEVICE_ID,
} = require('./pushbullet');

const DOWNLOAD_SELECTOR = '#speed-value.succeeded';
const UPLOAD_SELECTOR = '#upload-value.succeeded';
const DOWNLOAD_UNITS = '#speed-units';
const UPLOAD_UNITS = '#upload-units';

const pusher = new PushBullet(PUSHBULLET_API_KEY);

const getData = async (page, valueSelector, unitsSelector) => {
    const value = await page.$eval(valueSelector, el => el.innerHTML);
    const units = await page.$eval(unitsSelector, el => el.innerHTML);

    return `${value} ${units}`;
};

const extendedSelectorWait = (page, selector, timeout = 60000) =>
    page.waitForSelector(selector, { timeout });

(async (url = 'https://fast.com') => {
    const fastURL = new URL(url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(fastURL.href);
    await extendedSelectorWait(page, DOWNLOAD_SELECTOR);
    await extendedSelectorWait(page, UPLOAD_SELECTOR);
    await extendedSelectorWait(page, DOWNLOAD_UNITS);
    await extendedSelectorWait(page, UPLOAD_UNITS);

    const download = await getData(page, DOWNLOAD_SELECTOR, DOWNLOAD_UNITS);
    const upload = await getData(page, UPLOAD_SELECTOR, UPLOAD_UNITS);

    const textBody = [
        `DOWNLOAD: ${download}`,
        `UPLOAD:   ${upload}`,
    ].join('\n');

    console.log(textBody);

    // PushBullet notification for iPhone
    if (process.argv[2] === 'push') {
        pusher.note(
            PUSHBULLET_DEVICE_ID,
            `⬇${download} ⬆${upload}`,
            `Full results at ${url}`,
        );
    }

    browser.close();
})();
