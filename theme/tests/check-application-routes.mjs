import assert from "node:assert/strict";
import { resolveSiteRoute, siteNavigation, siteRouteIds, siteRoutes } from "../src/site-routes.ts";

assert.equal(siteRouteIds.length, 6);
assert.equal(new Set(siteRouteIds).size, siteRouteIds.length);
assert.equal(new Set(siteRoutes.map(({ path }) => path)).size, siteRoutes.length);
assert.deepEqual(
  siteNavigation.map(({ href }) => href),
  siteRouteIds.map((id) => `/${id}`),
);

for (const route of siteRoutes) {
  assert.equal(resolveSiteRoute(route.path), route);
  assert.equal(resolveSiteRoute(`${route.id}/`), route);
}

assert.equal(resolveSiteRoute("unknown"), null);
assert.equal(
  siteNavigation.some(({ href }) => href.startsWith("#")),
  false,
);

console.log(
  `tao3k-application-routes status=ok routes=${siteRoutes.length} navigation=${siteNavigation.length}`,
);
