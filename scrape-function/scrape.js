const puppeteer = require('puppeteer');

const data = {
    list: []
}

async function main(skill) {
    // launches chromium
    const browser = await puppeteer.launch({ headless: false });
    // opens new tab
    const page = await browser.newPage();
    await page.goto(`https://in.indeed.com/jobs?q=${skill}`, {
        timeout: 0,
        waitUntil: 'networkidle0'
    });

    const jobData = await page.evaluate(async (data) => {
        const items = document.querySelectorAll('td.resultContent');
        items.forEach((item, index) => {
            const title = item.querySelector('h2.jobTitle>a')?.innerText;
            const link = item.querySelector('h2.jobTItle')?.href;
            const salary = item.querySelector('div.metadata.salary-snippet-container > div')?.innerText;
            const company = item.querySelector('span.companyName')?.innertext;

            if (salary === null) {
                salary = "not defined";
            }

            data.list.push({
                title,
                link,
                salary,
                company
            });
        })
    });

    return data;
    browser.close();
}

module.exports = main;