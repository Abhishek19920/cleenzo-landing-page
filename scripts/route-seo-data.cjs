const site = require("../src/seo/site-data.json");
const { routes: ROUTES } = require("../src/seo/routes.json");

/** @deprecated Import src/seo/routes.json directly in new code */
module.exports = {
  SITE_URL: site.siteUrl,
  ROUTES,
};
