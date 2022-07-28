const puppeteer = require("puppeteer");

const obtenirListeMed = async (pageSite) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://pharma-consults.net/medicaments?page=${pageSite}`);
  const listeMedicament = await page.evaluate(() => {
    let listeMedicament = [];
    const elements = document.querySelectorAll(".cat-item");
    for (const element of elements) {
      listeMedicament.push({
        specialite: element.querySelector(".mb-1").innerHTML,
        prix: element.querySelector(".mPrice").innerHTML,
      });
    }
    return listeMedicament;
  });
  await browser.close();
  return listeMedicament;
};
module.exports = obtenirListeMed;
