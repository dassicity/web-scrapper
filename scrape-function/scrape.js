const puppeteer = require('puppeteer');
const fs = require('fs');

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
    // console.log("Inside jobData");

    const jobData = await page.evaluate(async (data) => {
        const items = document.querySelectorAll('td.resultContent');
        items.forEach((item, index) => {
            const title = item.querySelector('h2.jobTitle>a')?.innerText;
            const link = item.querySelector('h2.jobTitle>a')?.href;
            const salary = item.querySelector('div.metadata.salary-snippet-container > div')?.innerText;
            const company = item.querySelector('span.companyName')?.innerText;
            const location = item.querySelector('div.companyLocation')?.innerText;

            if (salary === null) {
                salary = "not defined";
            }
            // console.log("link");

            data.list.push({
                title,
                link,
                salary,
                company,
                location
            });
        })
        return data;
    }, data);

    let response = await jobData;
    let json = await JSON.stringify(jobData, null, 2);
    fs.writeFile('job.json', json, 'utf-8', () => {
        console.log("Written jobData in file job.json");
    });

    browser.close();
    return response;
}

module.exports = main;