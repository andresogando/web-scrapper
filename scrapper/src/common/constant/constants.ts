export const JOB_TITLE_SELECTOR = `body > div.base-serp-page > div > section > div.details-pane__content.details-pane__content--show > section > div > div.top-card-layout__entity-info-container > div > a > h2`;
export const JOB_COMPANY_SELECTOR = `body > div.base-serp-page > div > section > div.details-pane__content.details-pane__content--show > section > div > div.top-card-layout__entity-info-container > div > h4 > div:nth-child(1) > span:nth-child(1) > a`;
export const JOB_LOCATION_SELECTOR = `body > div.base-serp-page > div > section > div.details-pane__content.details-pane__content--show > section > div > div.top-card-layout__entity-info-container > div > h4 > div:nth-child(1) > span.topcard__flavor.topcard__flavor--bullet`;
export const JOB_LISTDATE_SELECTOR = `body > div.base-serp-page > div > section > div.details-pane__content.details-pane__content--show > section > div > div.top-card-layout__entity-info-container > div > h4 > div:nth-child(2) > span.posted-time-ago__text.topcard__flavor--metadata`;
export const JOB_DESCRIPTION_SELECTOR = `body > div.base-serp-page > div > section > div.details-pane__content.details-pane__content--show > div.decorated-job-posting__details > section.core-section-container.description > div > div.description__text.description__text--rich > section > div`;
export const JOB_EXPERIENCE_SELECTOR = `body > div.base-serp-page > div > section > div.details-pane__content.details-pane__content--show > div.decorated-job-posting__details > section.core-section-container.description > div > ul > li > span`;
export const JOB_CARD_SELECTOR = (i: number): string =>
  `#main-content > section.two-pane-serp-page__results-list > ul > li:nth-child(${i}) > div > a`;
export const JOB_SEARCH_URL =
  "https://www.linkedin.com/jobs/search?keywords=Developer&location=Toronto%2C%20Ontario%2C%20Canada&geoId=&trk=homepage-jobseeker_jobs-search-bar_search-submit&position=1&pageNum=0";
export const JOB_SEARCH_URL2 =
  "https://www.linkedin.com/jobs/search?keywords=Engineering&location=canada&geoId=&trk=homepage-jobseeker_jobs-search-bar_search-submit&position=1&pageNum=0";
export const JOB_SEARCH_URL3 =
  "https://www.linkedin.com/jobs/search?keywords=Engineering&location=united%20states&geoId=&trk=homepage-jobseeker_jobs-search-bar_search-submit&position=1&pageNum=0";
export const JOB_BROWSER_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36";
