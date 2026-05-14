"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeController_1 = require("../controllers/homeController");
// Direct route handler (not using Router for simplicity)
const homeHandler = homeController_1.HomeController.home;
exports.default = homeHandler;
//# sourceMappingURL=homeRoutes.js.map