import puppeteer from "puppeteer";

export const assignProperty = async (selector: string, page: any) => {
  try {
    const element = await page.waitForSelector(selector, {
      timeout: 5000,
    });

    const res = await page.evaluate((element) => element.textContent, element);
    return res.trim();
  } catch (err) {
    if (err instanceof puppeteer.errors.TimeoutError) {
      return "NO DATA";
    }
    throw err;
  }
};
