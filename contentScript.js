const puppeteer = require('puppeteer');

async function scrapeData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Extract relevant information (e.g., product IDs and prices)
  const productData = await page.evaluate(() => {
    const data = [];

    // Find and click on "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('button:contains("Add to Cart")');
    addToCartButtons.forEach(button => {
      button.click();

      // Assuming each product has an associated element with product details
      const productElement = button.closest('.product');
      if (productElement) {
        const productId = productElement.getAttribute('data-product-id');
        const productPrice = parseFloat(productElement.querySelector('.price').textContent.match(/\$([\d.]+)/)[1]);
        data.push({ productId, productPrice });
      }
    });

    return data;
  });

  // Calculate the total cart price
  const totalCartPrice = productData.reduce((total, product) => total + product.productPrice, 0);

  // Display the total cart price and check if it exceeds the local sum
  const localSum = parseFloat(localStorage.getItem('localSum') || 0);
  console.log(`Total Cart Price: $${totalCartPrice}`);

  if (totalCartPrice > localSum) {
    alert(`Warning: Cart value exceeds the local sum. Be aware during checkout.`);
  }

  // Close the browser
  await browser.close();

  // You can further process or store the data as needed
}

// Replace this URL with the URL of the page you want to scrape
const targetUrl = 'https://example.com';
scrapeData(targetUrl);
