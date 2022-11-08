import { createPageTitleGuard } from "./page-title-guard.js";

export function setupRouterGuard(router) {
  createPageTitleGuard(router);
}
