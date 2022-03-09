require("dotenv").config();

import puppeteer from "puppeteer";
import {
  JOB_BROWSER_USER_AGENT,
  JOB_CARD_SELECTOR,
  JOB_COMPANY_SELECTOR,
  JOB_DESCRIPTION_SELECTOR,
  JOB_EXPERIENCE_SELECTOR,
  JOB_LISTDATE_SELECTOR,
  JOB_LOCATION_SELECTOR,
  JOB_SEARCH_URL,
  JOB_SEARCH_URL2,
  JOB_SEARCH_URL3,
  JOB_TITLE_SELECTOR,
} from "./common";
import { ScrapeJobs } from "./common";
import { assignProperty, composeJob, createJob } from "./utils/functions";

const scrapeJobs = async (): ScrapeJobs => {
  try {
    let job = {};
    let counter: number = 100;
    let isReady: boolean = false;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent(JOB_BROWSER_USER_AGENT);
    await page.setViewport({ width: 1496, height: 810 });

    await page.goto(JOB_SEARCH_URL2, { waitUntil: "networkidle2" });

    for (let i = 1; i < counter; i++) {
      await Promise.all([
        page.waitForNavigation(),
        page.click(JOB_CARD_SELECTOR(i)),
      ]).catch((e) => {
        console.error(e);
        counter++;
        job = null;
        isReady = false;
        return isReady;
      });

      page.mouse.wheel({ deltaY: 1200 }), (isReady = true);

      if (isReady) {
        const Title = await assignProperty(JOB_TITLE_SELECTOR, page);
        const Company = await assignProperty(JOB_COMPANY_SELECTOR, page);
        const Location = await assignProperty(JOB_LOCATION_SELECTOR, page);
        const Listdate = await assignProperty(JOB_LISTDATE_SELECTOR, page);
        const Description = await assignProperty(
          JOB_DESCRIPTION_SELECTOR,
          page
        );
        const Experience = await assignProperty(JOB_EXPERIENCE_SELECTOR, page);

        job = composeJob({
          Title,
          Company,
          Location,
          Listdate,
          Description,
          Experience,
        });

        console.log(job);
        await createJob(job);

        // wait 5s to continue. helps with linkedin rate limiting.
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
        return;
      }
    }
    await browser.close();
    return job;
  } catch (err) {
    throw err;
  }
};

scrapeJobs();
