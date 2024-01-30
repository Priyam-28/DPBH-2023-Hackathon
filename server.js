const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL provided in the query parameter
    await page.goto(req.query.url, { waitUntil: 'domcontentloaded' });

    // Your scraping logic here

    // Example: Extract the title of the page
    const title = await page.title();

    // Close the browser
    await browser.close();

    // Send the scraped data back to the extension
    res.send({ title });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
