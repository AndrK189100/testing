/* eslint-disable jest/expect-expect */
import puppeteer from "puppeteer";


let browser;
let page;

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        devtools: true
    });
    page = await browser.newPage();
    
});



test('widget visible', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('.main');
});

test('input must be add .input-card-unchecked class if paysystems nubmer is incorrect', async() => {
    
    await page.goto('http://localhost:8080');
    const input = await page.$('.input');
    await input.type('11');
    await page.waitForSelector('.input-card-unchecked');
})


test('input must be add .input-card-unchecked class if card number is invalid', async() => {

    await page.goto('http://localhost:8080');
    await page.waitForSelector('.main');
    const input = await page.$('.input');
    const button = await page.$('.button');
    
    await input.type('2111111111111189');
    await button.click();
    await page.waitForSelector('.input-card-unchecked');
}, 10000)

test('input must be add .input-card-checked class if card number is valid', async() => {

    await page.goto('http://localhost:8080');
    await page.waitForSelector('.main');
    const input = await page.$('.input');
    const button = await page.$('.button');
    
    await input.type('4929845038941595');
    await button.click();
    await page.waitForSelector('.input-card-checked');
}, 10000)


afterAll(async() => {
    await browser.close();
});

